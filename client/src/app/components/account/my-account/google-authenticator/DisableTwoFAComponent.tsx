import * as React from "react";
import { Tabs, Col, Button, Row, Card, Tag, Steps, Icon, Form } from "antd";
import { BaseComponent } from "../../../base/BaseComponent";
import { StaticHelper } from "../../../../../shared/static-helper";
import { mdCallResponse } from "../../../../../models/call-response";
import { mdUserAccounts } from "../../../../../models/user-accounts";
import { TwoFactorAuthTypes } from "../../../../../enums/general";
import FontAwesome from "../../../base/FontAwesome";
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

export default class DisableTwoFAComponent extends BaseComponent {
  render() {
    this.initShorts();
    let ua = new mdUserAccounts();
    if (this.g.user.userAccount) {
      ua = this.g.user.userAccount;
    }
    return (
      <>
        <Form layout="vertical" onSubmit={this.onSubmit}>
          <Row style={{ minHeight: 235 }}>
            <Col xs={24}>
              <h2>
                {this.lang.Disable + " " + this.lang.TwoFactorAuthentication}
              </h2>
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
            </Col>
          </Row>
        </Form>
        <Row>
          <Col xs={24}>
            <hr />
          </Col>
        </Row>
        <Row className="gx-mt-3">
          <Col xs={12} className="gx-text-left">
            <Button
              type={"default"}
              disabled={this.state.currentStepIndex <= 0}
              onClick={e => {
                e.preventDefault();
                this.notifyParent(false);
              }}
            >
              <FontAwesomeIcon icon={["fas", "times"]} />
              &nbsp;
              {this.lang.Cancel}
            </Button>
          </Col>
          <Col xs={12} className="gx-text-right">
            <Button
              // htmlType={"submit"}
              onClick={this.onSubmit}
              loading={this.state.disableSubmitButton}
              type={"primary"}
            >
              {this.lang.Disable}
              &nbsp;
              <FontAwesomeIcon icon={["fas", "ban"]} />
            </Button>
          </Col>
        </Row>
      </>
    );
  }

  formItemLayout = {
    labelCol: { xs: 24, sm: 24, md: 10 },
    wrapperCol: { xs: 24, sm: 24, md: 14 }
  };
  fileInputId: string;
  protectedActions: string[];
  model: mdSignUp;
  constructor(props) {
    super(props);
    this.init();
  }

  init() {
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
      disableSubmitButton: false
    };
  }

  notifyParent = (success: boolean, payload = null) => {
    if (typeof this.p.onDone === "function") {
      this.p.onDone(success, payload);
    }
  };

  onSubmit = e => {
    e.preventDefault();
    if (!this.validateForm()) {
      // this.antd.modalError("InValid Form");
      return;
    }
    let formData = this.getFormData() as mdSignUp;
    return this.updateStatePromise({ disableSubmitButton: true }).then(_ => {
      return this.http
        .post<mdCallResponse>(
          this.constants.EndPoints.PostDisableTwoFA,
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
                    ua.userAccount.two_fa = TwoFactorAuthTypes.None;
                    this.props.updateGlobalProperty(global.propKeys.user, ua);
                  }
                }
                this.successNotification(
                  StaticHelper.formatString(
                    this.lang.SuccessfullyFormat,
                    this.lang.TwoFactorAuthentication + " " + this.lang.Disabled
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
