import { BaseComponent } from "../BaseComponent";
import * as React from 'react';
import { CSSProperties } from "@emotion/serialize";
import css from "@emotion/css";
import SharedComponent from "../SharedComponent";

export class MainFooterHTML extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            form: props.form
        }
    }

    render() {
        this.initShorts();
        return (
            <footer>
                <div className="footer clearfix">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-3 col-xs-6">
                                <p className="h2">FEATURES</p>
                                <ul>
                                    <li><a href="#">Trading</a></li>
                                    <li><a href="#">Funding</a></li>
                                    <li><a href="#">Deposit</a></li>
                                    <li><a href="#">Withdraw</a></li>
                                    <li><a href="#">Manage Wallets</a></li>
                                </ul>
                            </div>
                            <div className="col-sm-3 col-xs-6">
                                <p className="h2">EXPLORE</p>
                                <ul>
                                    <li><a href="#">Market Statistics</a></li>
                                    <li><a href="#">Security</a></li>
                                    <li><a href="#">How it works</a></li>
                                    <li><a href="#">Our fees</a></li>
                                    <li><a href="#">About Page</a></li>
                                </ul>
                            </div>
                            <div className="col-sm-3 col-xs-6">
                                <p className="h2">SUPPORT</p>
                                <ul>
                                    <li><a href="#">Support Center </a></li>
                                    <li><a href="#">Knowledge Base</a></li>
                                </ul>
                            </div>
                            <div className="col-sm-3 social col-xs-6">
                                <p className="h2">Social</p>
                                <ul>
                                    <li><a href="#" className="fb"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                                    <li><a href="https://twitter.com/bit_velocity" className="tw"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                                </ul>
                                <p className="p"><img src="assets/images/footer-logo.png" className="img-responsive" alt="BitVelocity" /></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copyright clearfix">
                    <div className="container">&copy; bitvelocity.io 2018 Legal privacy policy and Email us at support@bitvelocity.io</div>
                </div>
            </footer>
        );
    }
}