import { BaseComponent } from "../base/BaseComponent";
import * as React from "react";
import { Link } from "react-router-dom";
import { StaticHelper } from "../../../shared/static-helper";
import { mdFormControl } from "../../../shared/form-control";
import { mdCallResponse } from "../../../models/call-response";

export default class AccountVerificationComponent extends BaseComponent {

    render() {
        this.initShorts();
        return (
            <div className="mainpage clearfix">
                <section className="signupwrap clearfix">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-md-offset-3 col-sm-12">
                                <p className="h3">Account Verification</p>
                                <p className="p pstylish">{this.state.verificationResponse}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
        );
    }

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            verificationResponse: this.lang.Verifying
        }
        let key: string = this.parsedLocation[this.constants.QueryParams.key];
        if (key) {
            this.verifyAccount(key);
        }
    }

    verifyAccount(key: string) {
        this.showMainSpinner();
        this.http.post<mdCallResponse>(this.constants.EndPoints.PostAccountVerify, { key: key }).then((res: mdCallResponse) => {
            if (res) {
                this.setState({
                    verificationResponse: res.message
                })
                if (!res.isSuccess) {
                    this.displayMessage(res.message);
                }
                else {
                    setTimeout(() => {
                        window.location.replace(this.constants.RoutePaths.Login);
                    }, 2 * 1000);
                }
                this.hideMainSpinner();
            }
        }).catch(error => {
            this.log.debug(error);
            this.hideMainSpinner();
        });
    }

}