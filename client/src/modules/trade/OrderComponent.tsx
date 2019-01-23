import { BaseComponent } from "../../app/components/base/BaseComponent";
import * as React from "react";
import { mdOrder } from "../../models/order";
import { mdFormControl } from "../../shared/form-control";
import * as ValidationAttributes from "../../shared/validation-attributes";
import { mdCallResponse } from "../../models/call-response";
import { StaticHelper } from "../../shared/static-helper";
import * as EnumsOrder from "../../enums/order";
import NBSpinnerComponent from "../shared/spinner/NBSpinnerComponent";

export default class OrderComponent extends BaseComponent {

    render() {
        this.initShorts();
        this.componentMountedFirstTime = true;
        return (
            <div className="row">
                <div className=" col-md-12">
                    <NBSpinnerComponent {...this.props} params={{ show: this.state.showSpinner }} />
                    <ul className="nav nav-tabs">
                        <li className="active"><a data-toggle="tab" href="#star-tab">{this.lang.Limit}</a></li>
                        {/* <li><a data-toggle="tab" href="#usd-tab">{{lang.Market}}</a></li>
            <li><a data-toggle="tab" href="#eur-tab">Stop-Loss</a></li> */}
                    </ul>
                    <div className="tab-content">
                        <div id="star-tab" className="tab-pane fade in active">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="tabs_das">
                                        <h3>{this.lang.AvailableBalance}<span>{this.state.buyBalance}</span></h3>
                                        <form>
                                            <div className="input_elment">
                                                <label>{this.lang.Price}</label>
                                                {
                                                    this.numberInput(this, this.state.bform.price, (name, e) => {
                                                        this.handleFormControlInput(name, e, "bform");
                                                        this.priceAmountKeyup(EnumsOrder.Action.buy);
                                                    }, this.state.priceStep, 0, 9999999, this.currencyPair ? this.currencyPair.tc_name : "")
                                                }
                                            </div>
                                            <div className="input_elment">
                                                <label>{this.lang.Amount}</label>
                                                {
                                                    this.numberInput(this, this.state.bform.amount, (name, e) => {
                                                        this.handleFormControlInput(name, e, "bform");
                                                        this.priceAmountKeyup(EnumsOrder.Action.buy);
                                                    }, this.state.amountStep, 0, 9999999, this.currencyPair ? this.currencyPair.fc_name : "")
                                                }
                                            </div>
                                            <div className="vin">
                                                <span>25%</span>&nbsp;<span>50%</span>&nbsp;<span>75%</span>&nbsp;<span>100%</span>
                                            </div>
                                            <div className="to_amount">
                                                <label>{this.lang.Gross}</label>
                                                <span>{this.state.limitBuyGrossAmount}</span>
                                            </div>
                                            <div className="to_amount">
                                                <label>{this.lang.Fee}</label>
                                                <span>{this.state.limitBuyFeeAmount}</span>
                                            </div>
                                            <div className="to_amount">
                                                <label>{this.lang.Total}</label>
                                                <span>{this.state.limitBuyTotalAmount}</span>
                                            </div>
                                            <button className={`buy_bt ${this.state.disableBuyButton ? 'nb-spinner-container' : ''}`}
                                                disabled={this.state.disableBuyButton}
                                                onClick={(e) => { this.onSubmit(EnumsOrder.Action.buy, e) }}>
                                                <NBSpinnerComponent {...this.props} params={{ show: this.state.disableBuyButton }} />
                                                <img src="assets/images/buy-icon.png" style={{ width: '20px', marginRight: '10px' }}
                                                    alt="lang.Buy" />
                                                <span>{this.lang.Buy}</span>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="tabs_das">
                                        <h3>{this.lang.AvailableBalance}<span>{this.state.sellBalance}</span></h3>
                                        <form>
                                            <div className="input_elment">
                                                <label>{this.lang.Price}</label>
                                                {
                                                    this.numberInput(this, this.state.sform.price, (name, e) => {
                                                        this.handleFormControlInput(name, e, "sform");
                                                        this.priceAmountKeyup(EnumsOrder.Action.sell);
                                                    }, this.state.priceStep, 0, 9999999, this.currencyPair ? this.currencyPair.tc_name : "")
                                                }
                                            </div>
                                            <div className="input_elment">
                                                <label>{this.lang.Amount}</label>
                                                {
                                                    this.numberInput(this, this.state.sform.amount, (name, e) => {
                                                        this.handleFormControlInput(name, e, "sform");
                                                        this.priceAmountKeyup(EnumsOrder.Action.sell);
                                                    }, this.state.amountStep, 0, 9999999, this.currencyPair ? this.currencyPair.fc_name : "")
                                                }
                                            </div>
                                            <div className="vin">
                                                <span>25%</span>&nbsp;<span>50%</span>&nbsp;<span>75%</span>&nbsp;<span>100%</span>
                                            </div>
                                            <div className="to_amount">
                                                <label>{this.lang.Gross}</label>
                                                <span>{this.state.limitSellGrossAmount}</span>
                                            </div>
                                            <div className="to_amount">
                                                <label>{this.lang.Fee}</label>
                                                <span>{this.state.limitSellFeeAmount}</span>
                                            </div>
                                            <div className="to_amount">
                                                <label>{this.lang.Total}</label>
                                                <span>{this.state.limitSellTotalAmount}</span>
                                            </div>
                                            <button className={`buy_bt bt_dark ${this.state.disableSellButton ? 'nb-spinner-container' : ''}`}
                                                disabled={this.state.disableSellButton}
                                                onClick={(e) => { this.onSubmit(EnumsOrder.Action.sell, e) }}>
                                                <NBSpinnerComponent {...this.props} params={{ show: this.state.disableSellButton }} />
                                                <img src="assets/images/sell-icon.png" style={{ width: '20px', marginRight: '5px' }}
                                                    alt="lang.Sell" />
                                                <span>{this.lang.Sell}</span>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            this.getAlertDiv()
                        }
                    </div>
                </div>
            </div>
        );
    }

    currencyPair: any;
    model: mdOrder;

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.model = new mdOrder(true);
        this.state = {
            bform: {
                price: new mdFormControl('', "price", this.lang.Price, [
                    // new ValidationAttributes.RequiredValidator(this.lang.RequiredFormat),
                ]),
                amount: new mdFormControl('', "amount", this.lang.Amount, [
                    // new ValidationAttributes.RequiredValidator(this.lang.RequiredFormat),
                ]),
                showErrors: false,
            },
            sform: {
                price: new mdFormControl('', "price", this.lang.Price, [
                    // new ValidationAttributes.RequiredValidator(this.lang.RequiredFormat),
                ]),
                amount: new mdFormControl('', "amount", this.lang.Amount, [
                    // new ValidationAttributes.RequiredValidator(this.lang.RequiredFormat),
                ]),
                showErrors: false,
            },
            sellBalance: "",
            buyBalance: "",
            showSpinner: true,
            limitBuyGrossAmount: "",
            limitBuyTotalAmount: "",
            limitSellGrossAmount: "",
            limitSellTotalAmount: "",
            limitBuyFeeAmount: "",
            limitSellFeeAmount: "",
            priceStep: 1,
            amountStep: 1,
            disableBuyButton: false,
            disableSellButton: false,
        }
    }

    resetForm(action: EnumsOrder.Action) {
        if (action == EnumsOrder.Action.buy) {
            this.updateState({
                bform: {
                    price: new mdFormControl('', "price", this.lang.Price, [
                        // new ValidationAttributes.RequiredValidator(this.lang.RequiredFormat),
                    ]),
                    amount: new mdFormControl('', "amount", this.lang.Amount, [
                        // new ValidationAttributes.RequiredValidator(this.lang.RequiredFormat),
                    ]),
                    showErrors: false,
                },
                buyBalance: "",
                limitBuyGrossAmount: "",
                limitBuyTotalAmount: "",
                limitBuyFeeAmount: "",
                priceStep: 1,
                amountStep: 1,
            })
        }
        else {
            this.updateState({
                sform: {
                    price: new mdFormControl('', "price", this.lang.Price, [
                        // new ValidationAttributes.RequiredValidator(this.lang.RequiredFormat),
                    ]),
                    amount: new mdFormControl('', "amount", this.lang.Amount, [
                        // new ValidationAttributes.RequiredValidator(this.lang.RequiredFormat),
                    ]),
                    showErrors: false,
                },
                sellBalance: "",
                limitSellGrossAmount: "",
                limitSellTotalAmount: "",
                limitSellFeeAmount: "",
                priceStep: 1,
                amountStep: 1,
            })
        }
    }

    componentWillUpdate() {
        if (!this.currencyPair) {
            this.recievedNewChanges(this.g.selectedCurrencyPair);
        }
    }

    recievedNewChanges(newCP) {
        if (!newCP) {
            return;
        }
        let oldCP = this.currencyPair;
        if (oldCP) {
            if (oldCP.id == newCP.id) {
                return;
            }
        }
        this.currencyPair = newCP;
        if (this.currencyPair) {
            this.state = {
                ...this.state,
                showSpinner: true,
            }
            this.loadBalanceAndFee();
        }
    }

    loadBalanceAndFee() {
        this.updateState({
            sellBalance: "",
            buyBalance: "",
            showSpinner: true,
        })

        if (this.currencyPair.id) {
            this.http.post<mdCallResponse>(this.constants.EndPoints.PostPairDetails, this.currencyPair.id).then((res:mdCallResponse) => {
                if (res.isSuccess) {
                    Object.assign(this.currencyPair, res.extras);
                    this.log.debug(this.currencyPair);
                    this.updateBalances();
                }
                this.updateState({
                    showSpinner: false
                })
            }).catch((error) => {
                this.log.debug(error);
                this.updateState({
                    showSpinner: false
                })
            });
        }
    }

    updateBalances() {
        if (!this.currencyPair) {
            return;
        }
        this.updateState({
            sellBalance: (this.currencyPair.fc_available_balance / this.constants.Float)
                .toFixed(this.currencyPair.fc_scale) + " " + this.currencyPair.fc_name,
            buyBalance: (this.currencyPair.tc_available_balance / this.constants.Float)
                .toFixed(this.currencyPair.tc_scale) + " " + this.currencyPair.tc_name,
            limitBuyFeeAmount: StaticHelper.bestScale(StaticHelper.unfloatAmount(this.currencyPair.buy_fee)) + "%",
            limitSellFeeAmount: StaticHelper.bestScale(StaticHelper.unfloatAmount(this.currencyPair.sell_fee)) + "%",
            priceStep: 1 / Math.pow(10, StaticHelper.minScale(this.currencyPair.tc_scale)),
            amountStep: 1 / Math.pow(10, StaticHelper.minScale(this.currencyPair.fc_scale)),
        })
    }

    onSubmit(action: EnumsOrder.Action, e) {
        e.preventDefault();
        //validate form locally
        let formData: mdOrder;
        if (action == this.constants.Order.Action.buy) {
            if (!this.state.sform.showErrors) {
                this.updateState({
                    bform: {
                        ...this.state.bform,
                        showErrors: true,
                    }
                })
            }
            if (!this.validateForm("bform")) {
                return;
            }

            formData = this.getFormData(this.state.bform) as mdOrder;
            this.updateState({
                disableBuyButton: true,
            })
        }
        else
            if (action == this.constants.Order.Action.sell) {
                if (!this.state.sform.showErrors) {
                    this.updateState({
                        sform: {
                            ...this.state.sform,
                            showErrors: true,
                        }
                    })
                }
                if (!this.validateForm("sform")) {
                    return;
                }

                formData = this.getFormData(this.state.sform) as mdOrder;
                this.updateState({
                    disableSellButton: true,
                })
            }
        formData.action = action;
        formData.currencyPair = this.currencyPair.id;
        formData.type = this.constants.Order.Type.limit;
        let res: mdCallResponse = new mdCallResponse();

        this.http.post<mdCallResponse>(this.constants.EndPoints.PostOrder, formData).then((res: mdCallResponse) => {
            this.log.debug(res);
            this.showAlertDiv(res.isSuccess, res.message);
            this.loadBalanceAndFee();
            this.resetForm(action);

            this.updateState({
                disableSellButton: false,
                disableBuyButton: false,
            })
            if(res.isSuccess)
            {
                this.p.onNewOrder();
            }
        }).catch((error) => {
            this.log.debug(error);
            this.updateState({
                disableSellButton: false,
                disableBuyButton: false,
            })
        });
    }

    priceAmountKeyup(action: EnumsOrder.Action) {
        let f: any;
        f = action == EnumsOrder.Action.buy ? this.state.bform : this.state.sform;
        let grossAmount = f.price.value * f.amount.value;
        if (action == EnumsOrder.Action.buy) {
            let feeAmount = grossAmount * (StaticHelper.unfloatAmount(this.currencyPair.buy_fee) / 100);
            let totalAmount = grossAmount + feeAmount;
            this.updateState({
                limitBuyGrossAmount: StaticHelper.bestScale(grossAmount)
                    + " " + this.currencyPair.tc_name,
                limitBuyTotalAmount: totalAmount.toFixed(StaticHelper.minScale(this.currencyPair.tc_scale)) + " " + this.currencyPair.tc_name,
            })
        }
        else {
            let feeAmount = grossAmount * (StaticHelper.unfloatAmount(this.currencyPair.sell_fee) / 100);
            let totalAmount = grossAmount + feeAmount;
            this.updateState({
                limitSellGrossAmount: StaticHelper.bestScale(grossAmount)
                    + " " + this.currencyPair.tc_name,
                limitSellTotalAmount: totalAmount.toFixed(StaticHelper.minScale(this.currencyPair.tc_scale)) + " " + this.currencyPair.tc_name,
            })
        }
    }

}