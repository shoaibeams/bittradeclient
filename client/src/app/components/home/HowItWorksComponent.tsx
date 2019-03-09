import { BaseComponent } from "../base/BaseComponent";
import * as React from "react";

export default class HowItWorksComponent extends BaseComponent {

    render() {
        this.initShorts();
        return (
            <section className="howitwork clearfix">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-sm-3">
                            <div className="howbox clearfix">
                                <div className="arrow-how">
                                    <img src="assets/images/arrow-how.png" className="img-responsive" alt="How" /></div>

                                <img src="assets/images/reg-icon.png" alt="Register" />

                                <h3>
                                    <div>1</div>
                                    Register
                        </h3>
                                <p>Registration is easy and will help you keep track of your assets</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <div className="howbox clearfix">
                                <div className="arrow-how">
                                    <img src="assets/images/arrow-how.png" className="img-responsive" alt="How" /></div>

                                <img src="assets/images/kyc-icon.png" alt="Get KYC verified" />

                                <h3>
                                    <div>2</div>
                                    Get KYC verified
                        </h3>
                                <p>As per regulatoring requiments, we will only allow customers that
                            have passed our KYC criteria.</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <div className="howbox clearfix">
                                <div className="arrow-how">
                                    <img src="assets/images/arrow-how.png" className="img-responsive" alt="How" /></div>

                                <img src="assets/images/deposit-icon.png" alt="Register" />

                                <h3>
                                    <div>3</div>
                                    Make fiat deposit or Register debit/credit card
                        </h3>
                                <p>Buy instantly with debit/credit card or deposit Euro/USD to
                            convert to crypto.</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <div className="howbox clearfix">

                                <img src="assets/images/start-buy-icon.png" alt="Register" />

                                <h3>
                                    <div>4</div>
                                    Start buying
                        </h3>
                                <p>Start trading. Or be a long-term hodler.</p>
                            </div>
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