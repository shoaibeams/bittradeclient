import { BaseComponent } from "../../app/components/base/BaseComponent";
import * as React from "react";
import { mdCallResponse } from "../../models/call-response";
import { mdOrderHistory } from "../../models/order-history";
import { StaticHelper } from "../../shared/static-helper";
import * as EnumsOrder from "../../enums/order";
import NBSpinnerComponent from "../shared/spinner/NBSpinnerComponent";

export default class OrderHistoryComponent extends BaseComponent {

    render() {
        this.initShorts();
        if (!this.currencyPair) {
            this.recievedNewChanges(this.g.selectedCurrencyPair);
        }
        let pendingOrders: mdOrderHistory[] = [];
        let previousHistory: mdOrderHistory[] = [];
        if (this.state.orders) {
            pendingOrders = this.state.orders.filter(m => m.record_status == EnumsOrder.RecordStatus.partially_completed ||
                m.record_status == EnumsOrder.RecordStatus.getString(EnumsOrder.RecordStatus.partially_completed) ||
                m.record_status == EnumsOrder.RecordStatus.open ||
                m.record_status == EnumsOrder.RecordStatus.getString(EnumsOrder.RecordStatus.open));
            previousHistory = this.state.orders.filter(m => m.record_status == EnumsOrder.RecordStatus.cancelled ||
                m.record_status == EnumsOrder.RecordStatus.getString(EnumsOrder.RecordStatus.cancelled) ||
                m.record_status == EnumsOrder.RecordStatus.completed ||
                m.record_status == EnumsOrder.RecordStatus.getString(EnumsOrder.RecordStatus.completed));
        }
        return (
            <div className="row">
                <div className="col-md-12">
                    <ul className="nav nav-tabs openorder">
                        <li className="active"><a data-toggle="tab" href="#pending">Pending Orders</a></li>
                        <li><a data-toggle="tab" href="#all">Previous History</a></li>
                    </ul>
                    <div className="tab-content">
                        <div id="pending" className="tab-pane fade in active">
                            <table className="table-responsive orderhis cell-center full-width no-border">
                                <thead>
                                    <tr>
                                        <th className="white-txt">{this.lang.Order + "#"}</th>
                                        <th className="white-txt">{this.lang.Date}</th>
                                        <th className="white-txt">{this.lang.Action}</th>
                                        <th className="white-txt">{this.lang.Price}</th>
                                        <th className="white-txt">{this.lang.Amount}</th>
                                        <th className="white-txt">{this.lang.Total}</th>
                                        <th className="white-txt">{this.lang.Fee}</th>
                                        <th className="white-txt">{this.lang.Status}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        pendingOrders.map((o, i) => {
                                            return (
                                                <tr key={i} className={((i + 1) % 2) == 0 ? '' : 'alternet'}>
                                                    <td className="white-txt">{o.id}</td>
                                                    <td className="white-txt">
                                                        {StaticHelper.longDateFormat(o.created_timestamp)}</td>
                                                    <td className="white-txt">{this.formatEnumValue(o.action, true, false)}</td>
                                                    <td className="white-txt">{o.price}</td>
                                                    <td className="white-txt">{o.amount}</td>
                                                    <td className="white-txt">{o.total_amount}</td>
                                                    <td className="white-txt">{o.fee_percentage}%</td>
                                                    <td className="white-txt">{this.formatEnumValue(o.record_status, true, false)}</td>
                                                </tr>
                                            );
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                        <div id="all" className="tab-pane fade">
                            <table className="table-responsive orderhis cell-center full-width no-border">
                                <thead>
                                    <tr>
                                        <th className="white-txt">{this.lang.Order + "#"}</th>
                                        <th className="white-txt">{this.lang.Date}</th>
                                        <th className="white-txt">{this.lang.Action}</th>
                                        <th className="white-txt">{this.lang.Price}</th>
                                        <th className="white-txt">{this.lang.Amount}</th>
                                        <th className="white-txt">{this.lang.Total}</th>
                                        <th className="white-txt">{this.lang.Fee}</th>
                                        <th className="white-txt">{this.lang.Status}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        previousHistory.map((o, i) => {
                                            return (
                                                <tr key={i} className={((i + 1) % 2) == 0 ? '' : 'alternet'}>
                                                    <td className="white-txt">{o.id}</td>
                                                    <td className="white-txt">
                                                        {StaticHelper.longDateFormat(o.created_timestamp)}</td>
                                                    <td className="white-txt">{this.formatEnumValue(o.action, true, false)}</td>
                                                    <td className="white-txt">{o.price}</td>
                                                    <td className="white-txt">{o.amount}</td>
                                                    <td className="white-txt">{o.total_amount}</td>
                                                    <td className="white-txt">{o.fee_percentage}%</td>
                                                    <td className="white-txt">{this.formatEnumValue(o.record_status, true, false)}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <NBSpinnerComponent {...this.props} params={{ show: this.state.showSpinner }} />
                </div>
            </div>);
    }

    currencyPair: any;

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            orders: [],
            showSpinner: true
        }
        this.currencyPair = this.g.selectedCurrencyPair;
        this.getOrderHistory();
    }

    recievedNewChanges(newCP, isnew:boolean = false) {
        if (!newCP) {
            return;
        }
        let oldCP = this.currencyPair;
        if (oldCP) {
            if (oldCP.id == newCP.id && !isnew) {
                return;
            }
        }
        this.currencyPair = newCP;
        this.updateState({
            showSpinner: true,
        })
        this.getOrderHistory();
    }

    getOrderHistory() {
        if (!this.currencyPair) {
            if(this.state.showSpinner)
            {
                this.state = {
                    ...this.state,
                    showSpinner: false,
                }
            }
            return;
        }
        if (this.currencyPair.id) {
            let model = {
                currencyPair: this.currencyPair.id,
                recordsPerPage: -1,
                page: -1,
            }
            this.http.post<mdCallResponse>(this.constants.EndPoints.PostOrderHistory, model).then((res: mdCallResponse) => {
                this.log.debug(res);
                if (res.isSuccess) {
                    this.updateState({
                        orders: res.extras as mdOrderHistory[],
                    });
                }
                this.updateState({
                    showSpinner: false,
                })
            }).catch((error) => {
                this.log.debug(error);
                this.updateState({
                    showSpinner: false,
                })
            });
        }
    }

}