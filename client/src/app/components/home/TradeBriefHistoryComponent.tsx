import { BaseComponent } from "../base/BaseComponent";
import * as React from "react";
import { Link } from "react-router-dom";
import { StaticHelper } from "../../../shared/static-helper";
import { mdFormControl } from "../../../shared/form-control";
import { NONAME } from "dns";
import { Transitions } from "../../../models/transitions";

export default class TradeBriefHistoryComponent extends BaseComponent {

    render() {
        this.initShorts();
        this.init();
        // this.state = {
        //     ...this.state,
        //     selectedTradePairHistory: this.setAnimValuesForTable(this.state.selectedTradePairHistory, this.selectedMarket)
        // };        
        return (
            <section className="tradingwrap clearfix">
                <div className="container">
                    <ul className="nav nav-tabs">
                        {
                            this.markets ?
                                this.markets.map((m, i) => {
                                    return (
                                        <li key={i} className={i == 0 ? 'active' : ''}>
                                            <a data-toggle="tab" href="#pairHistory" onClick={() => {
                                                let pairHistory = this.changePairHistoryTab(m); 
                                                this.updateState(
                                                    {
                                                        selectedTradePairHistory: pairHistory,
                                                    })
                                            }}>
                                                <img width="34" height="34" src={this.getCP(m).tc_icon} alt={this.getCP(m).tc_name} />
                                                <br />{this.getCP(m).tc_name}
                                            </a>
                                        </li>
                                    );
                                }) : (null)
                        }
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane fade in active" id="pairHistory">
                            <table className="table-responsive trade-brief-history-table">
                                <tbody>
                                    <tr>
                                        <td align="center" onClick={this.sortPairHistoryTab.bind(this, this.tradePairHistorySortings.pair)}
                                            className="table-head">
                                            {this.lang.Pair} <img src="assets/images/table-arrow.png" alt="arrow" />
                                        </td>
                                        <td align="center" onClick={this.sortPairHistoryTab.bind(this, this.tradePairHistorySortings.last)}
                                            className="table-head">
                                            {this.lang.LastPrice} <img src="assets/images/table-arrow.png" alt="arrow" />
                                        </td>
                                        <td align="center" onClick={this.sortPairHistoryTab.bind(this, this.tradePairHistorySortings.change)}
                                            className="table-head">
                                            24H {this.lang.Change} <img src="assets/images/table-arrow.png" alt="arrow" />
                                        </td>
                                        <td align="center" onClick={this.sortPairHistoryTab.bind(this, this.tradePairHistorySortings.high)}
                                            className="table-head">
                                            24H {this.lang.High} <img src="assets/images/table-arrow.png" alt="arrow" />
                                        </td>
                                        <td align="center" onClick={this.sortPairHistoryTab.bind(this, this.tradePairHistorySortings.low)}
                                            className="table-head">
                                            24H {this.lang.Low} <img src="assets/images/table-arrow.png" alt="arrow" />
                                        </td>
                                        <td align="center" onClick={this.sortPairHistoryTab.bind(this, this.tradePairHistorySortings.volume)}
                                            className="table-head">
                                            24H {this.lang.Volume} <img src="assets/images/table-arrow.png" alt="arrow" />
                                        </td>
                                    </tr>
                                    {
                                        this.state.selectedTradePairHistory ?
                                            this.state.selectedTradePairHistory.map((p, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td className="white-txt">
                                                            {this.getCP(p.id).fc_name}/{this.getCP(p.id).tc_name}
                                                        </td>
                                                        <td className="white-txt">
                                                            {
                                                                this.animatedCSSDiv(p.last, p.lastAnim, (e) => {
                                                                    p.lastAnim = new mdFormControl(this.getTransisition(Transitions.origional));
                                                                    this.updateState({
                                                                        selectedTradePairHistory: [
                                                                            ...this.state.selectedTradePairHistory,
                                                                            p
                                                                        ],
                                                                    })
                                                                })
                                                            }
                                                        </td>
                                                        <td className={p.change >= 0 ? 'green-txt' : 'red-txt'}>{p.change}%</td>
                                                        <td className="white-txt">
                                                            {
                                                                this.animatedCSSDiv(p.high, p.highAnim, (e) => {
                                                                    p.highAnim = new mdFormControl(this.getTransisition(Transitions.origional));
                                                                    this.updateState({
                                                                        selectedTradePairHistory: [
                                                                            ...this.state.selectedTradePairHistory,
                                                                            p
                                                                        ],
                                                                    })
                                                                })
                                                            }
                                                        </td>
                                                        <td className="white-txt">
                                                            {
                                                                this.animatedCSSDiv(p.low, p.lowAnim, (e) => {
                                                                    p.lowAnim = new mdFormControl(this.getTransisition(Transitions.origional));
                                                                    this.updateState({
                                                                        selectedTradePairHistory: [
                                                                            ...this.state.selectedTradePairHistory,
                                                                            p
                                                                        ],
                                                                    })
                                                                })
                                                            }
                                                        </td>
                                                        <td className="white-txt">
                                                            {
                                                                this.animatedCSSDiv(`${p.volume} ${this.getCP(p.id).fc_name}`, p.volumeAnim, (e) => {
                                                                    p.volumeAnim = new mdFormControl(this.getTransisition(Transitions.origional));
                                                                    this.updateState({
                                                                        selectedTradePairHistory: [
                                                                            ...this.state.selectedTradePairHistory,
                                                                            p
                                                                        ],
                                                                    })
                                                                })
                                                            }
                                                        </td>
                                                    </tr >
                                                );
                                            }) : (null)
                                    }
                                </tbody >
                            </table >
                        </div >
                    </div >
                    <div className="text-center trading-box">
                        <Link className="color-white" to={this.g.isLoggedIn ? this.getLink(this.constants.RoutePaths.Trade) : this.getLink(this.constants.RoutePaths.Login)}>
                            StartTrading Now
                        </Link>
                    </div >
                </div >
            </section >
        );
    }

    constructor(props) {
        super(props);
        this.init();
    }

    tradePairHistorySortings: any = { pair: 1, last: 2, change: 3, high: 4, low: 5, volume: 6 };
    tradePairhistoryCurrentSorting: any = { sort: this.tradePairHistorySortings.pair, isASC: true };
    selectedMarket: string;
    markets: any[];
    oldHistory: any[];
    oldTCName: string;

    init() {
        //market data
        if (this.g.currencyPairs) {
            let tcCurrencies = this.g.currencyPairs.map(m => {
                return m.tc_name;
            });
            this.markets = StaticHelper.distinctArray(tcCurrencies);
        }
        if (!this.selectedMarket) {
            if (this.markets) {
                if (this.markets.length > 0) {
                    this.selectedMarket = this.markets[0];
                }
            }
        }
        this.state = {
            selectedTradePairHistory: []
        }
        this.state = {
            selectedTradePairHistory: this.selectedMarket ? this.changePairHistoryTab(this.selectedMarket) : []
        }
    }

    getCP(id) { return this.g.currencyPairs.filter(m => m.id == id || m.tc_name == id)[0]; }

    sortPairHistoryTab(sorting: number) {
        if (sorting == this.tradePairhistoryCurrentSorting.sort) {
            this.tradePairhistoryCurrentSorting.isASC = !this.tradePairhistoryCurrentSorting.isASC;
        }
        else {
            this.tradePairhistoryCurrentSorting.isASC = true;
        }
        this.tradePairhistoryCurrentSorting.sort = sorting;
        if (this.g.selectedBriefHistory) {
            this.updateState({
                selectedTradePairHistory: this.state.selectedTradePairHistory.sort(this.sortPairHistoryTabInner)
            });
        }
    }

    changePairHistoryTab(name: string) {
        if (!this.g.briefHistory || !this.g.currencyPairs) {
            return;
        }
        let currentSelectedPairs = this.g.currencyPairs.filter(m => m.tc_name == name).map(m => { return m.id });

        let newHistory = this.setAnimValuesForTable(
            this.g.briefHistory.filter(m => {
                if (currentSelectedPairs.indexOf(m.id) == -1) {
                    return false;
                }
                else {
                    return true;
                }
            }).sort(this.sortPairHistoryTabInner), name);
        this.selectedMarket = name;
        return newHistory;
    }

    setAnimValuesForTable(obj: any[], newTCName: string) {
        let returnWithoutSettingAnimValues = false;
        if(this.isNullOrEmpty(this.oldHistory))
        {
            returnWithoutSettingAnimValues = true;
        }
        if (this.oldTCName != newTCName) {
            returnWithoutSettingAnimValues = true;
        }
        if(returnWithoutSettingAnimValues)
        {
            this.oldHistory = obj;
            this.oldTCName = newTCName;
            return obj;
        }
        for (let i = 0; i < obj.length; i++) {
            let old = this.oldHistory.filter(m => m.id == obj[i].id);
            if (old.length > 0) {
                old = old[0];
            }
            else {
                old = null;
            }
            obj[i].old = old;
            if (obj[i].old != null) {
                //setting last
                if (obj[i].old.last > obj[i].last) {
                    obj[i].lastAnim = new mdFormControl(this.runTransition(Transitions.lesser));
                }
                else if (obj[i].old.last < obj[i].last) {
                    obj[i].lastAnim = new mdFormControl(this.runTransition(Transitions.greater));
                }
                else {
                    obj[i].lastAnim = new mdFormControl(this.runTransition(Transitions.origional));
                }

            }
            if (obj[i].old != null) {
                //setting change
                if (obj[i].old.change > obj[i].change) {
                    obj[i].changeAnim = new mdFormControl(this.runTransition(Transitions.lesser));
                }
                else if (obj[i].old.change < obj[i].change) {
                    obj[i].changeAnim = new mdFormControl(this.runTransition(Transitions.greater));
                }
                else {
                    obj[i].changeAnim = new mdFormControl(this.runTransition(Transitions.origional));
                }

            }
            if (obj[i].old != null) {
                //setting high
                if (obj[i].old.high > obj[i].high) {
                    obj[i].highAnim = new mdFormControl(this.runTransition(Transitions.lesser));
                }
                else if (obj[i].old.high < obj[i].high) {
                    obj[i].highAnim = new mdFormControl(this.runTransition(Transitions.greater));
                }
                else {
                    obj[i].highAnim = new mdFormControl(this.runTransition(Transitions.origional));
                }

            }
            if (obj[i].old != null) {
                //setting low
                if (obj[i].old.low > obj[i].low) {
                    obj[i].lowAnim = new mdFormControl(this.runTransition(Transitions.lesser));
                }
                else if (obj[i].old.low < obj[i].low) {
                    obj[i].lowAnim = new mdFormControl(this.runTransition(Transitions.greater));
                }
                else {
                    obj[i].lowAnim = new mdFormControl(this.runTransition(Transitions.origional));
                }

            }
            if (obj[i].old != null) {
                //setting volume
                if (obj[i].old.volume > obj[i].volume) {
                    obj[i].volumeAnim = new mdFormControl(this.runTransition(Transitions.lesser));
                }
                else if (obj[i].old.volume < obj[i].volume) {
                    obj[i].volumeAnim = new mdFormControl(this.runTransition(Transitions.greater));
                }
                else {
                    obj[i].volumeAnim = new mdFormControl(this.runTransition(Transitions.origional));
                }

            }
        }
        this.oldHistory = obj;
        this.oldTCName = newTCName;
        return obj;
    }

    sortPairHistoryTabInner = (a, b) => {
        if (this.tradePairhistoryCurrentSorting.sort == this.tradePairHistorySortings.pair) {
            if (a.fc_name + '/' + a.tc_name > b.fc_name + '/' + b.tc_name) {
                return this.tradePairhistoryCurrentSorting.isASC ? 1 : -1;
            }
            else {
                return this.tradePairhistoryCurrentSorting.isASC ? -1 : 1;
            }
        }
        else
            if (this.tradePairhistoryCurrentSorting.sort == this.tradePairHistorySortings.last) {
                if (a.last > b.last) {
                    return this.tradePairhistoryCurrentSorting.isASC ? 1 : -1;
                }
                else {
                    return this.tradePairhistoryCurrentSorting.isASC ? -1 : 1;
                }
            }
            else
                if (this.tradePairhistoryCurrentSorting.sort == this.tradePairHistorySortings.change) {
                    if (a.change > b.change) {
                        return this.tradePairhistoryCurrentSorting.isASC ? 1 : -1;
                    }
                    else {
                        return this.tradePairhistoryCurrentSorting.isASC ? -1 : 1;
                    }
                }
                else
                    if (this.tradePairhistoryCurrentSorting.sort == this.tradePairHistorySortings.high) {
                        if (a.high > b.high) {
                            return this.tradePairhistoryCurrentSorting.isASC ? 1 : -1;
                        }
                        else {
                            return this.tradePairhistoryCurrentSorting.isASC ? -1 : 1;
                        }
                    }
                    else
                        if (this.tradePairhistoryCurrentSorting.sort == this.tradePairHistorySortings.low) {
                            if (a.low > b.low) {
                                return this.tradePairhistoryCurrentSorting.isASC ? 1 : -1;
                            }
                            else {
                                return this.tradePairhistoryCurrentSorting.isASC ? -1 : 1;
                            }
                        }
                        else
                            if (this.tradePairhistoryCurrentSorting.sort == this.tradePairHistorySortings.volume) {
                                if (a.low > b.low) {
                                    return this.tradePairhistoryCurrentSorting.isASC ? 1 : -1;
                                }
                                else {
                                    return this.tradePairhistoryCurrentSorting.isASC ? -1 : 1;
                                }
                            }
    }

}