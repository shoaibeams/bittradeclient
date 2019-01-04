import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageBase } from 'src/shared/language';
import { GlobalsService } from 'src/services/globals.service';
import { SearchableDropdownSettings } from 'src/modules/searchable-dropdown/searchable-dropdown-settings';
import { mdCallResponse } from 'src/models/call-response';
import { Constants } from 'src/shared/constants';
import { LoggerService } from 'src/services/logger.service';
import { HttpClientService } from 'src/services/http-client.service';
import * as EnumsFeeSlabs from 'src/enums/fee-slabs';
import * as EnumsDepositRequest from 'src/enums/deposit-requests';
import { StaticHelper } from 'src/shared/static-helper';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { mdDepositRequests } from 'src/models/deposit-requests';
import {
    trigger,
    state,
    style,
    animate,
    transition,
    useAnimation,
    AnimationOptions
    // ...
} from '@angular/animations';
import {
    fadeIn,
    slideOutUp,
    slideInUp,
    flipInY,
    slideOutRight,
    bounceOut,
    bounceInRight,
    bounceOutRight,
} from 'ng-animate';
import { DatePipe } from '@angular/common';
import { mdDepositRequestHisotryRequest } from 'src/models/deposit-request-history-request';
import { mdDepositRequestHistory } from 'src/models/deposit-request-history';
import { LocalDataSource } from 'ng2-smart-table';
import { ButtonCellSmartTableRendererComponent } from 'src/modules/shared/button-cell-smat-table/button-cell-smat-table.component';
import { mdButtonCellSmartTableRenderValue } from 'src/modules/shared/models/button-cell-smart-table-render-value';
import { ToasterService } from 'src/services/toaster.service';
import { mdFileUploaderConfig } from 'src/modules/file-uploader/file-uploader-config';
import { mdDepositMethods } from 'src/models/deposit-methods';
import { mdFeeSlabs } from 'src/models/fee-slabs';
import { mdDigitalEvidence } from 'src/models/digital-evidence';

@Component({
    selector: 'funding-deposit',
    templateUrl: './deposit.component.html',
    styleUrls: [],
    animations: [
        trigger('depositRequests', [
            transition('hide => show', useAnimation(fadeIn, {
                params: { timing: '1', delay: 0 }
            })),
            transition('show => hide', useAnimation(bounceOut, {
                params: { timing: '1', delay: 0 }
            })),
            state('hide', style({
                display: 'none',
            })),
            state('show', style({
                display: 'block',
            }))
        ]),
        trigger('newDepositRequest', [
            transition('hide => show', useAnimation(flipInY, {
                params: { timing: '1', delay: 0 }
            })),
            transition('show => hide', useAnimation(bounceOut, {
                params: { timing: '1', delay: 0 }
            })),
            state('hide', style({
                display: 'none',
            })),
            state('show', style({
                display: 'block',
            }))
        ]),
    ],
})

export class DepositComponent {

    lang: LanguageBase;
    constants: Constants;
    depositableCurrencies: any[];
    depositableCurrenciesSource: any[];
    depositRequestHistory: mdDepositRequestHistory[];
    depositableCurrenciesSettings: SearchableDropdownSettings
    depositRequestsSource: LocalDataSource = new LocalDataSource();
    feeSlabsDataSource: LocalDataSource = new LocalDataSource();
    selectedCurrency: any;
    loadingDepositableCurrencies: boolean = true;
    loadingDepositMethods: boolean = false;
    wallet: any;
    depositMethods: mdDepositMethods[];
    selectedDepositMethod: mdDepositMethods;
    depositMethodFeeSlabs: mdFeeSlabs[];
    feeSlabs: mdFeeSlabs[] = [];
    fee: string = '';
    form: FormGroup;
    model: mdDepositRequests;
    errors: any;
    showPreviousDepositRequests: boolean = false;
    showNewDespositRequestForm: boolean = false;
    submitted: boolean = false;
    submitResponseMessage: string = '';
    diableSubmitButton: boolean = false;
    showsubmitResponse: boolean = false;
    submitRequestResposneClass: string = '';
    depositRequestsTableSettings: any;
    feeSlabsSettings: any;
    defaultCurrencyId: number;
    depositableCurrenciesSelectedValue: any;
    afuConfig: any = {
        multiple: false,
        formatsAllowed: '.jpg,.jpeg,.png',
        maxSize: 2,
        uploadAPI: {
            url: '',
        },
        theme: 'dragNDrop',
    }
    resetAFU: boolean = true;
    fileUploaderConfig: mdFileUploaderConfig;
    resetFileUploader: boolean = false;
    fileUploaderValue: mdDigitalEvidence[] = [];
    fileUploaderBusy: boolean = false;

    constructor(
        private router: Router,
        private globals: GlobalsService,
        private log: LoggerService,
        private http: HttpClientService,
        private formBuilder: FormBuilder,
        private toaster: ToasterService
    ) {
    }

    ngOnInit() {
        this.lang = this.globals.lang;
        this.constants = Constants.Instance;
        this.depositableCurrenciesSettings = new SearchableDropdownSettings(
            300, true, true, 32, 32, this.lang.SelectCurrencyTodeposit,
        );
        this.loadDepositableCurrencies();

        this.model = new mdDepositRequests(true);
        this.form = this.formBuilder.group({
            amount: [
                this.model.amount,
                Validators.compose([
                    Validators.required,
                ])
            ],
            deposit_date: [
                this.model.deposit_date,
                Validators.compose([
                    Validators.required,
                ])
            ],
        });
        this.errors = {
            amountRequired: StaticHelper.formatString(this.lang.RequiredFormat, this.lang.Amount),
            depostiDateRequired: StaticHelper.formatString(this.lang.RequiredFormat, this.lang.DepositDate),
        };

        this.depositRequestsTableSettings = {
            hideSubHeader: true,
            actions: {
                add: false,
                edit: false,
                delete: false,
            },
            attr: {
                class: 'table-responsive funding-table',
            },
            rowClassFunction: () => {
                return 'color-white align-center';
            },
            columns: {
                id: {
                    title: this.lang.Id,
                    type: 'string',
                },
                currency: {
                    title: this.lang.Currency,
                    type: 'string',
                },
                amount: {
                    title: this.lang.Amount,
                    type: 'number',
                },
                deposit_date: {
                    title: this.lang.Date,
                    type: 'string',
                    valuePrepareFunction: (value: Date, row) => {
                        let dp = new DatePipe('en-US');
                        return dp.transform(value, 'medium');
                    }
                },
                record_status: {
                    title: this.lang.Status,
                    type: 'custom',
                    renderComponent: ButtonCellSmartTableRendererComponent,
                    onComponentInitFunction: (instance) => {
                        instance.save.subscribe((row: mdDepositRequestHistory) => {
                        });
                    },
                    valuePrepareFunction: (value: any, row: mdDepositRequestHistory) => {
                        let renderValue: mdButtonCellSmartTableRenderValue = new mdButtonCellSmartTableRenderValue();
                        renderValue.originalValue = value;
                        renderValue.text = StaticHelper.capitalizeFirstLetter(value);
                        renderValue.spinner = false;
                        renderValue.disabled = false;

                        if (renderValue.originalValue == EnumsDepositRequest.RecordStatus.pending) {
                            renderValue.class = 'warning';
                        }
                        else
                            if (renderValue.originalValue == EnumsDepositRequest.RecordStatus.rejected) {
                                renderValue.class = 'danger';
                            }
                            else
                                if (renderValue.originalValue == EnumsDepositRequest.RecordStatus.success) {
                                    renderValue.class = 'success';
                                }
                        renderValue.show = true;
                        return renderValue;
                    },
                    addable: false,
                    editable: false,
                    filter: false,
                },
            },
        };

        this.feeSlabsSettings = {
            hideSubHeader: true,
            actions: {
                add: false,
                edit: false,
                delete: false,
            },
            attr: {
                class: 'table-responsive funding-table',
            },
            rowClassFunction: () => {
                return 'color-white align-center';
            },
            columns: {
                from_volume: {
                    title: this.lang.Deposit + " " + this.lang.Amount,
                    type: 'string',
                    valuePrepareFunction: (value: number, row: mdFeeSlabs) => {
                        let tovol = " - " + row.to_volume.toString();
                        if(row.to_volume <= 0)
                        {
                            tovol = '';
                        }
                        if(tovol == '')
                        {
                            return " > " + row.from_volume;
                        }
                        return row.from_volume + tovol;
                    }
                },
                fee: {
                    title: this.lang.Fee,
                    type: 'string',
                    valuePrepareFunction: (value: number, row: mdFeeSlabs) => {
                        return this.getFeeStringFromFeeSlab(row);
                    }
                },
            },
        };

        this.fileUploaderConfig = new mdFileUploaderConfig(false, ['.jpg', '.jpeg', '.png'], 1, false, false, 
            this.lang.SelectFile, this.constants.EndPoints.PostDepositReceipt);
    }

    get f() { return this.form.controls; }

    depositDateChanged() {
        this.log.debug(this.f.deposit_date.value);
    }

    fileUploaderValueChanged(value)
    {
        this.fileUploaderValue = value;
    }

    newDepositRequestClicked() {
        this.form.reset();
        this.submitted = false;
        this.submitResponseMessage = '';
        this.diableSubmitButton = false;
        this.showNewDespositRequestForm = true;
        this.resetFileUploader = true;
    }

    loadDepositableCurrencies() {
        this.http.getPromise<mdCallResponse>(this.constants.EndPoints.GetDepositableCurrencies).then((data: mdCallResponse) => {

            if (data.isSuccess) {
                if (data.extras) {
                    if (data.extras.depositableCurrencies) {
                        this.depositableCurrencies = data.extras.depositableCurrencies;
                        this.defaultCurrencyId = data.extras.defaultCurrencyId;
                        this.depositableCurrenciesSource = this.depositableCurrencies.map(m => {
                            return {
                                text: m.name + ' (' + m.description + ')',
                                value: m.id,
                                image: m.icon,
                            }
                        });
                        let defaultCurrency = this.depositableCurrenciesSource.filter(m => m.value == this.defaultCurrencyId);
                        if (defaultCurrency.length > 0) {
                            this.depositableCurrenciesSelectedValue = defaultCurrency[0];
                            this.depositableCurrenciesOnChange({
                                newValue: this.depositableCurrenciesSelectedValue,
                                previousValue: null
                            });
                        }
                    }
                }
            }
            this.loadingDepositableCurrencies = false;

        }).catch(error => {
            this.log.error(error);
            this.loadingDepositableCurrencies = false;
        })
    }

    getFeeStringFromFeeSlab(fs: mdFeeSlabs)
    {
        let fee = '';
        if (fs.fee_type == EnumsFeeSlabs.FeeType.amount) {
            fee = this.selectedCurrency.symbol + fs.fee;
        }
        else
            if (fs.fee_type == EnumsFeeSlabs.FeeType.percentage) {
                fee = fs.fee_percentage + '%';
            }
            else
                if (fs.fee_type == EnumsFeeSlabs.FeeType.both) {
                    fee = StaticHelper.formatString(this.lang.WhichEverHigherFormat,
                        this.selectedCurrency.symbol + fs.fee,
                        fs.fee_percentage + '%',);
                }
                else {
                    fee = this.lang.Free
                }
        return fee;
    }

    setSelectedDepositMethod(newMethod: mdDepositMethods)
    {
        this.selectedDepositMethod = newMethod;
        this.depositMethodFeeSlabs = this.feeSlabs.filter(m => m.pk == this.selectedDepositMethod.id.toString());
        if (this.depositMethodFeeSlabs.length == 1) {
            this.fee = this.getFeeStringFromFeeSlab(this.depositMethodFeeSlabs[0]);
        }
        else if(this.depositMethodFeeSlabs.length > 1)
        {
            this.feeSlabsDataSource.load(this.depositMethodFeeSlabs);
        }
        else
        {
            this.fee = this.lang.Free
        }
    }

    depositableCurrenciesOnChange(event) {
        this.selectedCurrency = this.depositableCurrencies.filter(m => m.id == event.newValue.value)[0];
        this.loadDepositRequestHistory();
        this.showPreviousDepositRequests = false;
        this.loadingDepositMethods = true;
        this.http.postPromise<mdCallResponse>(this.constants.EndPoints.PostDepositMethods,
            { currency_id: event.newValue.value }).then((data: mdCallResponse) => {
                this.wallet = null;
                this.depositMethods = [];
                this.feeSlabs = [];
                this.setSelectedDepositMethod(null);
                if (data.isSuccess) {
                    this.wallet = data.extras.wallet;
                    this.feeSlabs = data.extras.feeSlabs as mdFeeSlabs[];
                    if(!this.feeSlabs)
                    {
                        this.feeSlabs = [];
                    }
                    this.depositMethods = data.extras.depositMethods as mdDepositMethods[];
                    if(!this.depositMethods)
                    {
                        this.depositMethods = [];
                    }
                    if (this.depositMethods.length > 0) {
                        this.setSelectedDepositMethod(this.depositMethods[0]);
                    }

                    if (!this.showPreviousDepositRequests) {
                        this.showPreviousDepositRequests = true;
                    }
                }
                this.loadingDepositMethods = false;
            }).catch(error => {
                this.loadingDepositMethods = false;
                this.log.error(error);
            })
    }

    loadDepositRequestHistory() {
        let model: mdDepositRequestHisotryRequest = new mdDepositRequestHisotryRequest();
        model.currency_id = this.selectedCurrency.id;
        model.rpp = 6;
        model.last = 0;
        this.depositRequestHistory = [];
        this.loadDepositRequestsTable();
        this.http.postPromise(this.constants.EndPoints.PostDepositRequestHistory, model).then((res: mdCallResponse) => {
            if (res.isSuccess) {
                this.depositRequestHistory = res.extras as mdDepositRequestHistory[];
            }
            else {
                this.depositRequestHistory = [];
            }
            this.log.debug(this.depositRequestHistory);
            this.loadDepositRequestsTable();
        }).catch(error => {
            this.depositRequestHistory = [];
            this.loadDepositRequestsTable();
            this.log.error(error);
        });
    }

    loadDepositRequestsTable() {
        this.depositRequestsSource.load(this.depositRequestHistory);
    }

    depositFormCancelButtonClicked() {
        this.showNewDespositRequestForm = false;
        this.resetFileUploader = false;
    }

    submitDepositRequest() {
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }

        if (!this.selectedCurrency) {
            this.showsubmitResponse = true;
            this.submitRequestResposneClass = 'text-danger';
            this.submitResponseMessage = this.lang.NoCurrencySelected;
            return;
        }

        this.submitResponseMessage = "";
        this.diableSubmitButton = true;
        let formData: mdDepositRequests = this.form.value;
        formData.currency_id = this.selectedCurrency.id;
        formData.deposit_method_id = this.selectedDepositMethod.id;
        formData.reference = this.wallet.reference;
        formData.de = this.fileUploaderValue.map(m => {
            return m.id;
        });

        this.diableSubmitButton = true;
        this.http.postPromise<mdCallResponse>(this.constants.EndPoints.PostDepositRequest, formData).then((res: mdCallResponse) => {
            this.log.debug(res);
            if (res) {
                if (res.isSuccess) {
                    //show model
                    this.toaster.Success(StaticHelper.formatString(this.lang.CreatedSuccessfullyFormat, this.lang.DepositRequest));
                    this.submitRequestResposneClass = "text-success";
                    this.showNewDespositRequestForm = false;
                    this.resetFileUploader = false;
                    if (res.extras) {
                        if (res.extras.id) {
                            this.depositRequestHistory.unshift(res.extras);
                            this.loadDepositRequestsTable();
                        }
                    }
                }
                else {
                    this.submitRequestResposneClass = "text-danger";
                    this.hideSpinnerAndShowError(StaticHelper.bulletList(res.message.split("\n")));
                }
            }
        }).catch((error) => {
            this.log.debug(error);
            this.submitRequestResposneClass = "text-danger";
            this.log.debug(this.submitRequestResposneClass);
            this.showsubmitResponse = true;
            this.diableSubmitButton = false;
            this.submitResponseMessage = this.lang.UnableToCompleteYourRequest;
        });

    }

    hideSpinnerAndShowError(message = null) {
        if (!message) {
            message = this.lang.AccountCreatedLoginToContinue;
        }
        this.submitResponseMessage = message;
        this.showsubmitResponse = true;
        this.diableSubmitButton = false;
    }

}
