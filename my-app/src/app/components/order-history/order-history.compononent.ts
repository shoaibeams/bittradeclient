import { Component, OnInit, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { LoggerService } from 'src/app/services/logger.service';
import { LanguageBase } from 'src/app/shared/language';
import { GlobalsService } from 'src/app/services/globals.service';
import { Constants } from 'src/app/shared/constants';
import { mdCallResponse } from 'src/app/models/call-response';
import { HttpClientService } from 'src/app/services/http-client.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { StaticHelper } from 'src/app/shared/static-helper';
import { mdOrderHistory } from 'src/app/models/order-history';
import { mdOrder } from 'src/app/models/order';

@Component({
    selector: 'order-history-order',
    templateUrl: './order-history.component.html',
    styleUrls: []
})

export class OrderHistoryComponent implements OnInit {

    @Input() currencyPair: any;
    lang: LanguageBase;
    const: Constants;
    orders: mdOrderHistory[];
    pendingOrders: mdOrderHistory[];
    sHelper: StaticHelper;
    constructor(private log: LoggerService, private globals: GlobalsService,
        private http: HttpClientService, private spinner: SpinnerService) {

    }

    ngOnInit() {
        this.const = Constants;
        this.lang = this.globals.lang;
        this.sHelper = StaticHelper;
    }

    ngOnChanges(changes: SimpleChanges) {
        this.currencyPair = changes.currencyPair.currentValue;
        this.spinner.show();
        this.getOrderHistory();
    }

    getOrderHistory() {

        if (this.currencyPair.id) {
            let res: mdCallResponse = new mdCallResponse();
            let model = {
                currencyPair: this.currencyPair.id,
                recordsPerPage: -1,
                page: -1,
            }
            this.http.post<mdCallResponse>(Constants.EndPoints.PostOrderHistory, model).subscribe((data) => {
                res = data;
            }, (error) => {
                this.log.debug(error);
                this.spinner.hide();
            }, () => {
                this.log.debug(res);
                if (res.isSuccess) {
                    this.orders = res.extras as mdOrderHistory[];
                    this.pendingOrders = this.orders.filter(m => m.record_status == Constants.Order.RecordStatus.open || 
                    m.record_status == Constants.Order.RecordStatus.partiallyCompleted);

                }
                this.spinner.hide();
            });
        }
    }
}
