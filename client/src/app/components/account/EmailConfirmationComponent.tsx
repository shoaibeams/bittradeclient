import { BaseComponent } from "../base/BaseComponent";
import * as React from "react";
import { mdCallResponse } from "../../../models/call-response";

export default class EmailConfirmationComponent extends BaseComponent {

    render() {
        this.initShorts();
        return (
            <section className="signupwrap clearfix">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2 col-sm-12 text-center">
                            <p className="color-white">{this.state.verificationEmailHeader}</p>
                            <img width="270" height="270" style={{ marginTop: '32px', marginBottom: '32pxx' }} src="assets/images/email.png" />
                            <p className="pstylish color-white">{this.state.verificationEmailDetail}</p>
                            <button
                                disabled={this.state.disableResendEmailButton}
                                className="btn btn-success"
                                onClick={this.sendSignupVerificatinEmail}
                            >
                                {this.lang.ResendEmail}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            verificationEmailHeader: this.addNewLineHTML(this.lang.VerificationEmailSent.split(/\n/g)),
            //  this.lang.VerificationEmailSent.replace(/\n/g, `<br/>`),
            verificationEmailDetail: this.addNewLineHTML(this.lang.VerificationEmailSentDetail.split(/\n/g)),
            // verificationEmailDetail: this.lang.VerificationEmailSentDetail.replace(/\n/g, `<br/>`),
            disableResendEmailButton: false,
        }
    }

    sendSignupVerificatinEmail = (ev) => {
        this.showMainSpinner();
        let res: mdCallResponse = new mdCallResponse();
        this.http.get<mdCallResponse>(this.constants.EndPoints.GetSendSignUpVerificationEmail).then((res: mdCallResponse) => {
            if (res) {
                if (!res.isSuccess) {
                    this.displayMessage(res.message);
                }
                else {
                    let newState = {
                        ...this.state
                    }
                    if (ev) {
                        newState = {
                            ...newState,
                            disableResendEmailButton: true,
                        }
                    }
                    newState = {
                        ...newState,
                        verificationEmailHeader: this.lang.VerificationEmailSentAgain,
                    }
                    this.setState(newState);
                }
            }
            this.hideMainSpinner();
        }).catch(error => {
            this.log.debug(error);
            this.hideMainSpinner();
        });
    }

}