import { BaseComponent } from "../base/BaseComponent";
import * as React from "react";
import { mdCallResponse } from "../../../models/call-response";
import { mdFormControl } from "../../../shared/form-control";
import { Transitions, mdTransition } from "../../../models/transitions";
import { TransitionState } from "../../../enums/transition";

export default class EmailConfirmationComponent extends BaseComponent {

    render() {
        this.initShorts();
        return (
            <section className="signupwrap clearfix">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2 col-sm-12 text-center">
                            <p className="color-white p-header mb-3">{this.state.verificationEmailHeader}</p>.
                            {
                                this.animatedCSSDiv(<img className="mb-3" style={{
                                    width: '200px',
                                    height: '200px',
                                }} src="assets/images/email.png" />, this.state.animValues.mail_img)
                            }
                            <p className="p-body color-white">{this.state.verificationEmailDetail}</p>
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
            animValues: {
                mail_img: new mdFormControl(this.getTransisition(Transitions.pulse, TransitionState.Running),
                    'mail_img', null, null, null, null, true),
            }
        }
    }

    componentWillMount() {
        this.log.debug("registerEvent " + this.constants.SocketEvents.EmailVerified);
        this.socket.registerEvent(this.constants.SocketEvents.EmailVerified, () => {
            window.location.replace(this.getLink(this.constants.RoutePaths.Login));
        });
        this.socket.emitEvent(this.constants.SocketEvents.WaitEmailVerification);
    }

    componentWillUnmount() {
        this.socket.unregisterEvent(this.constants.SocketEvents.EmailVerified);
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