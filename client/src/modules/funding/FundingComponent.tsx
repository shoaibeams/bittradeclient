import * as React from "react";
import { Link } from "react-router-dom";
import { BaseComponent } from "../../app/components/base/BaseComponent";
import { mdCallResponse } from "../../models/call-response";
import DepositComponent from "./DepositComponent";

export default class FundingComponent extends BaseComponent {

    render() {
        this.initShorts();
        return (
            <div className="mainpage clearfix">
    <section className="tradingwrap  dashboad clearfix">
        <div className=" col-md-12">
            <ul className="nav nav-tabs">
                <li className="active"><a data-toggle="tab" href="#deposit">{this.lang.Deposit}</a></li>
                <li><a data-toggle="tab" href="#withdrawl">{this.lang.Withdrawl}</a></li>
            </ul>
            <div className="tab-content">
                <div id="deposit" className="tab-pane fade in active">
                    <DepositComponent {...this.props}/>
                </div>
                <div id="withdrawl" className="tab-pane fade in">
                </div>
            </div>
        </div>
    </section>
</div>
        );
    }

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
    }

}