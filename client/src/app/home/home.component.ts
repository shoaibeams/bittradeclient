import { Inject, Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { Constants } from 'src/shared/constants';
import { mdCallResponse } from 'src/models/call-response';
import { HttpClientService } from 'src/services/http-client.service';
import { LoggerService } from 'src/services/logger.service';
import { StaticHelper } from 'src/shared/static-helper';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LanguageBase } from 'src/shared/language';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: []
})
export class HomeComponent implements OnInit {

    briefHistory: any[] = [];
    currencyPairs: any[];
    defaultCurrencyPair: number;
    defaultBuyFee: number;
    defaultSellFee: number;
    selectedCurrencyPair: any = {};
    selectedBriefHistory: any = {};
    selectedTradePairHistory: any[];
    constants: Constants;
    loadingPairDetails: boolean;
    loadingCurrencies: boolean;
    isBuy: boolean;
    fcStep: number;
    tcStep: number;
    form: FormGroup;
    lang: LanguageBase;
    tcPlaceholder: number;
    fcPlaceholder: number;
    sortedPairs: any[];
    firstPair: any = {};
    secondPair: any = {};
    thirdPair: any = {};
    fourthPair: any = {};
    markets: any[];
    tradePairHistorySortings: any = { pair: 1, last: 2, change: 3, high: 4, low: 5, volume: 6 };
    tradePairhistoryCurrentSorting:any = {sort:this.tradePairHistorySortings.pair, isASC: true};

    constructor(public globals: GlobalsService,
        private http: HttpClientService,
        private log: LoggerService,
        private formBuilder: FormBuilder) {

    }

    ngOnInit() {
        this.tcPlaceholder = 25;
        this.lang = this.globals.lang;
        this.isBuy = true;
        this.loadingPairDetails = true;
        this.constants = Constants.Instance;
        this.loadbriefHistory();
        this.loadCurrencies();
        this.form = this.formBuilder.group({
            fc: [
                null
            ],
            tc: [
                null
            ],
        });
    }

    get f() { return this.form.controls; }

    getCP(id) { return this.currencyPairs.filter(m => m.id == id || m.tc_name == id)[0]; }

    getCPs(value) { return this.currencyPairs.filter(m => m.id == value || m.tc_name == value); }

    changePairHistoryTab(name: string) {
        setTimeout(() => {
            let currentSelectedPairs = this.currencyPairs.filter(m => m.tc_name == name).map(m => { return m.id });
            this.selectedTradePairHistory = this.briefHistory.filter(m => {
                if (currentSelectedPairs.indexOf(m.id) == -1) {
                    return false;
                }
                else {
                    return true;
                }
            }).sort(this.sortPairHistoryTabInner);
        }, 150);
    }

    sortPairHistoryTabInner = (a, b)=>{
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
        if(sorting == this.tradePairhistoryCurrentSorting.sort)
        {
            this.tradePairhistoryCurrentSorting.isASC = !this.tradePairhistoryCurrentSorting.isASC;
        }
        else
        {
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
                value = this.form.controls.fc.value * this.selectedBriefHistory.current_buy;
                value = StaticHelper.roundNumber(value, this.selectedCurrencyPair.tcd_scale);
                this.form.controls.tc.setValue(value);
            }
            else {
                value = this.form.controls.tc.value / this.selectedBriefHistory.current_buy;
                value = StaticHelper.roundNumber(value, this.selectedCurrencyPair.fcd_scale);
                this.form.controls.fc.setValue(value);
            }
        }
        else {
            if (inputType == 1)//fc
            {
                value = this.form.controls.fc.value * this.selectedBriefHistory.current_sell;
                value = StaticHelper.roundNumber(value, this.selectedCurrencyPair.tcd_scale);
                this.form.controls.tc.setValue(value);
            }
            else {
                value = this.form.controls.tc.value / this.selectedBriefHistory.current_sell;
                value = StaticHelper.roundNumber(value, this.selectedCurrencyPair.fcd_scale);
                this.form.controls.fc.setValue(value);
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

    loadCurrencies() {
        let res: mdCallResponse = new mdCallResponse();
        this.loadingCurrencies = true;
        this.http.get<mdCallResponse>(this.constants.EndPoints.GetCurrenciesCurrencyPairs).subscribe((data) => {
            res = data;
        }, error => {
            this.loadingCurrencies = false;
            this.log.debug(error);
        }, () => {
            this.log.debug(res);
            if (res.isSuccess) {
                this.currencyPairs = res.extras.currencyPairs;
                this.defaultCurrencyPair = res.extras.defaultCurrencyPair;
                this.defaultBuyFee = res.extras.defaultBuyFee;
                this.defaultSellFee = res.extras.defaultSellFee;

                this.setSelectedCurrencyPair(this.selectedCurrencyPair.id ? this.selectedCurrencyPair.id : this.defaultCurrencyPair);
            }
            this.loadingCurrencies = false;

            //market data
            let tcCurrencies = this.currencyPairs.map(m => {
                return m.tc_name;
            });

            this.markets = StaticHelper.distinctArray(tcCurrencies);
        });
    }

    loadbriefHistory() {
        let res: mdCallResponse = new mdCallResponse();
        this.http.get<mdCallResponse>(this.constants.EndPoints.GetTradeBriefRecentHistory).subscribe((data) => {
            res = data;
        }, error => {
            this.loadingPairDetails = false;
            this.log.debug(error);
            setTimeout(() => {
                this.loadbriefHistory();
            }, 10 * 1000);
        }, () => {
            this.log.debug(res);
            if (res.isSuccess) {
                if (res.extras.briefHistory) {
                    let history = res.extras.briefHistory;
                    for (let i = 0; i < history.length; i++) {
                        let cp = this.currencyPairs.filter(m => m.id == history[i].id)[0];
                        history[i].current_buy = StaticHelper.roundNumber(history[i].last + (history[i].last * (cp.buy_fee / 100)), cp.tcd_scale);
                        history[i].current_sell = StaticHelper.roundNumber(history[i].last - (history[i].last * (cp.sell_fee / 100)), cp.tcd_scale);
                        history[i] = StaticHelper.copyProp(cp, history[i]);
                    }
                    this.briefHistory = history;
                }
                this.setSelectedCurrencyPair(this.selectedCurrencyPair ? this.selectedCurrencyPair.id : this.defaultCurrencyPair);
                this.loadingPairDetails = false;
                if (!this.sortedPairs) {
                    this.sortedPairs = this.briefHistory.sort((a, b) => {
                        if (a.volume > b.volume) {
                            return -1;
                        }
                        else {
                            return 1;
                        }
                    });
                    this.firstPair = this.sortedPairs.length > 0 ? this.sortedPairs[0] : {};
                    this.secondPair = this.sortedPairs.length > 1 ? this.sortedPairs[1] : {};
                    this.thirdPair = this.sortedPairs.length > 2 ? this.sortedPairs[2] : {};
                    this.fourthPair = this.sortedPairs.length > 3 ? this.sortedPairs[3] : {};
                }
                else {
                    if (this.firstPair.id) {
                        this.firstPair = this.briefHistory.filter(m => m.id == this.firstPair.id)[0];
                    }
                    if (this.secondPair.id) {
                        this.secondPair = this.briefHistory.filter(m => m.id == this.secondPair.id)[0];
                    }
                    if (this.thirdPair.id) {
                        this.thirdPair = this.briefHistory.filter(m => m.id == this.thirdPair.id)[0];
                    }
                    if (this.fourthPair.id) {
                        this.fourthPair = this.briefHistory.filter(m => m.id == this.fourthPair.id)[0];
                    }
                }
            }

            if (!this.selectedTradePairHistory) {
                if (this.markets.length > 0) {
                    this.changePairHistoryTab(this.markets[0]);
                }
            }
            setTimeout(() => {
                this.loadbriefHistory();
            }, 15 * 1000);
        });
    }

    setSelectedCurrencyPair(id: number) {
        if (!id) {
            return;
        }
        let cps = this.currencyPairs.filter(m => m.id == id);
        if (cps.length > 0) {
            this.selectedCurrencyPair = cps[0];
            this.tcStep = 1 / Math.pow(10, StaticHelper.minScale(this.selectedCurrencyPair.tcd_scale));
            this.fcStep = 1 / Math.pow(10, StaticHelper.minScale(this.selectedCurrencyPair.fcd_scale));
            if (this.briefHistory) {
                let sbh = this.briefHistory.filter(m => m.id == id);
                if (sbh.length > 0) {
                    this.selectedBriefHistory = sbh[0];
                }
                this.calculatorInput(1);
            }
        }
    }

}
