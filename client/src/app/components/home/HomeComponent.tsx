import { BaseComponent } from "../BaseComponent";
import { mdFormControl } from "../../../shared/form-control";
import { StaticHelper } from "../../../shared/static-helper";
import { mdCallResponse } from "../../../models/call-response";

export class HomeComponent extends BaseComponent {

    briefHistory: any[] = [];
    currencyPairs: any[];
    defaultCurrencyPair: number;
    defaultBuyFee: number;
    defaultSellFee: number;
    selectedCurrencyPair: any = {};
    selectedBriefHistory: any = {};
    // selectedBriefHistoryOld: any = {};
    selectedTradePairHistory: any[];
    loadingPairDetails: boolean;
    loadingCurrencies: boolean;
    isBuy: boolean;
    fcStep: number;
    tcStep: number;
    tcPlaceholder: number;
    fcPlaceholder: number;
    sortedPairs: any[];
    firstPair: any = {};
    secondPair: any = {};
    thirdPair: any = {};
    fourthPair: any = {};
    markets: any[];
    tradePairHistorySortings: any = { pair: 1, last: 2, change: 3, high: 4, low: 5, volume: 6 };
    tradePairhistoryCurrentSorting: any = { sort: this.tradePairHistorySortings.pair, isASC: true };
    selectedMarket: string;
    animValues: any = {
        current_by: 'origional',
        current_sell: 'origional',
        cards: [{
            last: 'origional',
            volume: 'origional',
        }, {
            last: 'origional',
            volume: 'origional',
        }, {
            last: 'origional',
            volume: 'origional',
        }, {
            last: 'origional',
            volume: 'origional',
        }
        ],
    };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.tcPlaceholder = 25;
        this.isBuy = true;
        this.loadingPairDetails = true;
        // this.loadCurrencies();
        this.state = {
            form: {
                fc: new mdFormControl(null, "fc"),
                tc: new mdFormControl(null, "fc"),
            },
        }
    }

    getCP(id) { return this.currencyPairs.filter(m => m.id == id || m.tc_name == id)[0]; }

    getCPs(value) { return this.currencyPairs.filter(m => m.id == value || m.tc_name == value); }

    changePairHistoryTab(name: string) {
        setTimeout(() => {
            let currentSelectedPairs = this.currencyPairs.filter(m => m.tc_name == name).map(m => { return m.id });
            this.selectedTradePairHistory = this.setAnimValuesForTable(this.selectedTradePairHistory, 
                this.briefHistory.filter(m => {
                if (currentSelectedPairs.indexOf(m.id) == -1) {
                    return false;
                }
                else {
                    return true;
                }
            }).sort(this.sortPairHistoryTabInner), this.selectedMarket ? this.selectedMarket : '', name);
            this.selectedMarket = name;
        }, 150);
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

    sortPairHistoryTab(sorting: number) {
        if (sorting == this.tradePairhistoryCurrentSorting.sort) {
            this.tradePairhistoryCurrentSorting.isASC = !this.tradePairhistoryCurrentSorting.isASC;
        }
        else {
            this.tradePairhistoryCurrentSorting.isASC = true;
        }
        this.tradePairhistoryCurrentSorting.sort = sorting;
        if (this.selectedTradePairHistory) {
            this.selectedTradePairHistory = this.selectedTradePairHistory.sort(this.sortPairHistoryTabInner);
        }
    }

    calculatorInput(inputType: number)//1 for fc and 2 for tc
    {
        if (!this.f.fc.value && !this.f.tc.value) {
            this.calculatePlceholder(this.isBuy ? 2 : 1);
            return;
        }
        let value: number;
        if (this.isBuy) {
            if (inputType == 1)//fc
            {
                value = this.state.form.fc.value * this.selectedBriefHistory.current_buy;
                value = StaticHelper.roundNumber(value, this.selectedCurrencyPair.tcd_scale);
                this.state.form.tc.value = value;
                this.setState({
                    form:{
                        ...this.state.form,
                    }
                })
                // this.setState({
                //     form:{
                //         ...this.state.form,
                //         tc:{
                //             ...this.state.form.tc,
                //             value: value,
                //         }
                //     }
                // });

            }
            else {
                value = this.state.form.tc.value / this.selectedBriefHistory.current_buy;
                value = StaticHelper.roundNumber(value, this.selectedCurrencyPair.fcd_scale);
                this.state.form.fc.value = value;
                this.setState({
                    form:{
                        ...this.state.form,
                    }
                })
            }
        }
        else {
            if (inputType == 1)//fc
            {
                value = this.state.form.fc.value * this.selectedBriefHistory.current_sell;
                value = StaticHelper.roundNumber(value, this.selectedCurrencyPair.tcd_scale);
                this.state.form.tc.value = value;
                this.setState({
                    form:{
                        ...this.state.form,
                    }
                })
            }
            else {
                value = this.state.form.tc.value / this.selectedBriefHistory.current_sell;
                value = StaticHelper.roundNumber(value, this.selectedCurrencyPair.fcd_scale);
                this.state.form.fc.value = value;
                this.setState({
                    form:{
                        ...this.state.form,
                    }
                })
            }
        }
    }

    calculatePlceholder(inputType: number)//1 for fc and 2 for tc
    {
        let value: number;
        if (this.isBuy) {
            if (inputType == 1)//fc
            {
                value = this.fcPlaceholder * this.selectedBriefHistory.current_buy;
                value = StaticHelper.roundNumber(value, this.selectedCurrencyPair.tcd_scale);
                this.tcPlaceholder = value;

            }
            else {
                value = this.tcPlaceholder / this.selectedBriefHistory.current_buy;
                value = StaticHelper.roundNumber(value, this.selectedCurrencyPair.fcd_scale);
                this.fcPlaceholder = value;
            }
        }
        else {
            if (inputType == 1)//fc
            {
                value = this.fcPlaceholder * this.selectedBriefHistory.current_sell;
                value = StaticHelper.roundNumber(value, this.selectedCurrencyPair.tcd_scale);
                this.tcPlaceholder = value;
            }
            else {
                value = this.tcPlaceholder / this.selectedBriefHistory.current_sell;
                value = StaticHelper.roundNumber(value, this.selectedCurrencyPair.fcd_scale);
                this.fcPlaceholder = value;
            }
        }
    }

    buySellChange() {
        this.isBuy = !this.isBuy;
        this.calculatorInput(1);
    }

    getBuyStyle() {
        return {
            'color': this.isBuy ? '#40b9cd' : 'inherit',
            'text-decoration': this.isBuy ? 'none' : 'line-through'
        };
    }

    getSellStyle() {
        return {
            'color': this.isBuy ? 'inherit' : '#f5675d',
            'text-decoration': this.isBuy ? 'line-through' : 'none',
        };
    }

    // loadCurrencies() {
    //     this.loadingCurrencies = true;
    //     this.http.get(this.constants.EndPoints.GetCurrenciesCurrencyPairs).then((res: mdCallResponse) => {
    //         this.loadbriefHistory();
    //         this.log.debug(res);
    //         if (res.isSuccess) {
    //             this.currencyPairs = res.extras.currencyPairs;
    //             this.defaultCurrencyPair = res.extras.defaultCurrencyPair;
    //             this.defaultBuyFee = res.extras.defaultBuyFee;
    //             this.defaultSellFee = res.extras.defaultSellFee;

    //             this.setSelectedCurrencyPair(this.selectedCurrencyPair.id ? this.selectedCurrencyPair.id : this.defaultCurrencyPair);
    //         }
    //         this.loadingCurrencies = false;

    //         //market data
    //         let tcCurrencies = this.currencyPairs.map(m => {
    //             return m.tc_name;
    //         });

    //         this.markets = StaticHelper.distinctArray(tcCurrencies);
    //     }).catch(error => {
    //         this.loadingCurrencies = false;
    //         this.log.debug(error);
    //     });
    // }

    // loadbriefHistory() {
    //     this.http.get<mdCallResponse>(this.constants.EndPoints.GetTradeBriefRecentHistory).then((res:mdCallResponse) => {
    //         this.log.debug(res);
    //         if (res.isSuccess) {
    //             if (res.extras.briefHistory) {
    //                 let history = res.extras.briefHistory;
    //                 for (let i = 0; i < history.length; i++) {
    //                     let cp = this.currencyPairs.filter(m => m.id == history[i].id)[0];
    //                     history[i].current_buy = StaticHelper.roundNumber(history[i].last + (history[i].last * (cp.buy_fee / 100)), cp.tcd_scale);
    //                     history[i].current_sell = StaticHelper.roundNumber(history[i].last - (history[i].last * (cp.sell_fee / 100)), cp.tcd_scale);
    //                     history[i] = StaticHelper.copyProp(cp, history[i]);
    //                 }
    //                 this.briefHistory = history;
    //             }
    //             this.setSelectedCurrencyPair(this.selectedCurrencyPair ? this.selectedCurrencyPair.id : this.defaultCurrencyPair);
    //             this.loadingPairDetails = false;
    //             if (!this.sortedPairs) {
    //                 this.sortedPairs = this.briefHistory.sort((a, b) => {
    //                     if (a.volume > b.volume) {
    //                         return -1;
    //                     }
    //                     else {
    //                         return 1;
    //                     }
    //                 });
    //                 this.firstPair = this.sortedPairs.length > 0 ? this.sortedPairs[0] : {};
    //                 this.secondPair = this.sortedPairs.length > 1 ? this.sortedPairs[1] : {};
    //                 this.thirdPair = this.sortedPairs.length > 2 ? this.sortedPairs[2] : {};
    //                 this.fourthPair = this.sortedPairs.length > 3 ? this.sortedPairs[3] : {};
    //             }
    //             else {
    //                 if (this.firstPair.id) {
    //                     // let old = this.firstPair;
    //                     // this.firstPair = this.briefHistory.filter(m => m.id == this.firstPair.id)[0];
    //                     // this.firstPair.old = old;
    //                     this.firstPair = this.setAnimValuesFor4Pairs(0, this.firstPair,
    //                         this.briefHistory.filter(m => m.id == this.firstPair.id)[0]);
    //                 }
    //                 if (this.secondPair.id) {
    //                     // this.secondPair = this.briefHistory.filter(m => m.id == this.secondPair.id)[0];
    //                     this.secondPair = this.setAnimValuesFor4Pairs(1, this.secondPair,
    //                         this.briefHistory.filter(m => m.id == this.secondPair.id)[0]);
    //                 }
    //                 if (this.thirdPair.id) {
    //                     // this.thirdPair = this.briefHistory.filter(m => m.id == this.thirdPair.id)[0];
    //                     this.thirdPair = this.setAnimValuesFor4Pairs(2, this.thirdPair,
    //                         this.briefHistory.filter(m => m.id == this.thirdPair.id)[0]);
    //                 }
    //                 if (this.fourthPair.id) {
    //                     // this.fourthPair = this.briefHistory.filter(m => m.id == this.fourthPair.id)[0];
    //                     this.fourthPair = this.setAnimValuesFor4Pairs(3, this.fourthPair,
    //                         this.briefHistory.filter(m => m.id == this.fourthPair.id)[0]);
    //                 }
    //             }
    //         }

    //         if (this.markets.length > 0) {
    //             if(!this.selectedMarket)
    //             {
    //                 this.selectedMarket = this.markets[0];
    //             }
    //         }
    //         this.changePairHistoryTab(this.selectedMarket);
    //         setTimeout(() => {
    //             this.loadbriefHistory();
    //         }, 15 * 1000);
    //     }).catch(error => {
    //         this.loadingPairDetails = false;
    //         this.log.debug(error);
    //         setTimeout(() => {
    //             this.loadbriefHistory();
    //         }, 10 * 1000);
    //     });
    // }

    setAnimValuesForSelectedPairHistory(obj: any) {
        if (obj.old != null) {
            //setting current buy
            if (obj.old.id == obj.id) {
                if (obj.old.current_buy > obj.current_buy) {
                    this.animValues.current_buy = 'lesser';
                }
                else if (obj.old.current_buy < obj.current_buy) {
                    this.animValues.current_buy = 'greater';
                }
                else {
                    this.animValues.current_buy = 'origional';
                }

                if (this.animValues.current_buy != 'origional') {
                    setTimeout(() => {
                        this.animValues.current_buy = 'origional';
                    }, 100);
                }
                //setting current sell
                if (obj.old.current_sell > obj.current_sell) {
                    this.animValues.current_sell = 'lesser';
                }
                else if (obj.old.current_sell < obj.current_sell) {
                    this.animValues.current_sell = 'greater';
                }
                else {
                    this.animValues.current_sell = 'origional';
                }

                if (this.animValues.current_sell != 'origional') {
                    setTimeout(() => {
                        this.animValues.current_sell = 'origional';
                    }, 100);
                }
            }
        }
    }

    setAnimValuesFor4Pairs(index: number, old: any, obj: any) {
        obj.old = old;
        if (obj.old != null) {
            //setting last
            if (obj.old.last > obj.last) {
                this.animValues.cards[index].last = 'lesser';
            }
            else if (obj.old.last < obj.last) {
                this.animValues.cards[index].last = 'greater';
            }
            else {
                this.animValues.cards[index].last = 'origional';
            }

            if (this.animValues.cards[index].last != 'origional') {
                setTimeout(() => {
                    this.animValues.cards[index].last = 'origional';
                }, 100);
            }
            //setting volume
            if (obj.old.volume > obj.volume) {
                this.animValues.cards[index].volume = 'lesser';
            }
            else if (obj.old.volume < obj.volume) {
                this.animValues.cards[index].volume = 'greater';
            }
            else {
                this.animValues.cards[index].volume = 'origional';
            }

            if (this.animValues.cards[index].volume != 'origional') {
                setTimeout(() => {
                    this.animValues.cards[index].volume = 'origional';
                }, 100);
            }
        }
        return obj;
    }

    setAnimValuesForTable(oldObj: any[], obj: any[], oldTCName: string, newTCName: string) {
        if(!oldObj)
        {
            return obj;
        }
        if(oldObj.length < 1)
        {
            return obj;
        }
        if (oldTCName != newTCName) {
            return obj;
        }
        for (let i = 0; i < obj.length; i++) {
            let old = oldObj.filter(m => m.id == obj[i].id);
            if(old.length > 0)
            {
                old = old[0];
            }
            else
            {
                old = null;
            }
            obj[i].old = old;
            if (obj[i].old != null) {
                //setting last
                if (obj[i].old.last > obj[i].last) {
                    obj[i].lastAnim = 'lesser';
                }
                else if (obj[i].old.last < obj[i].last) {
                    obj[i].lastAnim = 'greater';
                }
                else {
                    obj[i].lastAnim = 'origional';
                }

                if (obj[i].lastAnim != 'origional') {
                    setTimeout(() => {
                        obj[i].lastAnim = 'origional';
                    }, 150);
                }
                
            }
            if (obj[i].old != null) {
                //setting change
                if (obj[i].old.change > obj[i].change) {
                    obj[i].changeAnim = 'lesser';
                }
                else if (obj[i].old.change < obj[i].change) {
                    obj[i].changeAnim = 'greater';
                }
                else {
                    obj[i].changeAnim = 'origional';
                }

                if (obj[i].changeAnim != 'origional') {
                    setTimeout(() => {
                        obj[i].changeAnim = 'origional';
                    }, 150);
                }
                
            }
            if (obj[i].old != null) {
                //setting high
                if (obj[i].old.high > obj[i].high) {
                    obj[i].highAnim = 'lesser';
                }
                else if (obj[i].old.high < obj[i].high) {
                    obj[i].highAnim = 'greater';
                }
                else {
                    obj[i].highAnim = 'origional';
                }

                if (obj[i].highAnim != 'origional') {
                    setTimeout(() => {
                        obj[i].highAnim = 'origional';
                    }, 150);
                }
                
            }
            if (obj[i].old != null) {
                //setting low
                if (obj[i].old.low > obj[i].low) {
                    obj[i].lowAnim = 'lesser';
                }
                else if (obj[i].old.low < obj[i].low) {
                    obj[i].lowAnim = 'greater';
                }
                else {
                    obj[i].lowAnim = 'origional';
                }

                if (obj[i].lowAnim != 'origional') {
                    setTimeout(() => {
                        obj[i].lowAnim = 'origional';
                    }, 150);
                }
                
            }
            if (obj[i].old != null) {
                //setting volume
                if (obj[i].old.volume > obj[i].volume) {
                    obj[i].volumeAnim = 'lesser';
                }
                else if (obj[i].old.volume < obj[i].volume) {
                    obj[i].volumeAnim = 'greater';
                }
                else {
                    obj[i].volumeAnim = 'origional';
                }

                if (obj[i].volumeAnim != 'origional') {
                    setTimeout(() => {
                        obj[i].volumeAnim = 'origional';
                    }, 150);
                }
                
            }
        }
        return obj;
    }

}
