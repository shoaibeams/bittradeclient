import * as React from "react";
import { BaseComponent } from "../../base/BaseComponent";
import { Redirect, Route, Switch } from "react-router";
import MyAccountSwitch from "./MyAccountSwitch";
import Widget from "../../../../components/Widget";
import { Tabs, Col, Button, Row } from "antd";
import { AccountTypes } from "../../../../enums/general";
import ProfilePictureComponent from "./ProfilePictureComponent";
const TabPane = Tabs.TabPane;

export default class MyAccountComponent extends BaseComponent {
  render() {
    return (
      <Row>
        {this.antd.colmd12(<ProfilePictureComponent {...this.props} />)}
      </Row>
    );
  }

  constructor(props) {
    super(props);
    this.init();
  }

  init() {}
}
