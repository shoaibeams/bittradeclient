import { BaseComponent } from "../base/BaseComponent";
import * as React from "react";
import { mdCallResponse } from "../../../models/call-response";
import { mdFormControl } from "../../../shared/form-control";
import { Transitions } from "../../../models/transitions";
import { TransitionState } from "../../../enums/transition";

export default class AccountVerificationComponent extends BaseComponent {

    render() {
        this.initShorts();
        return (
            <div className="mainpage clearfix">
                <section className="signupwrap clearfix">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-md-offset-3 col-sm-12 text-center">
                                <p className="color-white p-header mb-3">Account Verification</p>
                                {
                                    this.animatedCSSDiv(<img className="mb-3" style={{
                                        width: '200px',
                                        height: '200px',
                                    }} src={this.state.image} />, 
                                    this.state.animValues.tick_img)
                                }
                                <p className="p-body color-white">{this.state.verificationResponse}</p>
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
            verificationResponse: this.lang.Verifying,
            image: "assets/images/email.png",
            animValues: {
                tick_img: new mdFormControl(this.getTransisition(Transitions.pulse, TransitionState.Running),
                    'tick_img', null, null, null, null, true),
            }
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
                    this.updateState({
                        image: "assets/images/cancel-512x512.png"
                    })
                }
                else {
                    this.updateState({
                        image: "assets/images/check-mark-512x512.png"
                    })
                    setTimeout(() => {
                        window.location.replace(this.getLink(this.constants.RoutePaths.Login));
                    }, 3 * 1000);
                }
                this.hideMainSpinner();
            }
        }).catch(error => {
            this.log.debug(error);
            this.hideMainSpinner();
        });
    }

}