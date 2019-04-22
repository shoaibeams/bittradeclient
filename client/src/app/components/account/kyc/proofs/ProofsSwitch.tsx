import * as React from "react";
import { Row, Col, Card } from "antd";
import { Route, Switch } from "react-router";
import ProofsGridComponent from "./ProofsGridComponent";
import IdentityVerificationComponent from "./identity/IdentityVerificationComponent";
import { BaseComponent } from "../../../base/BaseComponent";

export default class ProofsSwitch extends BaseComponent {
  render() {
    return (
      <>
        <Switch>
          <Route
            path={`${this.props.match.url}${
              this.constants.RoutePaths.Identity
            }`}
            render={() => {
              return (
                <IdentityVerificationComponent
                  {...this.props as any}
                  match={{
                    url: `${this.props.match.url}${
                      this.constants.RoutePaths.Identity
                    }`
                  }}
                />
              );
            }}
          />
          <Route
            path={`${this.props.match.url}*`}
            render={() => {
              return <ProofsGridComponent {...this.props} />;
            }}
          />
        </Switch>
      </>
    );
  }
}
