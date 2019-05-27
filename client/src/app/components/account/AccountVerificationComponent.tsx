import { BaseComponent } from "../base/BaseComponent";
import React from "react";
import { mdCallResponse } from "../../../models/call-response";
import { Transitions } from "../../../models/transitions";
import { TransitionState } from "../../../enums/transition";
import { mdAnimControl } from "../../../models/anim-control";
import { Progress } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class AccountVerificationComponent extends BaseComponent {
  render() {
    this.initShorts();
    let progressStatus = {};
    if (this.state.verified == 1 && this.state.progress == 100) {
      progressStatus["status"] = "success";
    } else if (this.state.verified == 2 && this.state.progress == 100) {
      progressStatus["status"] = "exception";
    }
    return (
      <>
        <div className="gx-text-center">
          <img
            className="gx-mt-5 gx-mb-2"
            src="/assets/images/footer-logo.png"
            width={180}
            height={88}
          />
        </div>
        <div
          className="gx-login-container"
          style={{ overflow: "auto", paddingBottom: "120px", height: "unset" }}
        >
          <div className="gx-login-content" style={{ maxWidth: "500px" }}>
            <div className="gx-login-header gx-text-center">
              <h1 className="gx-login-title">
                {this.lang.AccountVerification}
              </h1>
            </div>
            <div className="gx-mb-3 gx-text-center">
              {this.animatedCSSDiv(
                this.state.verified == 0 ? (
                  <FontAwesomeIcon icon={["fas", "envelope-open-text"]} style={{ fontSize: "100px" }}/>
                ) : (
                  <Progress
                    {...progressStatus}
                    type="circle"
                    percent={this.state.progress}
                    width={150}
                  />
                ),
                this.state.animValues.mail_img
              )}
            </div>
            <div style={{ alignContent: "center" }}>
              <h2 className="gx-text-primary">
                {this.state.verificationResponse +
                  (this.state.verified != 2 ? this.state.threeDots : "")}
              </h2>
            </div>
          </div>
        </div>
      </>
    );
  }

  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    this.state = {
      verified: 0,
      progress: 0,
      verificationResponse: this.lang.Verifying + " " + this.lang.PleaseWait,
      image: "/assets/images/email.png",
      animValues: {
        tick_img: new mdAnimControl(
          this.getTransition(Transitions.pulse, TransitionState.Running),
          "tick_img",
          true
        ),
        mail_img: new mdAnimControl(
          this.getTransition(Transitions.pulse, TransitionState.Running),
          "mail_img",
          true
        )
      }
    };
    let key: string = this.parsedLocation[this.constants.QueryParams.key];
    if (key) {
      this.verifyAccount(key);
    }
    this.threeDots();
    // setTimeout(() => {
    //   this.startVerificationProgress(1, "");
    // }, 500);
  }

  verifyAccount(key: string) {
    this.http
      .post<mdCallResponse>(this.constants.EndPoints.PostAccountVerify, {
        key: key
      })
      .then((res: mdCallResponse) => {
        if (res) {
          this.startVerificationProgress(res.isSuccess ? 1 : 2, res.message);
        }
      })
      .catch(error => {
        this.log.debug(error);
      });
  }

  startVerificationProgress = (status: number, res: string) => {
    let newProgress = this.state.progress + 3;
    newProgress = newProgress > 100 ? 100 : newProgress;
    let vres = this.state.verificationResponse;
    vres = newProgress == 100 ? res : vres;
    this.updateState(
      {
        verified: status,
        progress: newProgress,
        verificationResponse: vres
      },
      () => {
        if (newProgress < 100) {
          setTimeout(() => {
            this.startVerificationProgress(status, res);
          }, 50);
        } else if (status == 1) {
          setTimeout(() => {
            window.location.replace(
              this.getLink(this.constants.RoutePaths.Login)
            );
          }, 5 * 1000);
        }
      }
    );
  };
}
