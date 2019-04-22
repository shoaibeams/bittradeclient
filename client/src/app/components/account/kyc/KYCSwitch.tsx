import * as React from "react";
import { BaseComponent } from "../../base/BaseComponent";
import AccountTypeSelectionComponent from "./account-type-selection/AccountTypeSelectionComponent";
import { Row, Col, Card } from "antd";
import asyncComponent from "../../base/AsyncComponent";
import { Route, Switch } from "react-router";
import ProofsSwitch from "./proofs/ProofsSwitch";
import KYCComponent from "./KYCComponent";

export default class KYCSwitch extends BaseComponent {
  render() {
    return (
      <>
        <div className="gx-mb-3">
          <Switch>
            <Route
              path={`${this.props.match.url}${
                this.constants.RoutePaths.Proofs
              }`}
              render={() => {
                return (
                  <ProofsSwitch
                    {...this.props as any}
                    match={{
                      url: `${this.props.match.url}${
                        this.constants.RoutePaths.Proofs
                      }`
                    }}
                  />
                );
              }}
            />
            <Route
              path={`${this.props.match.url}*`}
              render={() => {
                return <KYCComponent {...this.props} />;
              }}
            />
          </Switch>
        </div>
      </>
    );
  }
}
