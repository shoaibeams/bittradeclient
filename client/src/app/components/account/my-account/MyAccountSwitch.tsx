import React from "react";
import { BaseComponent } from "../../base/BaseComponent";
import { Redirect, Route, Switch } from "react-router";
import asyncComponent from "../../base/AsyncComponent";
import Widget from "../../../../components/Widget";
import { Tabs } from "antd";
import MyAccountComponent from "./MyAccountComponent";
import { Link } from "react-router-dom";
import KYCComponent from "../kyc/KYCComponent";
import PreferencesComponent from "../preferences/PreferencesComponent";
const TabPane = Tabs.TabPane;

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
                <KYCComponent
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
            path={`${this.props.match.url}${
              this.constants.RoutePaths.Preferences
            }`}
            render={() => {
              return (
                <PreferencesComponent
                  {...this.props as any}
                  match={{
                    url: `${this.props.match.url}${
                      this.constants.RoutePaths.Preferences
                    }`
                  }}
                />
              );
            }}
          />
          <Route
            exact
            path={`${this.props.match.url}${this.constants.RoutePaths.Account}`}
            render={() => {
              return (
                <MyAccountComponent
                  {...this.props as any}
                  match={{
                    url: `${this.props.match.url}${
                      this.constants.RoutePaths.MyAccount
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
            activeKey={this.getActiveTabKey()}
            tabPosition={this.widthLessThanmd() ? "top" : "left"}
            style={{ height: "calc(100% - " + this.g.headerHeight + "px)" }}
            onChange={(key: string) => {
              this.props.history.push(key);
            }}
          >
            {this.tabs.map(t => {
              return (
                <TabPane tab={t.title} key={t.key}>
                  {getTabContent()}
                </TabPane>
              );
            })}
          </Tabs>
        </Widget>
      </>
    );
  }

  tabs = [
    {
      key: this.constants.RoutePaths.MyAccountAccount,
      title: this.lang.Account
    },
    {
      key: this.constants.RoutePaths.MyAccountVerification,
      title: this.lang.Verification
    },
    {
      key: this.constants.RoutePaths.MyAccountPreferences,
      title: this.lang.Preferences
    }
  ];

  constructor(props) {
    super(props);
    this.init();
  }

  init() {}

  getActiveTabKey = () => {
    let keys = this.tabs.map(t => {
      return t.key;
    });
    let activeTabKey = keys[0];
    let match = false;
    let iterator = 0;
    while (!match && iterator < keys.length) {
      if (
        new RegExp(".*?(" + keys[iterator] + ").*").test(window.location.href)
      ) {
        activeTabKey = keys[iterator];
        match = true;
      }
      iterator++;
    }
    return activeTabKey;
  };
}
