import { Inject, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClientService } from 'src/app/services/http-client.service';
import { mdCallResponse } from 'src/app/models/call-response';
import { LoggerService } from 'src/app/services/logger.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { StaticHelper } from 'src/app/shared/static-helper';
import { Router } from '@angular/router';
import { Constants } from 'src/app/shared/constants';

@Component({
    selector: 'app-trade',
    templateUrl: './trade.component.html',
    styleUrls: []
})
export class TradeComponent implements OnInit {
    
    currencyPairs: any[];
    defaultCurrencyPair: number;
    selectedCurrencyPair: any = {};
    constants:Constants;
    constructor(private http: HttpClientService, 
        private log: LoggerService, 
        public globals: GlobalsService,
        private router: Router) {

    }

    ngOnInit() {
        this.constants = this.globals.constants;
        if(!this.globals.isLoggedIn)
        {
            StaticHelper.navigateToLogin(this.router);
        }
        this.loadCurrencyPairs();
    }

    setSelectedCurrencyPair(id: number)
    {
        let cps = this.currencyPairs.filter(m => m.id == id);
        if(cps.length > 0)
        {
            this.selectedCurrencyPair = cps[0];
        }
    }

    loadCurrencyPairs() {
        let res: mdCallResponse = new mdCallResponse();
        this.http.post<mdCallResponse>(this.constants.EndPoints.PostTradeCurrencyPairs, {}).subscribe((data) => {
            res = data;
        }, error => {
            this.log.debug(error);
        }, () => {
            this.log.debug(res);
            if (res.isSuccess) {
                this.currencyPairs = res.extras.currencyPairs;
                this.defaultCurrencyPair = res.extras.defaultCurrencyPair;
                this.setSelectedCurrencyPair(this.defaultCurrencyPair);
            }
            else {

            }
        });
    }

}
