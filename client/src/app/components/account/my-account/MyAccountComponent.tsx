import React from "react";
import { BaseComponent } from "../../base/BaseComponent";
import { Tabs, Row } from "antd";
import ProfilePictureComponent from "./ProfilePictureComponent";
import GoogleAuthenticatorComponent from "./google-authenticator/GoogleAuthenticatorComponent";
import PhoneNumberComponent from "./phone-number/PhoneNumberComponent";
import ChangePasswordBlockComponent from "./change-password/ChangePasswordBlockComponent";
const TabPane = Tabs.TabPane;

export default class MyAccountComponent extends BaseComponent {
  render() {
    return (
      <Row>
        {this.antd.colxl12(<ProfilePictureComponent {...this.props} />)}
        {this.antd.colxl12(<PhoneNumberComponent {...this.props} />)}
        {this.antd.colxl12(<GoogleAuthenticatorComponent {...this.props} />)}
        {this.antd.colxl12(<ChangePasswordBlockComponent {...this.props} />)}
      </Row>
    );
  }

  constructor(props) {
    super(props);
    this.init();
  }

  init() {}
}
