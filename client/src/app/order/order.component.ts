import { Component, OnInit, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { LoggerService } from 'src/services/logger.service';
import { LanguageBase } from 'src/shared/language';
import { GlobalsService } from 'src/services/globals.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { mdOrder } from 'src/models/order';
import { mdCallResponse } from 'src/models/call-response';
import { HttpClientService } from 'src/services/http-client.service';
import { SpinnerService } from 'src/services/spinner.service';
import { StaticHelper } from 'src/shared/static-helper';
import { Constants } from 'src/shared/constants';

@Component({
    selector: 'app-trade-order',
    templateUrl: './order.component.html',
    styleUrls: []
})

export class OrderComponent implements OnInit {

    @Input() currencyPair: any;
    lang: LanguageBase;
    buyBalance: string;
    sellBalance: string;
    availableBalance: number;
    bform: FormGroup;
    sform: FormGroup;
    model: mdOrder;
    sellTotalAmount: string;
    alertClass: string;
    alertMessage: string;
    displayAlert: boolean;
    limitBuyTotalAmount: string;
    limitBuyGrossAmount: string;
    limitBuyFeeAmount: string;
    limitSellTotalAmount: string;
    limitSellGrossAmount: string;
    limitSellFeeAmount: string;
    priceStep: number;
    amountStep: number;
    submitted: boolean;
    constants: Constants;
    constructor(private log: LoggerService,
        public globals: GlobalsService,
        private formBuilder: FormBuilder,
        private http: HttpClientService,
        private spinner: SpinnerService) {

    }

    ngOnInit() {
        this.constants = this.globals.constants;
        this.displayAlert = false;
        this.alertClass = "";
        this.alertMessage = "";
        this.lang = this.globals.lang;
        this.availableBalance;
        this.model = new mdOrder(true);
        this.bform = this.formBuilder.group({
            price: [
                this.model.price,
                null
            ],
            amount: [
                this.model.amount,
            ],
        });
        this.sform = this.formBuilder.group({
            price: [
                this.model.price,
                null
            ],
            amount: [
                this.model.amount,
            ],
        });
    }

    get bf() { return this.bform.controls; }

    get sf() { return this.sform.controls; }

    ngOnChanges(changes: SimpleChanges) {
        this.currencyPair = changes.currencyPair.currentValue;
        this.spinner.show();
        this.loadBalanceAndFee();
    }

    loadBalanceAndFee() {
        this.sellBalance = "";
        this.buyBalance = "";

        if (this.currencyPair.id) {
            let res: mdCallResponse = new mdCallResponse();
            this.http.post<mdCallResponse>(this.constants.EndPoints.PostPairDetails, this.currencyPair.id).subscribe((data) => {
                res = data;
            }, (error) => {
                this.log.debug(error);
                this.spinner.hide();
            }, () => {
                if (res.isSuccess) {
                    Object.assign(this.currencyPair, res.extras);
                    this.log.debug(this.currencyPair);
                    this.updateBalances();
                }
                this.spinner.hide();
            });
        }
    }

    updateBalances() {
        this.sellBalance = (this.currencyPair.fc_available_balance / this.constants.Float)
            .toFixed(this.currencyPair.fc_scale) + " " + this.currencyPair.fc_name;
        this.buyBalance = (this.currencyPair.tc_available_balance / this.constants.Float)
            .toFixed(this.currencyPair.tc_scale) + " " + this.currencyPair.tc_name;
        this.limitBuyFeeAmount = StaticHelper.bestScale(StaticHelper.unfloatAmount(this.currencyPair.buy_fee)) + "%";
        this.limitSellFeeAmount = StaticHelper.bestScale(StaticHelper.unfloatAmount(this.currencyPair.sell_fee)) + "%";
        this.priceStep = 1 / Math.pow(10, StaticHelper.minScale(this.currencyPair.tc_scale));
        this.amountStep = 1 / Math.pow(10, StaticHelper.minScale(this.currencyPair.fc_scale));
    }

    onSubmit(action: number) {
        //validate form locally
        let formData: mdOrder;
        if (action == this.constants.Order.Action.buy) {
            formData = this.bform.value;
        }
        else
            if (action == this.constants.Order.Action.sell) {
                formData = this.sform.value;
            }
        formData.action = action;
        formData.currencyPair = this.currencyPair.id;
        formData.type = this.constants.Order.Type.limit;
        let res: mdCallResponse = new mdCallResponse();
        this.spinner.show();
        this.http.postPromise<mdCallResponse>(this.constants.EndPoints.PostOrder, formData).then((res: mdCallResponse) => {

            this.log.debug(res);
            this.displayAlertBox(res.isSuccess, res.message);
            this.loadBalanceAndFee();
            if (action == this.constants.Order.Action.buy) {
                this.bf.amount.setValue(0);
                this.priceAmountKeyup(this.bf);
            }
            else
                if (action == this.constants.Order.Action.sell) {
                    this.sf.amount.setValue(0);
                    this.priceAmountKeyup(this.sf);
                }
            this.spinner.hide();
        }).catch((error) => {
            this.log.debug(error);
            this.spinner.hide();
        });
    }

    displayAlertBox(isSuccess: boolean, message: string) {
        if (isSuccess) {
            this.alertClass = "alert alert-success";
        }
        else {
            this.alertClass = "alert alert-danger";
        }
        if (message) {
            message = StaticHelper.bulletList(message.split("\n"));
        }
        this.alertMessage = message;
        this.displayAlert = true;
        setTimeout(() => {
            this.displayAlert = false;
        }, this.constants.ResponseMessageTimeout * 1000);
    }

    priceAmountKeyup(f) {
        let grossAmount = f.price.value * f.amount.value;
        if (f == this.bf) {
            let feeAmount = grossAmount * (StaticHelper.unfloatAmount(this.currencyPair.buy_fee) / 100);
            let totalAmount = grossAmount + feeAmount;
            this.limitBuyGrossAmount = StaticHelper.bestScale(grossAmount)
                + " " + this.currencyPair.tc_name;
            //this.limitBuyFeeAmount = feeAmount.toFixed(StaticHelper.bestScale(0));
            this.limitBuyTotalAmount = totalAmount.toFixed(StaticHelper.minScale(this.currencyPair.tc_scale)) + " " + this.currencyPair.tc_name;;
        }
        else {
            let feeAmount = grossAmount * (StaticHelper.unfloatAmount(this.currencyPair.sell_fee) / 100);
            let totalAmount = grossAmount + feeAmount;
            this.limitSellGrossAmount = StaticHelper.bestScale(grossAmount)
                + " " + this.currencyPair.tc_name;
            //this.limitSellFeeAmount = feeAmount.toFixed(StaticHelper.bestScale(0));
            this.limitSellTotalAmount = totalAmount.toFixed(StaticHelper.minScale(this.currencyPair.tc_scale)) + " " + this.currencyPair.tc_name;;
        }
    }

}
