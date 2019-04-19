import * as React from "react";
import { BaseComponent } from "../base/BaseComponent";
import { Redirect, Route, Switch } from "react-router";
import asyncComponent from "../base/AsyncComponent";

const KYCSwitch = asyncComponent(() =>
  import("./kyc/KYCSwitch").then(module => module.default)
);

export default class MyAccountComponent extends BaseComponent {
  render() {
    if (window.location.href.endsWith(this.constants.RoutePaths.MyAccount)) {
      return <Redirect to={this.constants.RoutePaths.AccountVerification} />;
    }
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
      </Switch>
    );
  }

  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    // this.loadCurrencies();
  }
}
