import React from "react";
import { Tabs, Col, Button, Row, Card, Tag, Modal } from "antd";
import { BaseComponent } from "../../../base/BaseComponent";
import { StaticHelper } from "../../../../../shared/static-helper";
import { mdCallResponse } from "../../../../../models/call-response";
import { mdUserAccounts } from "../../../../../models/user-accounts";
import { TwoFactorAuthTypes } from "../../../../../enums/general";
import EnableTwoFAComponent from "./EnableTwoFAComponent";
import DisableTwoFAComponent from "./DisableTwoFAComponent";
const TabPane = Tabs.TabPane;

export default class GoogleAuthenticatorComponent extends BaseComponent {
  render() {
    let ua = new mdUserAccounts();
    if (this.g.user.userAccount) {
      ua = this.g.user.userAccount;
    }
    return (
      <>
        <Card>
          <Row>
            {this.antd.colsm8(
              <img
                alt="avatar"
                src={"/assets/images/google-authenticator-app.png"}
                className="gx-avatar-img gx-avatar-img-lg gx-border-0"
              />
            )}
            {this.antd.colsm16(
              <div className="gx-description">
                <h2>{this.lang.GoogleAuthenticator}</h2>
                {/* <Row>
                  {this.antd.colsm16(
                    <> */}
                <Tag
                  color={
                    ua.two_fa == TwoFactorAuthTypes.Google ? "green" : "orange"
                  }
                >
                  {ua.two_fa == TwoFactorAuthTypes.Google
                    ? this.lang.Enabled
                    : this.lang.Not + " " + this.lang.Enabled}
                </Tag>
                <Button
                  type={
                    ua.two_fa == TwoFactorAuthTypes.Google
                      ? "default"
                      : "primary"
                  }
                  style={{ marginBottom: 0 }}
                  onClick={e => {
                    e.preventDefault();
                    if (ua.two_fa == TwoFactorAuthTypes.Google) {
                      //disable
                      this.updateState({
                        showDisableModal: true,
                        modalParams: {
                          userAccount: ua,
                          onDone: this.onDisabled
                        }
                      });
                    } else {
                      this.updateState({
                        showEnableModal: true,
                        modalParams: {
                          userAccount: ua,
                          onDone: this.onEnabled
                        }
                      });
                    }
                  }}
                >
                  {ua.two_fa == TwoFactorAuthTypes.Google
                    ? this.lang.Disable
                    : this.lang.Enable}
                </Button>

                <br />
                <span>{this.lang.GoogleAuthenticatorUsedFor}</span>
                {/* </>
                  )} */}
                {/* {this.protectedActions.map(a => {
                return (
                  <Tag key={a} color="green">
                    {a}
                  </Tag>
                );
              })} */}
                {/* {this.antd.colsm8( */}
                {/* ,
                    "align-middle" */}
                {/* )}
                </Row> */}
              </div>
            )}
          </Row>
        </Card>
        <Modal
          title={this.lang.Enable + " " + this.lang.TwoFactorAuthentication}
          visible={this.state.showEnableModal}
          footer={null}
          destroyOnClose={true}
          maskClosable={false}
          width={768}
          onCancel={_ => {
            this.updateState({ showEnableModal: false });
          }}
        >
          <EnableTwoFAComponent
            {...this.props}
            params={this.state.modalParams}
          />
        </Modal>
        <Modal
          title={this.lang.Disable + " " + this.lang.TwoFactorAuthentication}
          visible={this.state.showDisableModal}
          footer={null}
          destroyOnClose={true}
          maskClosable={false}
          width={768}
          onCancel={_ => {
            this.updateState({ showDisableModal: false });
          }}
        >
          <DisableTwoFAComponent
            {...this.props}
            params={this.state.modalParams}
          />
        </Modal>
      </>
    );
  }

  fileInputId: string;
  protectedActions: string[];
  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    this.fileInputId = "fileInputId" + Math.random();
    this.protectedActions = [
      this.lang.Login,
      this.lang.Withdrawal,
      this.lang.PasswordChange,
      this.lang.SensitiveAccountSettingsChange
    ];
    this.state = {
      savingPicture: false,
      showEnableModal: false,
      showDisableModal: false,
      modalComponent: null,
      modalParams: {}
    };
  }

  onEnabled = () => {
    this.updateState({ showEnableModal: false });
  };

  onDisabled = () => {
    this.updateState({ showDisableModal: false });
  };
}
