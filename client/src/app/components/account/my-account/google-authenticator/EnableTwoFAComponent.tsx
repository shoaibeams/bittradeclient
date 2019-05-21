import * as React from "react";
import { Tabs, Col, Button, Row, Card, Tag, Steps, Icon, Form } from "antd";
import { BaseComponent } from "../../../base/BaseComponent";
import { StaticHelper } from "../../../../../shared/static-helper";
import { mdCallResponse } from "../../../../../models/call-response";
import { mdUserAccounts } from "../../../../../models/user-accounts";
import { TwoFactorAuthTypes } from "../../../../../enums/general";
import { mdSignUp, SignUpMetaData } from "../../../../../models/sign-up";
import { mdFormControl } from "../../../../../shared/form-control";
import {
  RequiredValidator,
  MaxLengthValidator
} from "../../../../../shared/validation-attributes";
import { mdAuthUsers } from "../../../../../models/auth-users";
import * as QRCode from "qrcode";
import * as speakeasy from "speakeasy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const TabPane = Tabs.TabPane;
const Step = Steps.Step;

export default class EnableTwoFAComponent extends BaseComponent {
  render() {
    this.initShorts();
    let ua = new mdUserAccounts();
    if (this.g.user.userAccount) {
      ua = this.g.user.userAccount;
    }
    let currentStep = this.steps[this.state.currentStepIndex];
    return (
      <>
        <Row>
          <Col xs={24}>
            <Steps>
              {this.steps.map((s, i) => {
                return (
                  <Step
                    key={i}
                    status={
                      i == this.state.currentStepIndex
                        ? "process"
                        : i < this.state.currentStepIndex
                        ? "finish"
                        : "wait"
                    }
                    title={s.title}
                    icon={
                      i == this.state.currentStepIndex ? (
                        <Icon type="loading" />
                      ) : (
                        <FontAwesomeIcon icon={["fas", s.icon]} />
                      )
                    }
                  />
                );
              })}
            </Steps>
          </Col>
        </Row>
        <Row style={{ minHeight: 235 }}>
          <Col xs={24}>
            {currentStep == null ? null : currentStep.component(this.state)}
          </Col>
        </Row>
        <hr />
        <Row className="gx-mt-3">
          <Col xs={12} className="gx-text-left">
            <Button
              type={"default"}
              disabled={this.state.currentStepIndex <= 0}
              onClick={e => {
                e.preventDefault();
                this.updateState({
                  currentStepIndex: this.state.currentStepIndex - 1
                });
              }}
            >
              <FontAwesomeIcon icon={["fas", "arrow-left"]} />
              &nbsp;
              {this.lang.Back}
            </Button>
          </Col>
          <Col xs={12} className="gx-text-right">
            <Button
              loading={this.state.disableSubmitButton}
              type={"primary"}
              onClick={e => {
                e.preventDefault();
                if (this.state.currentStepIndex < this.steps.length - 1) {
                  this.updateState({
                    currentStepIndex: this.state.currentStepIndex + 1
                  });
                  return;
                } else {
                  //now handle submit
                  this.onSubmit(null);
                }
              }}
            >
              {this.state.currentStepIndex < this.steps.length - 1
                ? this.lang.Next
                : this.lang.Finish}
              &nbsp;
              <FontAwesomeIcon
                icon={[
                  "fas",
                  this.state.currentStepIndex < this.steps.length - 1
                    ? "arrow-right"
                    : "save"
                ]}
              />
            </Button>
          </Col>
        </Row>
      </>
    );
  }

  downloadApp = state => {
    const index = state.currentStepIndex;
    const step = this.steps[index];
    return (
      <>
        <Row className="gx-mt-3">
          <Col xs={8} className="gx-text-center">
            <h2>{this.lang.Step + (index + 1)}</h2>
          </Col>
          <Col xs={16}>
            <h2>
              {StaticHelper.formatString(
                this.lang.DownloadAndInstallFormat,
                this.lang.GoogleAuthenticator + " " + this.lang.App
              )}
            </h2>
            &nbsp;
            <a
              href={
                "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
              }
              target="_blank"
            >
              <img
                width={220}
                height={92}
                src={"/assets/images/google-play-badge.png"}
              />
            </a>
            <a
              href={
                "https://itunes.apple.com/pk/app/google-authenticator/id388497605"
              }
              style={{
                margin: "20px"
              }}
              target="_blank"
            >
              <img
                width={190}
                height={70}
                src={"/assets/images/itunes-store-badge.svg"}
              />
            </a>
            <p>
              {this.lang.DownloadGoogleAuthAppPara}&nbsp;
              <a
                href="https://support.google.com/accounts/answer/1066447?hl=en&co=GENIE.Platform%3DAndroid&oco=0"
                target="_blank"
              >
                {this.lang.GoogleSupport}
              </a>
            </p>
          </Col>
        </Row>
      </>
    );
  };

  subscribeApp = state => {
    const index = state.currentStepIndex;
    return (
      <>
        <Row className="gx-mt-3">
          <Col xs={8} className="gx-text-center">
            <h2>{this.lang.Step + (index + 1)}</h2>
          </Col>
          <Col xs={16}>
            <h2>{StaticHelper.formatString(this.lang.Subscribe)}</h2>
            <Row>
              {this.antd.colmd10(
                this.spinnerComponent(
                  <div>
                    <img src={state.imageURI} />
                    <br />
                    <span>{this.lang.ScanThisQRCode}</span>
                  </div>,
                  state.loadingSecret
                )
              )}
              {this.antd.colmd3(
                <div className="gx-w-100 ">{this.lang.OR}</div>,
                "gx-mt-2 gx-mb-2 align-middle"
              )}
              {this.antd.colmd10(
                this.spinnerComponent(
                  <div>
                    <Tag color="green">
                      <h3 style={{ margin: 0 }}>{this.state.secret}</h3>
                    </Tag>
                    <br />
                    <span>{this.lang.EnterTokenManuallyTwoFAPara}</span>
                  </div>,
                  state.loadingSecret
                ),
                "align-middle"
              )}
            </Row>
          </Col>
        </Row>
      </>
    );
  };

  backupKey = state => {
    const index = state.currentStepIndex;
    const step = this.steps[index];
    return (
      <>
        <Row className="gx-mt-3">
          <Col xs={8} className="gx-text-center">
            <h2>{this.lang.Step + (index + 1)}</h2>
          </Col>
          <Col xs={16}>
            <h2>{this.lang.BackupKey}</h2>
            {this.antd.colmd24(
              this.spinnerComponent(
                <div>
                  <Tag color="green">
                    <h3 style={{ margin: 0 }}>{this.state.secret}</h3>
                  </Tag>
                  <br />
                  <span>{this.lang.BackupKeyPara}</span>
                </div>,
                state.loadingSecret
              ),
              "align-middle"
            )}
          </Col>
        </Row>
      </>
    );
  };

  finish2FA = state => {
    const index = state.currentStepIndex;
    const step = this.steps[index];
    return (
      <>
        <Row className="gx-mt-3">
          <Col xs={6} className="gx-text-center">
            <h2>{this.lang.Step + (index + 1)}</h2>
          </Col>
          <Col xs={18}>
            <h2>{this.lang.Finish}</h2>
            {this.antd.colmd24(
              <Form layout="vertical">
                {this.antd.passwordFormItem(
                  this.f.password,
                  true,
                  null,
                  this.formItemLayout
                )}
                {this.antd.textFormItem(
                  this.f.two_fa_code,
                  true,
                  null,
                  this.formItemLayout
                )}
              </Form>
            )}
          </Col>
        </Row>
      </>
    );
  };

  formItemLayout = {
    labelCol: { xs: 24, sm: 24, md: 10 },
    wrapperCol: { xs: 24, sm: 24, md: 14 }
  };
  fileInputId: string;
  protectedActions: string[];
  steps: any[] = [];
  model: mdSignUp;
  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    this.steps.push({
      title: this.lang.DownloadApp,
      component: this.downloadApp,
      icon: "download"
    });
    this.steps.push({
      title: this.lang.Subscribe,
      component: this.subscribeApp,
      icon: "qrcode"
    });
    this.steps.push({
      title: this.lang.Backup,
      component: this.backupKey,
      icon: "edit"
    });
    this.steps.push({
      title: this.lang.Finish,
      component: this.finish2FA,
      icon: "smile"
    });
    this.model = new mdSignUp(true);
    this.state = {
      form: {
        password: new mdFormControl(
          this.model.password,
          "password",
          this.lang.Password,
          [
            new RequiredValidator(this.lang.RequiredFormat),
            new MaxLengthValidator(
              this.lang.MaxLengthFormat2,
              SignUpMetaData.passwordMaxLength
            )
          ],
          "lock"
        ),
        two_fa_code: new mdFormControl(
          this.model.two_fa_code,
          "two_fa_code",
          this.lang.TwoFactorAuthentication,
          [new RequiredValidator(this.lang.RequiredFormat)],
          "mobile-alt"
        )
      },
      secret: "",
      loadingSecret: true,
      imageURI: "",
      disableSubmitButton: false,
      currentStepIndex: 0
    };
    this.getSecretForGoogleAuth(null);
  }

  getSecretForGoogleAuth = _ => {
    this.http
      .get(this.constants.EndPoints.GetCodeForTwoFA)
      .then((res: mdCallResponse) => {
        return this.updateStatePromise({ loadingSecret: false }).then(_ => {
          if (res.isSuccess) {
            let secret = res.extras.secret;
            let email = "";
            if (this.g.user) {
              if (this.g.user.email) {
                email = this.g.user.email;
              }
            }
            let url = `otpauth://totp/${email}?secret=${secret}&issuer=${
              this.lang.BitVelocity
            }`;
            QRCode.toDataURL(url).then(imageURI => {
              return this.updateStatePromise({
                secret,
                imageURI
              });
            });
          } else {
            this.errorNotification(res.message, this.lang.Alert);
            this.notifyParent(false);
          }
        });
      })
      .catch(error => {});
  };

  notifyParent = (success: boolean, payload = null) => {
    if (typeof this.p.onDone === "function") {
      this.p.onDone(success, payload);
    }
  };

  onSubmit = _ => {
    if (!this.validateForm()) {
      // this.antd.modalError("InValid Form");
      return;
    }
    let formData = this.getFormData() as mdSignUp;
    return this.updateStatePromise({ disableSubmitButton: true }).then(_ => {
      return this.http
        .post<mdCallResponse>(
          this.constants.EndPoints.PostEnableTwoFA,
          formData
        )
        .then((res: mdCallResponse) => {
          return this.updateStatePromise({ disableSubmitButton: false }).then(
            _ => {
              if (res.isSuccess) {
                let ua: mdAuthUsers = null;
                if (this.g.user) {
                  ua = this.g.user;
                  if (ua.userAccount) {
                    ua.userAccount.two_fa = TwoFactorAuthTypes.Google;
                    this.props.updateGlobalProperty(global.propKeys.user, ua);
                  }
                }
                this.successNotification(
                  StaticHelper.formatString(
                    this.lang.SuccessfullyFormat,
                    this.lang.TwoFactorAuthentication + " " + this.lang.Enabled
                  )
                );
                if (typeof this.p.onDone === "function") {
                  this.p.onDone();
                }
              } else {
                this.errorNotification(res.message);
              }
            }
          );
        })
        .catch(error => {});
    });
  };
}
