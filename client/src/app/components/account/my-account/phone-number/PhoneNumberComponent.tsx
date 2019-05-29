import React from "react";
import { BaseComponent } from "../../../base/BaseComponent";
import { Tabs, Col, Button, Row, Card, Tag, Modal } from "antd";
import { mdCallResponse } from "../../../../../models/call-response";
import { StaticHelper } from "../../../../../shared/static-helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mdUserPhoneNumber } from "../../../../../models/user-phone-number";
import { UserPhoneNumberStatuses } from "../../../../../enums/general";
import SavePhoneNumberComponent from "./SavePhoneNumberComponent";
import { mdUserAccounts } from "../../../../../models/user-accounts";
import { mdAuthUsers } from "../../../../../models/auth-users";
const TabPane = Tabs.TabPane;

export default class PhoneNumberComponent extends BaseComponent {
  render() {
    let phoneNumber = this.state.phoneNumber as mdUserPhoneNumber;
    if (!phoneNumber) {
      if (this.user) {
        if (this.user.userAccount) {
          if (this.user.userAccount.contact_no) {
            phoneNumber = new mdUserPhoneNumber();
            phoneNumber.calling_code = this.user.userAccount.calling_code;
            phoneNumber.phone_number = this.user.userAccount.contact_no;
            phoneNumber.record_status = UserPhoneNumberStatuses.Verified;
            phoneNumber.country_id = this.user.userAccount.contact_no_country_id;
          }
        }
      }
    }
    return (
      <>
        <Card>
          <Row>
            {this.antd.colsm8(
              <FontAwesomeIcon
                icon={["fas", "mobile-alt"]}
                size="9x"
                className="gx-avatar-img gx-avatar-img-lg gx-border-0"
              />
            )}
            {this.antd.colsm16(
              <div className="gx-description">
                <h2>{this.lang.PhoneNumber}</h2>
                {phoneNumber == null
                  ? null
                  : StaticHelper.getHiddenPhoneNumber(
                      phoneNumber.calling_code,
                      phoneNumber.phone_number
                    )}
                &nbsp;
                {phoneNumber == null ? (
                  <Tag color="red" onClick={() => {}}>
                    {this.lang.NotAdded}
                  </Tag>
                ) : phoneNumber.record_status ==
                  UserPhoneNumberStatuses.Verified ? (
                  <Tag color="green">{this.lang.Verified}</Tag>
                ) : (
                  <Tag color="orange">{this.lang.Pending}</Tag>
                )}
                <br />
                <Button
                  type="primary"
                  style={{ marginBottom: 0 }}
                  loading={this.state.loadingPhoneNumber}
                  onClick={e => {
                    e.preventDefault();
                    if (phoneNumber) {
                      if (
                        phoneNumber.record_status ==
                        UserPhoneNumberStatuses.Verified
                      ) {
                        this.resendCode();
                      }
                    }
                    this.updateState({ showModal: true });
                  }}
                >
                  {phoneNumber == null
                    ? this.lang.Add + " " + this.lang.PhoneNumber
                    : phoneNumber.record_status ==
                      UserPhoneNumberStatuses.Verified
                    ? this.lang.Update + " " + this.lang.PhoneNumber
                    : this.lang.Verify}
                </Button>
              </div>
            )}
          </Row>
        </Card>
        <Modal
          title={this.lang.PhoneNumber}
          visible={this.state.showModal}
          footer={null}
          destroyOnClose={true}
          maskClosable={false}
          width={768}
          onCancel={_ => {
            this.updateState({ showModal: false });
          }}
        >
          <SavePhoneNumberComponent
            {...this.props}
            params={{
              phoneNumber,
              onDone: (success: boolean, payload: mdUserPhoneNumber) => {
                let state: any = {
                  showModal: false
                };
                if (success) {
                  state = { ...state, phoneNumber: payload };
                }
                this.updateState(state);
              }
            }}
          />
        </Modal>
      </>
    );
  }

  user: mdAuthUsers;
  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    this.state = {
      phoneNumber: null,
      loadingPhoneNumber: false,
      modalTitle: "",
      showModal: false
    };
    this.user = this.g.user;
    if (this.user) {
      if (this.user.userAccount) {
        if (!this.user.userAccount.contact_no) {
          this.getPhoneNumber();
        }
      }
    }
  }

  afterReceivingProps = _ => {
    let loadPhoneNumber = false;
    this.user = this.g.user;
    if (this.user) {
      if (this.user.userAccount) {
        if (!this.user.userAccount.contact_no && !this.state.phoneNumber) {
          loadPhoneNumber = true;
        }
      }
    }
    if (loadPhoneNumber) {
      this.getPhoneNumber();
    }
  };

  getPhoneNumber() {
    this.updateStatePromise({ loadingPhoneNumber: true })
      .then(_ => {
        return this.http
          .get<mdCallResponse>(this.constants.EndPoints.GetUserPhoneNumber)
          .then((res: mdCallResponse) => {
            return this.updateStatePromise({ loadingPhoneNumber: false }).then(
              () => {
                if (res) {
                  if (res.isSuccess) {
                    this.updateState({
                      phoneNumber: res.extras
                    });
                  }
                }
              }
            );
          });
      })
      .catch(error => {
        this.log.debug(error);
      });
  }

  resendCode = () => {
    return this.updateStatePromise({
      reSendingCode: true,
      showSubmitResponse: false
    }).then(_ => {
      return this.http
        .post<mdCallResponse>(
          this.constants.EndPoints.PostResendSMSVerificationCode,
          {}
        )
        .then((res: mdCallResponse) => {
          return this.updateStatePromise({ reSendingCode: false }).then(_ => {
            if (res.isSuccess) {
              // this.successNotification(this.lang.VerificationCodeResent);
              return true;
            } else {
              this.errorNotification(res.message);
              return this.updateStatePromise({
                showSubmitResponse: true,
                isSuccessSubmitResponse: false,
                submitResponse: this.bulletList(res.message.split("\n"))
              }).then(_ => {
                return false;
              });
            }
          });
        })
        .catch(error => {});
    });
  };
}
