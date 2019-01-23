import { BaseComponent } from "../../app/components/base/BaseComponent";
import * as React from "react";
import OrderHistoryComponent from "./OrderHistoryComponent";
import OrderComponent from "./OrderComponent";

export default class TradeComponent extends BaseComponent {

    render() {
        this.initShorts();
        return (<div className="mainpage clearfix">
            <section className="tradingwrap  dashboad clearfix">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-7 col-md-offset-5"> </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <OrderComponent {...this.props} ref={this.orderRef} params={{
                                onNewOrder: this.newOrderCreated
                            }} />
                            <OrderHistoryComponent {...this.props} ref={this.orderHistoryRef} />
                            <div className="cryptosocialnetworking clearfix">
                                <h3>Crypto Social Networking</h3>
                                <div className="socialnetworkbox clearfix"> </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="price-show-box clearfix">
                                <span className="last_price">
                                    <strong>Last Price</strong><br /><i>0.00004122</i>
                                </span>
                                <span className="last_price">
                                    <strong>24 CHANGE</strong><br /><i>0.00004122</i>
                                </span>
                                <span className="last_price">
                                    <strong>24 HIGH</strong><br /><i>0.00004122</i>
                                </span>
                                <span className="last_price"><strong>24 H LOW</strong><br /><i>0.00004122</i></span>
                                <span className="last_price"><strong>24 H VOLUME</strong><br /><i>0.00004122</i></span>
                                <span className="last_price brdroup">
                                    {
                                        this.getCurrencyPairDropDown(this, this.g, this.setSelectedCurrencyPair)
                                    }
                                </span> </div>
                            <ul className="nav nav-tabs timebox">
                                <li className="active"><a data-toggle="tab" href="#star">Time</a></li>
                                <li><a data-toggle="tab" href="#Monthly">Monthly</a></li>
                                <li><a data-toggle="tab" href="#Hourly">Hourly</a></li>
                                <li><a data-toggle="tab" href="#Daily">Daily</a></li>
                                <li><a data-toggle="tab" href="#Weekly">Weekly</a></li>
                                <li><a data-toggle="tab" href="#Yearly">Yearly</a></li>
                                <li><a data-toggle="tab" href="#tools">Tools</a></li>
                                <li><a data-toggle="tab" href="#ind">Indicator</a></li>
                                <li><a data-toggle="tab" href="#masd"> MACD</a></li>
                            </ul>
                            <div className="tab-content">
                                <div id="star" className="tab-pane fade in active">
                                    <img src="assets/images/imgtab.png" alt="" />
                                </div>
                                <div id="Monthly" className="tab-pane fade">
                                    <img src="assets/images/imgtab.png" alt="" />
                                </div>
                                <div id="Hourly" className="tab-pane fade">
                                    <img src="assets/images/imgtab.png" alt="" />
                                </div>
                                <div id="Daily" className="tab-pane fade">
                                    <img src="assets/images/imgtab.png" alt="" />
                                </div>
                                <div id="Weekly" className="tab-pane fade">
                                    <img src="assets/images/imgtab.png" alt="" />
                                </div>
                                <div id="Yearly" className="tab-pane fade">
                                    <img src="assets/images/imgtab.png" alt="" />
                                </div>
                                <div id="Tools" className="tab-pane fade">
                                    <img src="assets/images/imgtab.png" alt="" />
                                </div>
                                <div id="ind" className="tab-pane fade"><img src="assets/images/imgtab.png" alt="" />
                                </div>
                                <div id="masd" className="tab-pane fade"><img src="assets/images/imgtab.png" alt="" />
                                </div>
                            </div>
                            <div className="row bglight">
                                <div className="col-md-6">
                                    <div className="groups_table">
                                        <div className="bartag ">
                                            <div className="tophas">
                                                <label>groups</label>
                                                <select name="">
                                                    <option>8 decimals</option>
                                                </select>
                                            </div>
                                        </div>
                                        <table className="table-responsive no-border full-width">
                                            <tbody>
                                                <tr>
                                                    <th align="center" className="white-txt valign-middle"> Price (BTC) </th>
                                                    <th align="center" className="white-txt ">Amount (APPC)</th>
                                                    <th align="center" className="white-txt valign-middle">Total (BTC)</th>
                                                </tr>
                                                <tr>
                                                    <td align="center" className="valign-middle">0.000004204</td>
                                                    <td align="center" className="valign-middle"> 59</td>
                                                    <td align="center" className="valign-middle">0.00248036</td>
                                                </tr>
                                                <tr>
                                                    <td align="center" className="valign-middle">0.000004204</td>
                                                    <td align="center" className="valign-middle"> 59</td>
                                                    <td align="center" className="valign-middle">0.00248036</td>
                                                </tr>
                                                <tr>
                                                    <td align="center" className="valign-middle">0.000004204</td>
                                                    <td align="center" className="valign-middle"> 59</td>
                                                    <td align="center" className="valign-middle">0.00248036</td>
                                                </tr>
                                                <tr>
                                                    <td align="center" className="valign-middle">0.000004204</td>
                                                    <td align="center" className="valign-middle"> 59</td>
                                                    <td align="center" className="valign-middle">0.00248036</td>
                                                </tr>
                                                <tr>
                                                    <td align="center" className="valign-middle">0.000004204</td>
                                                    <td align="center" className="valign-middle"> 59</td>
                                                    <td align="center" className="valign-middle">0.00248036</td>
                                                </tr>
                                                <tr>
                                                    <td align="center" className="valign-middle">0.000004204</td>
                                                    <td align="center" className="valign-middle"> 59</td>
                                                    <td align="center" className="valign-middle">0.00248036</td>
                                                </tr>
                                                <tr>
                                                    <td align="center" className="valign-middle">0.000004204</td>
                                                    <td align="center" className="valign-middle"> 59</td>
                                                    <td align="center" className="valign-middle">0.00248036</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="bartag"><span>0.00004122</span><span>$0.32 </span><span><img src="assets/images/bar.png"
                                            width="18" height="24" alt="" /></span></div>
                                        <table className="table-responsive no-border full-width">
                                            <tbody>
                                                <tr>
                                                    <td align="center" className="valign-middle">0.000004204</td>
                                                    <td align="center" className="valign-middle"> 59</td>
                                                    <td align="center" className="valign-middle">0.00248036</td>
                                                </tr>
                                                <tr>
                                                    <td align="center" className="valign-middle">0.000004204</td>
                                                    <td align="center" className="valign-middle"> 59</td>
                                                    <td align="center" className="valign-middle">0.00248036</td>
                                                </tr>
                                                <tr>
                                                    <td align="center" className="valign-middle">0.000004204</td>
                                                    <td align="center" className="valign-middle"> 59</td>
                                                    <td align="center" className="valign-middle">0.00248036</td>
                                                </tr>
                                                <tr>
                                                    <td align="center" className="valign-middle">0.000004204</td>
                                                    <td align="center" className="valign-middle"> 59</td>
                                                    <td align="center" className="valign-middle">0.00248036</td>
                                                </tr>
                                                <tr>
                                                    <td align="center" className="valign-middle">0.000004204</td>
                                                    <td align="center" className="valign-middle"> 59</td>
                                                    <td align="center" className="valign-middle">0.00248036</td>
                                                </tr>
                                                <tr>
                                                    <td align="center" className="valign-middle">0.000004204</td>
                                                    <td align="center" className="valign-middle"> 59</td>
                                                    <td align="center" className="valign-middle">0.00248036</td>
                                                </tr>
                                                <tr>
                                                    <td align="center" className="valign-middle">0.000004204</td>
                                                    <td align="center" className="valign-middle"> 59</td>
                                                    <td align="center" className="valign-middle">0.00248036</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="groups_table">
                                        <div className="bartag ">
                                            <div className="tophas">
                                                <label>groups</label>
                                                <select name="">
                                                    <option>8 decimals</option>
                                                </select>
                                            </div>
                                        </div>
                                        <table className="table-responsive no-border full-width">
                                            <tbody>
                                                <tr>
                                                    <th align="center" className="valign-middle"> Price (BTC) </th>
                                                    <th align="center" className="valign-middle">Amount (APPC)</th>
                                                    <th align="center" className="valign-middle">Total (BTC)</th>
                                                </tr>
                                                <tr>
                                                    <td align="center" className="valign-middle">0.000004204</td>
                                                    <td align="center" className="valign-middle"> 59</td>
                                                    <td align="center" className="valign-middle">0.00248036</td>
                                                </tr>
                                                <tr>
                                                    <td align="center" className="valign-middle">0.000004204</td>
                                                    <td align="center" className="valign-middle"> 59</td>
                                                    <td align="center" className="valign-middle">0.00248036</td>
                                                </tr>
                                                <tr>
                                                    <td align="center" className="valign-middle">0.000004204</td>
                                                    <td align="center" className="valign-middle"> 59</td>
                                                    <td align="center" className="valign-middle">0.00248036</td>
                                                </tr>
                                                <tr>
                                                    <td align="center" className="valign-middle">0.000004204</td>
                                                    <td align="center" className="valign-middle"> 59</td>
                                                    <td align="center" className="valign-middle">0.00248036</td>
                                                </tr>
                                                <tr>
                                                    <td align="center" className="valign-middle">0.000004204</td>
                                                    <td align="center" className="valign-middle"> 59</td>
                                                    <td align="center" className="valign-middle">0.00248036</td>
                                                </tr>
                                                <tr>
                                                    <td align="center" className="valign-middle">0.000004204</td>
                                                    <td align="center" className="valign-middle"> 59</td>
                                                    <td align="center" className="valign-middle">0.00248036</td>
                                                </tr>
                                                <tr>
                                                    <td align="center" className="valign-middle">0.000004204</td>
                                                    <td align="center" className="valign-middle"> 59</td>
                                                    <td align="center" className="valign-middle">0.00248036</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="bartag brpa"><b>0.00004122 $0.32</b> </div>
                                        <table className="table-responsive no-border full-width">
                                            <tbody>
                                                <tr>
                                                    <td align="center" className="valign-middle">0.000004204</td>
                                                    <td align="center" className="valign-middle"> 59</td>
                                                    <td align="center" className="valign-middle">0.00248036</td>
                                                </tr>
                                                <tr>
                                                    <td align="center" className="valign-middle">0.000004204</td>
                                                    <td align="center" className="valign-middle"> 59</td>
                                                    <td align="center" className="valign-middle">0.00248036</td>
                                                </tr>
                                                <tr>
                                                    <td align="center" className="valign-middle">0.000004204</td>
                                                    <td align="center" className="valign-middle"> 59</td>
                                                    <td align="center" className="valign-middle">0.00248036</td>
                                                </tr>
                                                <tr>
                                                    <td align="center" className="valign-middle">0.000004204</td>
                                                    <td align="center" className="valign-middle"> 59</td>
                                                    <td align="center" className="valign-middle">0.00248036</td>
                                                </tr>
                                                <tr>
                                                    <td align="center" className="valign-middle">0.000004204</td>
                                                    <td align="center" className="valign-middle"> 59</td>
                                                    <td align="center" className="valign-middle">0.00248036</td>
                                                </tr>
                                                <tr>
                                                    <td align="center" className="valign-middle">0.000004204</td>
                                                    <td align="center" className="valign-middle"> 59</td>
                                                    <td align="center" className="valign-middle">0.00248036</td>
                                                </tr>
                                                <tr>
                                                    <td align="center" className="valign-middle">0.000004204</td>
                                                    <td align="center" className="valign-middle"> 59</td>
                                                    <td align="center" className="valign-middle">0.00248036</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>);
    }

    orderHistoryRef = React.createRef<OrderHistoryComponent>();
    orderRef = React.createRef<OrderComponent>();
    constructor(props) {
        super(props);
        this.init();
    }

    init() {
    }

    newOrderCreated = () =>
    {
        this.orderHistoryRef.current.recievedNewChanges(this.g.selectedCurrencyPair, true);
    }

    setSelectedCurrencyPair = (id: number, e) => {
        if (!id) {
            return;
        }
        let cps = this.g.currencyPairs.filter(m => m.id == id);
        if (cps.length > 0) {
            this.props.updateGlobalProperty(global.propKeys.selectedCurrencyPair, cps[0]);
            this.orderHistoryRef.current.recievedNewChanges(cps[0]);
            this.orderRef.current.recievedNewChanges(cps[0]);
        }
    }

}