import * as React from "react";
import { Link } from "react-router-dom";
import { BaseComponent } from "../../app/components/base/BaseComponent";
import { mdCallResponse } from "../../models/call-response";
import { SearchableDropdownSettings } from "../shared/searchable-dropdown/searchable-dropdown-settings";
import { mdDepositRequests } from "../../models/deposit-requests";
import { mdFormControl } from "../../shared/form-control";
import * as ValidationAttributes from "../../shared/validation-attributes";
import { mdFeeSlabs } from "../../models/fee-slabs";
import * as EnumsFeeSlabs from "../../enums/fee-slabs";
import { StaticHelper } from "../../shared/static-helper";
import { mdDepositMethods } from "../../models/deposit-methods";
import { mdDepositRequestHisotryRequest } from "../../models/deposit-request-history-request";
import { mdDepositRequestHistory } from "../../models/deposit-request-history";
import SearchableDropdownComponent from "../shared/searchable-dropdown/SearchableDropdownComponent";
import FileUploaderComponent from "../shared/file-uploader/FileUploaderComponent";
import { mdFileUploaderConfig } from "../shared/file-uploader/file-uploader-config";
import { Transitions } from "../../models/transitions";
import TableComponent from "../shared/table/TableComponent";
import { ButtonCellSmartTableRendererComponent } from "../shared/table/ButtonCellSmartTableRendererComponent";
import { mdButtonCellSmartTableRenderValue } from "../shared/table/button-cell-smart-table-render-value";
import * as EnumsDepositRequest from "../../enums/deposit-requests";
import NBSpinnerComponent from "../shared/spinner/NBSpinnerComponent";
import { TransitionState } from "../../enums/transition";

export default class DepositComponent extends BaseComponent {

    render() {
        this.initShorts();
        return (
            <div className="row" style={{ margin: 0 }}>
                <div className="col-md-6" style={{
                    paddingTop: '12px', paddingBottom: '12px'
                }} >
                    <SearchableDropdownComponent
                        ref={this.depositableCurrenciesDropdown}
                        globals={this.props.globals} params={{
                            source: this.state.depositableCurrenciesSource,
                            settings: this.state.depositableCurrenciesSettings,
                            onChange: this.depositableCurrenciesOnChange,
                            showSpinner: this.state.loadingDepositableCurrencies,
                        }} />
                    < div style={{ minHeight: '300px' }} className="col-sm-12">
                        {
                            this.state.wallet ? (
                                <table className="table-responsive funding-wallet">
                                    <colgroup style={{ width: '120px' }}></colgroup>
                                    <colgroup style={{ width: '160px' }}></colgroup>
                                    <tbody>
                                        <tr>
                                            <th>{this.lang.TotalBalance}</th>
                                            <td>{this.state.wallet.balance + ' ' + this.state.selectedCurrency.name}</td>
                                        </tr>
                                        <tr>
                                            <th>{this.lang.OnHold}</th>
                                            <td>{this.state.wallet.hold_balance + ' ' + this.state.selectedCurrency.name}</td>
                                        </tr>
                                        <tr>
                                            <th>{this.lang.AvailableBalance}</th>
                                            <td>{this.state.wallet.available_balance + ' ' + this.state.selectedCurrency.name}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            ) : null
                        }
                        {
                            this.state.selectedDepositMethod ? (
                                <>
                                    <hr />
                                    <table className="table-responsive funding-deposit-methods">
                                        <colgroup style={{ width: '180px' }}></colgroup>
                                        <colgroup style={{ width: 'auto' }}></colgroup>
                                        <tbody>
                                            <tr>
                                                <th>{this.lang.AccountName}</th>
                                                <td>{this.state.selectedDepositMethod.account_name}</td>
                                            </tr >
                                            <tr>
                                                <th>{this.lang.Address}</th>
                                                <td>{this.state.selectedDepositMethod.address}</td>
                                            </tr >
                                            <tr>
                                                <th>{this.lang.IBAN}</th>
                                                <td>{this.state.selectedDepositMethod.iban}</td>
                                            </tr >
                                            <tr>
                                                <th>{this.lang.BankName}</th>
                                                <td>{this.state.selectedDepositMethod.bank_name}</td>
                                            </tr >
                                            <tr>
                                                <th>{this.lang.Branch}</th>
                                                <td>{this.state.selectedDepositMethod.branch_address}</td>
                                            </tr >
                                            <tr>
                                                <th>{this.lang.Reference}</th>
                                                <td>{this.state.wallet.reference}</td>
                                            </tr >
                                            <tr>
                                                <th>{this.lang.Minimum}</th>
                                                <td>{this.state.selectedCurrency.symbol + this.state.selectedDepositMethod.minimum_deposit}</td>
                                            </tr >
                                            {
                                                (!this.isNullOrEmpty(this.state.fee) && this.state.depositMethodFeeSlabs.length <= 1) ? (
                                                    <tr>
                                                        <th>{this.lang.Fee}</th>
                                                        <td>{this.state.fee}</td>
                                                    </tr >
                                                ) : null
                                            }
                                            {
                                                this.state.depositMethodFeeSlabs.length > 1 ? (
                                                    <tr>
                                                        <th>{this.lang.Fee}</th>
                                                        <td>
                                                            <TableComponent {...this.props} params={{
                                                                settings: this.feeSlabsTableSettings,
                                                                data: this.state.depositMethodFeeSlabs
                                                            }}
                                                                ref={this.feeSlabsTable} />
                                                        </td >
                                                    </tr >
                                                ) : null
                                            }
                                        </tbody>
                                    </table>
                                </>
                            ) : null

                        }
                    </div >
                </div >
                <div className="col-md-6" style={{ paddingTop: '12px', paddingBottom: '12px' }}>
                    {
                        this.animatedCSSDivWithAttr(
                            <>
                                {
                                    this.animatedCSSDivWithAttr(
                                        <>
                                            <h4 className="form-heading">{this.lang.New + " " + this.lang.DepositRequest}</h4 >
                                            <div className="tab-pane fade in active stylish-border">
                                                <form style={{ margin: '20px' }} className="form-horizontal">
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <div className="form-group">
                                                                <label className="col-sm-3 input-label">{this.lang.Amount + (this.state.selectedCurrency ? ' (' + this.state.selectedCurrency.name + ')' : '')}</label>
                                                                <div className="col-md-9">
                                                                    {
                                                                        this.numberInput(this, this.f.amount, this.handleFormControlInput, 25,
                                                                            this.state.selectedDepositMethod ? this.state.selectedDepositMethod.minimum_deposit : 0)
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div >
                                                        <div className="col-sm-12">
                                                            <div className="form-group">
                                                                <label className="col-sm-3 input-label">{this.lang.DepositDate}</label>
                                                                <div className="col-md-9">
                                                                    {
                                                                        this.datePickerFormControl(this.f.deposit_date, [this.handleFormControlInput, this.depositDateChanged], false)
                                                                    }
                                                                </div >
                                                            </div >
                                                        </div >
                                                        <div className="col-sm-12">
                                                            <div className="form-group">
                                                                <label className="col-sm-3 input-label">{this.lang.Reference}</label>
                                                                <div className="col-md-9">
                                                                    <label className="col-sm-3 input-label">{this.state.wallet ? this.state.wallet.reference : ''}</label>
                                                                </div>
                                                            </div >
                                                        </div >
                                                        <div className="col-sm-12 color-white">
                                                            <div className="form-group">
                                                                <label className="col-sm-3 input-label">{this.lang.DepositReceipt}</label>
                                                                <div className="col-md-9">
                                                                    <FileUploaderComponent {...this.props}
                                                                        ref={this.depositReceiptFileUploader}
                                                                        params={{
                                                                            config: this.state.fileUploaderConfig,
                                                                            valueChange: this.fileUploaderValueChanged,
                                                                            isBusy: this.state.fileUploaderBusy,
                                                                            isBusyChange: this.fileUploaderisBusyChange
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div >
                                                        </div >
                                                        <div className="col-sm-6 txt-center">
                                                            {/* [nbSpinner]="diableSubmitButton || fileUploaderBusy" */}
                                                            <button onClick={this.submitDepositRequest}
                                                                className="btn btn-success col-md-12"
                                                                disabled={this.state.diableSubmitButton}>
                                                                {this.lang.Submit}
                                                                <NBSpinnerComponent {...this.props} params={{ show: this.state.diableSubmitButton }} />
                                                            </button>
                                                        </div >
                                                        <div className="col-sm-6 txt-center">
                                                            <button className="btn btn-default col-md-12"
                                                                onClick={this.depositFormCancelButtonClicked}>{this.lang.Cancel}</button>
                                                        </div >
                                                        <div className="col-sm-12">
                                                            {
                                                                this.state.showSubmitResponse ? (<div className={`${this.state.submitResponseClass} submit-response`}>{this.state.submitResponse}</div>) : null
                                                            }

                                                        </div >
                                                    </div >
                                                </form >
                                            </div >
                                        </ >
                                        , null, this.state.animValues.newDepositRequest)
                                }
                                <table className="col-md-12">
                                    <colgroup className="col-md-6"></colgroup>
                                    <colgroup className="col-md-6"></colgroup>
                                    <tbody>
                                        <tr>
                                            <td className="funding-table-heading">{this.lang.DepositRequest + '(s)'}</td>
                                            <td align="right">
                                                <button className="btn btn-xs btn-primary" onClick={this.newDepositRequestClicked}>
                                                    <i className="fa fa-plus"></i>&nbsp;<span>{this.lang.DepositRequest}</span>
                                                </button>
                                            </td>
                                        </tr >
                                    </tbody >
                                </table >
                                <TableComponent {...this.props} params={{
                                    settings: this.depositRequestsTableSettings,
                                    data: this.state.depositRequestHistory
                                }} />
                                {/* <ng2-smart-table [settings] = "depositRequestsTableSettings"[source] = "depositRequestsSource" >
        </ng2 - smart - table > */}
                            </>, null, this.state.animValues.depositRequests)
                    }
                </div >

            </div >
        );
    }

    model: mdDepositRequests;
    feeSlabs: mdFeeSlabs[] = [];
    depositMethods: mdDepositMethods[];
    // depositRequestHistory: mdDepositRequestHistory[];
    depositableCurrenciesDropdown = React.createRef<SearchableDropdownComponent>();
    depositReceiptFileUploader = React.createRef<FileUploaderComponent>();
    feeSlabsTable = React.createRef<TableComponent>();
    feeSlabsTableSettings: any;
    depositRequestsTableSettings: any;

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.model = new mdDepositRequests(true);
        this.state = {
            form: {
                amount: new mdFormControl('', "amount", this.lang.Amount, [
                    new ValidationAttributes.RequiredValidator(this.lang.RequiredFormat),
                ]),
                deposit_date: new mdFormControl(this.model.deposit_date, "deposit_date", this.lang.DepositDate, [
                    new ValidationAttributes.RequiredValidator(this.lang.RequiredFormat),
                ]),
            },
            fileUploaderConfig: new mdFileUploaderConfig(false, ['.jpg', '.jpeg', '.png'], 1, false, false,
                this.lang.SelectFile, this.constants.EndPoints.PostDepositReceipt),
            depositableCurrenciesSettings: new SearchableDropdownSettings(
                300, true, true, 32, 32, this.lang.SelectCurrencyTodeposit),
            fileUploaderValue: [],
            diableSubmitButton: false,
            showSubmitResponse: false,
            submitResponseClass: 'text-danger',
            submitResponse: '',
            showErrors: false,
            showNewDespositRequestForm: false,
            loadingDepositableCurrencies: true,
            depositableCurrencies: [],
            defaultCurrencyId: null,
            depositableCurrenciesSource: [],
            selectedCurrency: null,
            selectedDepositMethod: null,
            depositMethodFeeSlabs: new mdFeeSlabs(),
            fee: '',
            wallet: null,
            depositRequestHistory: [],
            animValues: {
                depositRequests: new mdFormControl(this.getTransisition(Transitions.bounseOutHide2s, TransitionState.Completed), 'depositRequests'),
                newDepositRequest: new mdFormControl(this.getTransisition(Transitions.bounseOutHide2s, TransitionState.Completed), 'newDepositRequest')
            }
        }
        this.loadDepositableCurrencies();
        this.feeSlabsTableSettings = {
            attr: {
                className: 'table-responsive funding-table',
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
                        if (row.to_volume <= 0) {
                            tovol = '';
                        }
                        if (tovol == '') {
                            return " > " + row.from_volume;
                        }
                        return row.from_volume + tovol;
                    },
                    cellStyle: {
                        textAlign: 'left'
                    }
                },
                fee: {
                    title: this.lang.Fee,
                    type: 'string',
                    valuePrepareFunction: (value: number, row: mdFeeSlabs) => {
                        return this.getFeeStringFromFeeSlab(row);
                    },
                    cellStyle: {
                        textAlign: 'left'
                    }
                },
            },
        };
        this.depositRequestsTableSettings = {
            hideSubHeader: true,
            actions: {
                add: false,
                edit: false,
                delete: false,
            },
            attr: {
                className: 'table-responsive funding-table',
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
                        return StaticHelper.longDateFormat(value);
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
                            renderValue.class = 'btn-warning';
                        }
                        else
                            if (renderValue.originalValue == EnumsDepositRequest.RecordStatus.rejected) {
                                renderValue.class = 'btn-danger';
                            }
                            else
                                if (renderValue.originalValue == EnumsDepositRequest.RecordStatus.success) {
                                    renderValue.class = 'btn-success';
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

    }

    depositDateChanged = () => {
        this.log.debug(this.f.deposit_date.value);
    }

    fileUploaderValueChanged = (value) => {
        this.updateState({
            fileUploaderValue: value,
        })
    }

    newDepositRequestClicked = () => {
        this.showErrors = false;
        this.depositReceiptFileUploader.current.recievedNewChanges();
        this.updateState({
            diableSubmitButton: false,
            showSubmitResponse: false,
            submitResponseClass: 'text-danger',
            submitResponse: '',
            showNewDespositRequestForm: true,
            form: {
                amount: new mdFormControl('', "amount", this.lang.Amount, [
                    new ValidationAttributes.RequiredValidator(this.lang.RequiredFormat),
                ]),
                deposit_date: new mdFormControl(this.model.deposit_date, "deposit_date", this.lang.DepositDate, [
                    new ValidationAttributes.RequiredValidator(this.lang.RequiredFormat),
                ]),
            },
        }, () => {
            this.updateAnimValue(this.state.animValues.newDepositRequest.name, Transitions.flipInY, TransitionState.Running);
        })
    }

    loadDepositableCurrencies() {
        this.http.get<mdCallResponse>(this.constants.EndPoints.GetDepositableCurrencies).then((res: mdCallResponse) => {
            if (res.isSuccess) {
                if (res.extras) {
                    if (res.extras.depositableCurrencies) {
                        let depositableCurrenciesSource = res.extras.depositableCurrencies.map(m => {
                            return {
                                text: m.name + ' (' + m.description + ')',
                                value: m.id,
                                image: m.icon,
                            }
                        });

                        let selectedValue = null;
                        let defaultCurrency = depositableCurrenciesSource.filter(m => m.value == res.extras.defaultCurrencyId);
                        if (defaultCurrency.length > 0) {
                            selectedValue = defaultCurrency[0];
                        }
                        this.updateState({
                            depositableCurrencies: res.extras.depositableCurrencies,
                            defaultCurrencyId: res.extras.defaultCurrencyId,
                            depositableCurrenciesSource: depositableCurrenciesSource,
                            loadingDepositableCurrencies: false,
                        });
                        this.depositableCurrenciesDropdown.current.selectionChanged(selectedValue);
                        if (defaultCurrency.length > 0) {
                            this.depositableCurrenciesOnChange({
                                newValue: selectedValue,
                                previousValue: null
                            });
                        }
                    }
                }
            }

        }).catch(error => {
            this.log.error(error);
            this.updateState({
                loadingDepositableCurrencies: false
            });
        })
    }

    getFeeStringFromFeeSlab(fs: mdFeeSlabs) {
        let fee = '';
        if (fs.fee_type == EnumsFeeSlabs.FeeType.amount) {
            fee = this.state.selectedCurrency.symbol + fs.fee;
        }
        else
            if (fs.fee_type == EnumsFeeSlabs.FeeType.percentage) {
                fee = fs.fee_percentage + '%';
            }
            else
                if (fs.fee_type == EnumsFeeSlabs.FeeType.both) {
                    fee = StaticHelper.formatString(this.lang.WhichEverHigherFormat,
                        this.state.selectedCurrency.symbol + fs.fee,
                        fs.fee_percentage + '%');
                }
                else {
                    fee = this.lang.Free
                }
        return fee;
    }

    setSelectedDepositMethod(newMethod: mdDepositMethods) {
        let fee = '';
        if (!newMethod) {
            this.updateState({
                selectedDepositMethod: newMethod,
                depositMethodFeeSlabs: [],
                fee: fee,
            });
            return;
        }
        let depositMethodFeeSlabs = newMethod ? this.feeSlabs.filter(m => m.pk == newMethod.id.toString()) : [];
        if (depositMethodFeeSlabs.length == 1) {
            fee = this.getFeeStringFromFeeSlab(depositMethodFeeSlabs[0]);
        }
        else if (depositMethodFeeSlabs.length > 1) {
            // this.feeSlabsTable.current.load(depositMethodFeeSlabs);
            // this.feeSlabsDataSource.load(depositMethodFeeSlabs);
        }
        else {
            fee = this.lang.Free
        }
        this.updateState({
            selectedDepositMethod: newMethod,
            depositMethodFeeSlabs: depositMethodFeeSlabs,
            fee: fee,
        })
    }

    depositableCurrenciesOnChange = (event) => {

        let selectedCurrency = this.state.depositableCurrencies.filter(m => m.id == event.newValue.value)[0];
        this.updateState({
            selectedCurrency: selectedCurrency,
            wallet: null,
            selectedDepositMethod: null,
        }, () => {
            this.setSelectedDepositMethod(null);
            this.updateAnimValue(this.state.animValues.depositRequests.name, Transitions.bounseOutHide2s, TransitionState.Completed);
            this.loadDepositRequestHistory();
            // this.showPreviousDepositRequests = false;
            // this.loadingDepositMethods = true;
            this.http.post<mdCallResponse>(this.constants.EndPoints.PostDepositMethods,
                { currency_id: event.newValue.value }).then((data: mdCallResponse) => {
                    this.depositMethods = [];
                    this.feeSlabs = [];
                    if (data.isSuccess) {
                        this.feeSlabs = data.extras.feeSlabs as mdFeeSlabs[];
                        if (!this.feeSlabs) {
                            this.feeSlabs = [];
                        }
                        this.depositMethods = data.extras.depositMethods as mdDepositMethods[];
                        if (!this.depositMethods) {
                            this.depositMethods = [];
                        }

                        this.updateState({
                            wallet: data.extras.wallet,
                        })

                        if (this.depositMethods.length > 0) {
                            this.setSelectedDepositMethod(this.depositMethods[0]);
                        }

                        this.updateAnimValue(this.state.animValues.depositRequests.name, Transitions.fadeIn2s, TransitionState.Running);
                    }
                    // this.loadingDepositMethods = false;
                }).catch(error => {
                    // this.loadingDepositMethods = false;
                    this.log.error(error);
                })
        })
    }

    loadDepositRequestHistory = () => {
        let model: mdDepositRequestHisotryRequest = new mdDepositRequestHisotryRequest();
        model.currency_id = this.state.selectedCurrency.id;
        model.rpp = 6;
        model.last = 0;
        this.updateState({
            depositRequestHistory: []
        })
        this.loadDepositRequestsTable();
        this.http.post(this.constants.EndPoints.PostDepositRequestHistory, model).then((res: mdCallResponse) => {
            let depositRequestHistory = [];
            if (res.isSuccess) {
                depositRequestHistory = res.extras as mdDepositRequestHistory[];
            }
            else {
                depositRequestHistory = [];
            }
            this.updateState({
                depositRequestHistory: depositRequestHistory
            })
            // this.loadDepositRequestsTable();
        }).catch(error => {
            this.updateState({
                depositRequestHistory: []
            })
            // this.loadDepositRequestsTable();
            this.log.error(error);
        });
    }

    loadDepositRequestsTable() {
        // this.depositRequestsSource.load(this.depositRequestHistory);
    }

    depositFormCancelButtonClicked = (e) => {
        e.preventDefault();
        this.updateAnimValue(this.state.animValues.newDepositRequest.name, Transitions.bounseOutHide2s, TransitionState.Running);
        this.updateState({
            showNewDespositRequestForm: false,
        })
    }

    submitDepositRequest = (e) => {
        e.preventDefault();
        this.showErrors = true;
        // stop here if form is invalid
        if (!this.validateForm('form')) {
            this.log.debug("invalid form");
            return;
        }

        if (!this.state.selectedCurrency) {
            this.updateState({
                showSubmitResponse: true,
                submitResponseClass: 'text-danger',
                submitResponse: this.lang.NoCurrencySelected,
            })
            return;
        }

        this.updateState({
            showSubmitResponse: true,
            submitResponseClass: 'text-danger',
            submitResponse: '',
            diableSubmitButton: true,
        })

        let formData: mdDepositRequests = this.getFormData(this.state.form) as mdDepositRequests;
        formData.currency_id = this.state.selectedCurrency.id;
        formData.deposit_method_id = this.state.selectedDepositMethod.id;
        formData.reference = this.state.wallet.reference;
        formData.de = this.state.fileUploaderValue.map(m => {
            return m.id;
        });

        this.http.post<mdCallResponse>(this.constants.EndPoints.PostDepositRequest, formData).then((res: mdCallResponse) => {
            this.log.debug(res);
            if (res) {
                if (res.isSuccess) {
                    //show model
                    // this.toaster.Success(StaticHelper.formatString(this.lang.CreatedSuccessfullyFormat, this.lang.DepositRequest));
                    this.updateState({
                        submitResponseClass: 'text-success',
                        showNewDespositRequestForm: false,
                    })
                    this.updateAnimValue(this.state.animValues.newDepositRequest.name, Transitions.bounseOutHide2s, TransitionState.Running);
                    if (res.extras) {
                        if (res.extras.id) {
                            let depositRequestHistory = this.state.depositRequestHistory;
                            depositRequestHistory.unshift(res.extras);
                            this.updateState({
                                depositRequestHistory: depositRequestHistory
                            })
                            // this.loadDepositRequestsTable();
                        }
                    }
                }
                else {
                    this.hideSpinnerAndShowError(this.bulletList(res.message.split("\n")));
                }
            }
        }).catch((error) => {
            this.log.debug(error);
            this.hideSpinnerAndShowError(this.lang.UnableToCompleteYourRequest);
        });

    }

    fileUploaderisBusyChange = (value) => {
        this.updateState({
            fileUploaderBusy: value
        })
    }

    hideSpinnerAndShowError(message = null) {
        if (!message) {
            message = this.lang.AccountCreatedLoginToContinue;
        }
        this.updateState({
            submitResponseClass: 'text-danger',
            showSubmitResponse: true,
            diableSubmitButton: false,
            submitResponse: message,
        })
    }

}