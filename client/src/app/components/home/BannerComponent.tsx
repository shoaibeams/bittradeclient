import { BaseComponent } from "../base/BaseComponent";
import * as React from "react";
import { Link } from "react-router-dom";
import { StaticHelper } from "../../../shared/static-helper";
import { mdFormControl } from "../../../shared/form-control";
import { CSSTransition } from 'react-transition-group';
import { Transitions } from "../../../models/transitions";
import { TransitionState } from "../../../enums/transition";

export default class BannerComponent extends BaseComponent {

    render() {
        this.initShorts();
        let scp: any = {};
        if (this.g.selectedCurrencyPair) {
            scp = this.g.selectedCurrencyPair;
        }
        let sbh: any = {};
        if (this.g.selectedBriefHistory) {
            sbh = this.g.selectedBriefHistory;
            if (this.g.selectedCurrencyPair && this.g.selectedBriefHistory && this.f.tc.value == '') {
                this.state = {
                    ...this.state,
                    fcPlaceholder: this.calculatePlceholder('tc'),
                }
            }
        }
        if (sbh != this.previousHistory) {
            this.setAnimValuesForSelectedPairHistory(sbh, this.previousHistory);
            this.previousHistory = sbh;
        }
        // this.log.debug("render banner");
        return (
            <section className="banner clearfix">
                <div className="container">
                    <p> Buy your digital assests in native currency pairs to reduce huge conversion cost.
                Now supporting buying in GBP, Euro and USD</p>
                    <div className="row">
                        <div className="col-md-12">
                            <span className="last_price brdroup" style={{ width: '100%', margin: '0px 20px', lineHeight: '25px', float: 'right' }}>
                                {
                                    this.getCurrencyPairDropDown(this, this.g, this.setSelectedCurrencyPair, true)
                                }
                            </span>
                        </div>
                    </div>
                    <div className="bannerb clearfix">
                        <div className="col-md-3 col-sm-6 col-xs-6">
                            <div className="buy-txt">Buy {scp.fc_name} at:<br />
                                {
                                    this.animatedCSSDiv(sbh.current_buy, this.state.animValues.current_buy)
                                }
                                {/* <div onAnimationEnd={(e) => { this.updateState({ fcChange: false }); }}
                                    className={`content-only ${this.state.fcChange ? 'rubberBand animated delay-2s' : ''}`}>
                                    {sbh.current_buy}
                                </div> */}
                                {/* <CSSTransition
                                    key={sbh.current_buy}
                                    classNames=""
                                    in={this.state.fcChange}
                                    onEntered={(e) => {
                                        this.updateState({
                                            fcChange: false,
                                        });
                                        this.log.debug("onEntered")
                                    }}
                                    timeout={2000}
                                    children={
                                        <div className={`content-only ${this.state.fcChange ? 'rubberBand animated delay-2s' : ''}`}>
                                            <span>{sbh.current_buy}</span>
                                        </div>}
                                /> */}
                                &nbsp;{scp.tc_name}<br/>
                                <Link to={this.g.isLoggedIn ? this.getLink(this.constants.RoutePaths.Trade) : this.getLink(this.constants.RoutePaths.Login)}>
                                    <img src="assets/images/buy-icon.png" alt={this.lang.Buy} />
                                    <br />
                                    {this.lang.Sell} {this.lang.Now}
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-6">
                            <div className="sell-txt">{this.lang.Sell} {scp.fc_name} at:<br />
                                {
                                    this.animatedCSSDiv(sbh.current_sell, this.state.animValues.current_sell)
                                }
                                &nbsp;{scp.tc_name}<br/>
                                <Link to={this.g.isLoggedIn ? this.getLink(this.constants.RoutePaths.Trade) : this.getLink(this.constants.RoutePaths.Login)}>
                                    <img src="assets/images/sell-icon.png" alt={this.lang.Sell} />
                                    <br />
                                    {this.lang.Sell} {this.lang.Now}
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12 col-xs-12">
                            <div className="row">
                                <div className="buysellwrap clearfix">
                                    <div className="von-form clearfix">
                                        <div className="von-left">
                                            <h4 className="display-table buysellswitch">
                                                <span className={`buy ${this.state.isBuy ? 'on' : ''}`}>{this.lang.Buy}</span>
                                                <span>&nbsp;</span>
                                                <label className="switch valign-middle">
                                                    <input onChange={this.buySellChange.bind(this)} type="checkbox" value={this.state.isBuy} />
                                                    <span className="slider"></span>
                                                </label>
                                                <span>&nbsp;</span>
                                                <span className={`sell ${this.state.isBuy ? '' : 'on'}`}>{this.lang.Sell}</span></h4>
                                            {
                                                this.numberInput(this, this.f.fc, this.calculatorInput, this.state.fcStep, 0,
                                                    this.maxInputValue, this.state.fcPlaceholder,
                                                    this.g.selectedCurrencyPair ? this.g.selectedCurrencyPair.fcd_scale : 0)
                                            }
                                        </div>
                                        <div className="von-right">
                                            <span className=" buy-btn">
                                                <span className="select-wrapper">
                                                    <span className="holder">{scp.fc_name}</span></span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="von-form clearfix">
                                        <div className="von-left">
                                            <h4>{this.state.isBuy ? this.lang.Cost : this.lang.YouGet}</h4>
                                            {
                                                this.numberInput(this, this.f.tc, this.calculatorInput, this.state.tcStep, 0,
                                                    this.maxInputValue, this.state.tcPlaceholder,
                                                    this.g.selectedCurrencyPair ? this.g.selectedCurrencyPair.tcd_scale : 0)
                                            }
                                        </div>
                                        <div className="von-right">
                                            <span className=" sell-btn">
                                                <span className="select-wrapper">
                                                    <span className="holder">{scp.tc_name}</span>
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    constructor(props) {
        super(props);
        this.init();
    }

    maxInputValue: number;
    firstRun: boolean = true;
    previousHistory: any;

    init() {
        this.maxInputValue = 99999999;
        this.state = {
            form: {
                fc: new mdFormControl('', "fc"),
                tc: new mdFormControl('', "tc"),
            },
            isBuy: true,
            fcStep: 1,
            tcStep: 25,
            tcPlaceholder: 25,
            fcPlaceholder: '',
            animValues: {
                current_buy: new mdFormControl(this.getTransisition(Transitions.origional, TransitionState.Completed), 'current_buy'),
                current_sell: new mdFormControl(this.getTransisition(Transitions.origional, TransitionState.Completed), 'current_sell'),
            }
        }
        this.state = {
            ...this.state,
            fcPlaceholder: this.calculatePlceholder('tc'),
        }
    }

    buySellChange = (e) => {
        this.updateState({
            isBuy: !this.state.isBuy
        })
        this.calculatorInput('', null);
    }

    updatePlaceholder(field: string) {
        let value = this.calculatePlceholder(field);
        let obj = {};
        obj = field == 'tc' ? {
            fcPlaceholder: value
        } : {
                tcPlaceholder: value
            }
        this.updateState(obj);
    }

    calculatePlceholder(field: string)//1 for fc and 2 for tc
    {
        if (!this.g.selectedBriefHistory || !this.g.selectedCurrencyPair) {
            return;
        }
        let value: number;
        if (this.state.isBuy) {
            if (field == 'fc')//fc
            {
                value = this.state.fcPlaceholder * this.g.selectedBriefHistory.current_buy;
                value = StaticHelper.roundNumber(value, this.g.selectedCurrencyPair.tcd_scale);
            }
            else {
                value = this.state.tcPlaceholder / this.g.selectedBriefHistory.current_buy;
                value = StaticHelper.roundNumber(value, this.g.selectedCurrencyPair.fcd_scale);
            }
        }
        else {
            if (field == 'fc')//fc
            {
                value = this.state.fcPlaceholder * this.g.selectedBriefHistory.current_sell;
                value = StaticHelper.roundNumber(value, this.g.selectedCurrencyPair.tcd_scale);
            }
            else {
                value = this.state.tcPlaceholder / this.g.selectedBriefHistory.current_sell;
                value = StaticHelper.roundNumber(value, this.g.selectedCurrencyPair.fcd_scale);
            }
        }
        return value;
    }

    handleFormControlInput = (field, value) => {
        if (!value) {
            return;
        }
        let form = this.state.form;
        form[field].value = value;
        if (this.showErrors) {
            form[field] = this.validateFormControl(form[field]);
        }
        this.updateState({ form: form });
    }

    calculatorInput = (field: string, e: any) =>//1 for fc and 2 for tc
    {
        field = this.isNullOrEmpty(field) ? 'tc' : field;
        if (!e || !e.target || !this.g.selectedBriefHistory || !this.g.selectedCurrencyPair) {
            this.updatePlaceholder(field);
            return;
        }
        let value: number;
        let form = this.state.form;
        form[field].value = e.target.value;
        if (this.state.isBuy) {
            if (field == 'fc')//fc
            {
                value = form.fc.value * this.g.selectedBriefHistory.current_buy;
                value = StaticHelper.roundNumber(value, this.g.selectedCurrencyPair.tcd_scale);
                form.tc.value = value;

            }
            else {
                value = form.tc.value / this.g.selectedBriefHistory.current_buy;
                value = StaticHelper.roundNumber(value, this.g.selectedCurrencyPair.fcd_scale);
                form.fc.value = value;
            }
        }
        else {
            if (field == 'fc')//tc
            {
                value = form.fc.value * this.g.selectedBriefHistory.current_sell;
                value = StaticHelper.roundNumber(value, this.g.selectedCurrencyPair.tcd_scale);
                form.tc.value = value;
            }
            else {
                value = form.tc.value / this.g.selectedBriefHistory.current_sell;
                value = StaticHelper.roundNumber(value, this.g.selectedCurrencyPair.fcd_scale);
                form.fc.value = value;
            }
        }
        this.updateState({
            form: {
                fc: form.fc,
                tc: form.tc,
            }
        })
    }

    setAnimValuesForSelectedPairHistory(obj: any, old: any) {
        let animValues = {
            ...this.state.animValues
        };
        if (old != null) {
            //setting current buy
            if (old.id == obj.id) {
                if (old.current_buy > obj.current_buy) {
                    animValues.current_buy.value = this.runTransition(Transitions.lesser);
                }
                else if (old.current_buy < obj.current_buy) {
                    animValues.current_buy.value = this.runTransition(Transitions.greater);
                }
                else {
                    animValues.current_buy.value = this.runTransition(Transitions.origional);
                }

                // if (animValues.current_buy.value != 'origional') {
                //     setTimeout(() => {
                //         animValues.current_buy = 'origional';
                //     }, 100);
                // }
                //setting current sell
                if (old.current_sell > obj.current_sell) {
                    animValues.current_sell.value = this.runTransition(Transitions.lesser);
                }
                else if (old.current_sell < obj.current_sell) {
                    animValues.current_sell.value = this.runTransition(Transitions.greater);
                }
                else {
                    animValues.current_sell.value = this.runTransition(Transitions.origional);
                }

                // if (animValues.current_sell.value != 'origional') {
                //     setTimeout(() => {
                //         animValues.current_sell = 'origional';
                //     }, 100);
                // }
            }
        }
        this.state = {
            ...this.state,
            animValues: animValues,
        }
    }

    setSelectedCurrencyPair = (id: number, e) => {
        if (!id) {
            return;
        }
        let cps = this.g.currencyPairs.filter(m => m.id == id);
        if (cps.length > 0) {
            this.props.updateGlobalProperty(global.propKeys.selectedCurrencyPair, cps[0]);
            let obj = {
                tcStep: this.state.tcStep,
                fcStep: this.state.fcStep,
            };
            // obj.tcStep = 1 / Math.pow(10, StaticHelper.minScale(this.g.selectedCurrencyPair.tcd_scale));
            //obj.fcStep = 1 / Math.pow(10, StaticHelper.minScale(this.g.selectedCurrencyPair.fcd_scale));
            //this.updateState(obj);
            if (this.g.briefHistory) {
                let sbh = this.g.briefHistory.filter(m => m.id == id);
                if (sbh.length > 0) {
                    let old = this.g.selectedBriefHistory;
                    // this.g.selectedBriefHistory = sbh[0];
                    // this.g.selectedBriefHistory.old = old;
                    this.props.updateGlobalProperty(global.propKeys.selectedBriefHistory, sbh[0]);
                    // this.setAnimValuesForSelectedPairHistory(this.g.selectedBriefHistory);
                }
                this.calculatorInput('', null);
            }
        }
    }

}