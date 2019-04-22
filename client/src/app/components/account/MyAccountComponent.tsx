import * as React from "react";
import { BaseComponent } from "../base/BaseComponent";
import { Redirect, Route, Switch } from "react-router";
import asyncComponent from "../base/AsyncComponent";
import MyAccountSwitch from "./MyAccountSwitch";
import Widget from "../../../components/Widget";
import { Tabs } from "antd";
const TabPane = Tabs.TabPane;

const KYCSwitch = asyncComponent(() =>
  import("./kyc/KYCSwitch").then(module => module.default)
);

export default class MyAccountComponent extends BaseComponent {
  render() {
    return <></>;
  }

  constructor(props) {
    super(props);
    this.init();
  }

  init() {}
}
