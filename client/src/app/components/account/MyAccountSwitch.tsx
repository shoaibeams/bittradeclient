import * as React from "react";
import { BaseComponent } from "../base/BaseComponent";
import { Redirect, Route, Switch } from "react-router";
import asyncComponent from "../base/AsyncComponent";
import Widget from "../../../components/Widget";
import { Tabs } from "antd";
import MyAccountComponent from "./MyAccountComponent";
import { Link } from "react-router-dom";
const TabPane = Tabs.TabPane;

const KYCSwitch = asyncComponent(() =>
  import("./kyc/KYCSwitch").then(module => module.default)
);

export default class MyAccountSwitch extends BaseComponent {
  render() {
    if (window.location.href.endsWith(this.constants.RoutePaths.MyAccount)) {
      // return <Redirect to={this.constants.RoutePaths.AccountVerification} />;
    }
    const getTabContent = () => {
      return (
        <Switch>
          <Route
            path={`${this.props.match.url}${
              this.constants.RoutePaths.Verification
            }`}
            render={() => {
              return (
                <KYCSwitch
                  {...this.props as any}
                  match={{
                    url: `${this.props.match.url}${
                      this.constants.RoutePaths.Verification
                    }`
                  }}
                />
              );
            }}
          />
          <Route
            exact
            path={`${this.props.match.url}`}
            render={() => {
              return (
                <MyAccountComponent
                  {...this.props as any}
                  match={{
                    url: `${this.props.match.url}${
                      this.constants.RoutePaths.Verification
                    }`
                  }}
                />
              );
            }}
          />
        </Switch>
      );
    };
    return (
      <>
        <Widget styleName="gx-order-history">
          <Tabs
            defaultActiveKey={this.state.activeTabKey}
            tabPosition={this.widthLessThanmd() ? "top" : "left"}
            style={{ height: "calc(100% - " + this.g.headerHeight + "px)" }}
            onChange={(key: string) => {
              this.props.history.push(key);
            }}
          >
            <TabPane tab={this.lang.Account} key={this.tabKeys.account}>
              {getTabContent()}
            </TabPane>
            <TabPane
              tab={this.lang.Verification}
              key={this.tabKeys.verification}
            >
              {getTabContent()}
            </TabPane>
          </Tabs>
        </Widget>
      </>
    );
  }

  tabKeys = {
    account: this.constants.RoutePaths.MyAccount,
    verification: this.constants.RoutePaths.AccountVerification
  };

  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    let activeTabKey = this.tabKeys.account;
    if (
      new RegExp(".*?(" + this.tabKeys.verification + ").*").test(
        window.location.href
      )
    ) {
      activeTabKey = this.tabKeys.verification;
    }
    this.state = { activeTabKey };
  }
}
