import { BaseComponent } from "../base/BaseComponent";
import React from "react";
import { Link, Redirect } from "react-router-dom";
import { mdFormControl } from "../../../shared/form-control";
import { mdCallResponse } from "../../../models/call-response";
import { mdSignUp, SignUpMetaData } from "../../../models/sign-up";
import { Form, Button } from "antd";
import { mdAnimControl } from "../../../models/anim-control";
import { TransitionState } from "../../../enums/transition";
import { Transitions } from "../../../models/transitions";
import { SocketCustomEvents } from "../../../enums/socket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  MailValidator,
  MaxLengthValidator
} from "../../../shared/validation-attributes";

export class ForgotPasswordComponent extends BaseComponent {
  render() {
    this.initShorts();
    if (!this.g.loginChecked) {
      return null;
    }
    if (this.g.isLoggedIn) {
      return <Redirect to={this.getLink(this.constants.RoutePaths.Trade)} />;
    }
    // const {getFieldDecorator} = this.props.form;
    return (
      <>
        <div
          className="gx-login-container"
          style={{ overflow: "auto", paddingBottom: "120px" }}
        >
          <div
            className="gx-login-content"
            style={{ maxWidth: "500px", margin: "unset" }}
          >
            <div className="gx-login-header">
              <Link to={this.getLink(this.constants.RoutePaths.Home)}>
                <img
                  className=""
                  src="/assets/images/footer-logo.png"
                  width={180}
                  height={88}
                />
              </Link>
            </div>
            <div className="gx-login-header">
              <h1 className="gx-login-title">{this.lang.ForgotYourPassword}</h1>
            </div>
            {this.state.emailSent ? (
              <div className="gx-text-center">
                <div className="gx-mb-3">
                  {this.animatedCSSDiv(
                    <FontAwesomeIcon icon={["fas", "envelope-open-text"]} />,
                    this.state.animValues.mail_img
                  )}
                </div>
                <div className="gx-flex-row gx-mb-2">
                  <span>{this.lang.PasswordRecoveryEmailSentPara}</span>
                </div>
              </div>
            ) : (
              <div>
                <div className="gx-flex-row">
                  <span className="gx-mb-2 gx-mr-3">
                    {this.lang.ForgotYourPasswordPara}
                  </span>
                </div>
                <Form
                  layout="vertical"
                  onSubmit={this.onSubmit}
                  className="gx-form-row0"
                >
                  {this.antd.textFormItem(this.f.email, false)}
                  <Button
                    loading={this.state.disableSubmitButton}
                    type="primary"
                    htmlType="submit"
                    disabled={this.state.disableSubmitButton}
                  >
                    {this.lang.Submit}
                  </Button>
                </Form>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  model: mdSignUp;
  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    this.model = new mdSignUp(true);
    this.state = {
      form: {
        email: new mdFormControl(
          this.model.email,
          "email",
          this.lang.Email,
          [
            new MailValidator(this.lang.InvalidEmail),
            new MaxLengthValidator(
              this.lang.MaxLengthFormat2,
              SignUpMetaData.emailMaxLength
            )
          ],
          "envelope"
        )
      },
      animValues: {
        mail_img: new mdAnimControl(
          this.getTransition(Transitions.pulse, TransitionState.Running),
          "mail_img",
          true
        )
      },
      disableSubmitButton: false,
      showSubmitResponse: false,
      submitResponseClass: "text-danger",
      submitResponse: "",
      emailSent: false
    };
  }

  registerPasswordRecoveredEvent = (email: string) => {
    this.log.debug(
      "registerEvent " + SocketCustomEvents.AwaitingPasswordRecovery
    );
    this.socket.registerEvent(
      SocketCustomEvents.AwaitingPasswordRecovery,
      email,
      () => {
        this.redirectToLogin(2000);
      }
    );
  };

  componentWillUnmount = () => {
    this.socket.unregisterEvent(SocketCustomEvents.AwaitingPasswordRecovery);
  };

  onSubmit = e => {
    e.preventDefault();
    this.showErrors = true;
    // let captchaToken = this.captchaRef.current.getValue();
    // this.log.info(captchaToken);
    // if (this.isNullOrEmpty(captchaToken) && !global.isDev) {
    //     return;
    // }

    if (!this.validateForm("form")) {
      this.log.debug("invalid form");
      return;
    }
    //everything is fine, now save the data
    this.updateState({
      disableSubmitButton: true
    });
    let formData: mdSignUp = this.getFormData(this.state.form) as mdSignUp;
    this.http
      .post<mdCallResponse>(
        this.constants.EndPoints.PostAccountForgotPassword,
        formData
      )
      .then((res: mdCallResponse) => {
        this.log.debug(res);
        let state = {};
        if (res) {
          if (res.isSuccess) {
            state = { emailSent: true };
            this.registerPasswordRecoveredEvent(formData.email);
          } else {
            this.errorNotification(
              this.bulletList(res.message.split("\n")),
              this.lang.Alert
            );
          }
        }
        this.updateState({
          ...state,
          disableSubmitButton: false
        });
      })
      .catch(error => {
        if (!error) return;
        this.log.debug(error);
      });
  };
}

export default ForgotPasswordComponent;
