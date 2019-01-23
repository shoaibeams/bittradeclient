import { BaseComponent } from "../base/BaseComponent";
import * as React from "react";
import { Link } from "react-router-dom";
import { StaticHelper } from "../../../shared/static-helper";
import { mdFormControl } from "../../../shared/form-control";

export default class ServicesComponent extends BaseComponent {

    render() {
        this.initShorts();
        let buyFee: string = "";
        let sellFee: string = "";
        if(this.g.selectedCurrencyPair)
        {
            if(this.g.selectedCurrencyPair.buy_fee)
            {
                buyFee = this.g.selectedCurrencyPair.buy_fee.toFixed(2);
            }
            if(this.g.selectedCurrencyPair.sell_fee)
            {
                sellFee = this.g.selectedCurrencyPair.sell_fee.toFixed(2);
            }
        }
        return (
            <section className="servicewrap clearfix">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-sm-6 text-center">
                            <img src="assets/images/support-icon.png" alt="Experts Support" />
                            <h2>Experts Support</h2>
                            <p>We target to ensure that your query
                                is answered in best possible way
                                with guidance on Account verification,
                        KYC, Fiat deposits, Security and Trading. </p>
                        </div>
                        <div className="col-md-4 col-sm-6 text-center">

                            <img src="assets/images/safe-icon.png" alt="Safe &amp; Secure" />

                            <h2>Safe &amp; Secure</h2>
                            <p>We follow best industry practices
                                back-end with customized security
                        to protect your coins </p>
                        </div>
                        <div className="col-md-4 col-sm-6 text-center">

                            <img src="assets/images/instant-icon.png" alt="Safe &amp; Secure" />

                            <h2>FEES</h2>
                            <p>Standard Buy {buyFee}%
                        <br /> Standard Sell {sellFee}% <br /></p>
                        </div>
                        <div className="col-md-4 col-sm-6 text-center">

                            <img src="assets/images/wallet-icon.png" alt="Safe &amp; Secure" />

                            <h2>Advanced Ordering</h2>
                            <p>Order limit and stop loss to
                                automate your strategy and minimize
                        the trading risk </p>
                        </div>
                        <div className="col-md-4 col-sm-6 text-center">

                            <img src="assets/images/buye-icon.png" alt="Safe &amp; Secure" />

                            <h2>Reliability</h2>
                            <p>Reliable service with 24x7 <br />
                                support via email</p>
                        </div>
                        <div className="col-md-4 col-sm-6 text-center">

                            <img src="assets/images/trading-icon.png" alt="Safe &amp; Secure" />

                            <h2>Offline Storage</h2>
                            <p>Majority of the digital assets are storted
                        offline to prevent hackers attacks </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    constructor(props) {
        super(props);
    }

}