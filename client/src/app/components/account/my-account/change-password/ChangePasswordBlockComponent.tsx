import React from "react";
import { BaseComponent } from "../../../base/BaseComponent";
import { Button, Row, Card, Tag, Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mdUserPhoneNumber } from "../../../../../models/user-phone-number";
import ChangePasswordComponent from "./ChangePasswordComponent";

export default class ChangePasswordBlockComponent extends BaseComponent {
  render() {
    return (
      <>
        <Card>
          <Row>
            {this.antd.colsm8(
              <FontAwesomeIcon
                icon={["fas", "lock"]}
                size="7x"
                className="gx-avatar-img gx-avatar-img-lg gx-border-0"
              />
            )}
            {this.antd.colsm16(
              <div className="gx-description">
                <h2>{this.lang.Password}</h2>
                {this.lang.ChangePasswordBlockPara}
                <br />
                <br />
                <Button
                  type="primary"
                  style={{ marginBottom: 0 }}
                  loading={this.state.loadingPhoneNumber}
                  onClick={e => {
                    e.preventDefault();
                    this.updateState({ showModal: true });
                  }}
                >
                  {this.lang.ChangePassword}
                </Button>
              </div>
            )}
          </Row>
        </Card>
        <Modal
          title={this.lang.ChangePassword}
          visible={this.state.showModal}
          footer={null}
          destroyOnClose={true}
          maskClosable={false}
          width={768}
          onCancel={_ => {
            this.updateState({ showModal: false });
          }}
        >
          <ChangePasswordComponent
            {...this.props}
            params={{
              onDone: (success: boolean, payload?) => {
                let state: any = {
                  showModal: false
                };
                this.updateState(state);
              }
            }}
          />
        </Modal>
      </>
    );
  }

  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    this.state = {
      showModal: false
    };
  }
}
