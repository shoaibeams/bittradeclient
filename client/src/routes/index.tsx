import * as React from "react";
import { Route, Switch, Redirect } from "react-router";

import { StaticConstants, Constants } from "../shared/constants";
import { StaticHelper } from "../shared/static-helper";
import asyncComponent from "../app/components/base/AsyncComponent";
import NoMatchComponent from "../app/components/base/NoMatchComponent";
import { MainApp } from "../containers/App/MainApp";
import { BaseComponent } from "../app/components/base/BaseComponent";

const ContactUsComponent = asyncComponent(() =>
  import("../app/components/contact-us/ContactUsComponent").then(
    module => module.default
  )
);

const HomeComponent = asyncComponent(() =>
  import("../app/components/home/HomeComponent").then(module => module.default)
);
const AccountVerificationComponent = asyncComponent(() =>
  import("../app/components/account/AccountVerificationComponent").then(
    module => module.default
  )
);
const EmailConfirmationComponent = asyncComponent(() =>
  import("../app/components/account/EmailConfirmationComponent").then(
    module => module.default
  )
);
const LoginComponent = asyncComponent(() =>
  import("../app/components/account/LoginComponent").then(
    module => module.default
  )
);
const SignUpComponent = asyncComponent(() =>
  import("../app/components/account/SignUpComponent").then(
    module => module.default
  )
);
const FundingComponent = asyncComponent(() =>
  import("../app/modules/funding/FundingComponent").then(
    module => module.default
  )
);
const TradeComponent = asyncComponent(() =>
  import("../app/modules/trade/TradeComponent").then(module => module.default)
);
const ForgotPasswordComponent = asyncComponent(() =>
  import("../app/components/account/ForgotPasswordComponent").then(
    module => module.default
  )
);

const PasswordRecoveryComponent = asyncComponent(() =>
  import("../app/components/account/PasswordRecoveryComponent").then(
    module => module.default
  )
);

const MyAccountSwitch = asyncComponent(() =>
  import("../app/components/account/my-account/MyAccountSwitch").then(
    module => module.default
  )
);

const OpenRoutes = props => {
  return (
    <Switch>
      <Route
        exact
        path={`${props.match.url}${StaticConstants.RoutePaths.Login}`}
        render={() => <LoginComponent {...props} />}
      />
      <Route
        exact
        path={`${props.match.url}${StaticConstants.RoutePaths.SignUp}`}
        render={() => <SignUpComponent {...props} />}
      />
      <Route
        exact
        path={`${props.match.url}${StaticConstants.RoutePaths.AccountVerify}`}
        render={() => <AccountVerificationComponent {...props} />}
      />
      <Route
        exact
        path={`${props.match.url}${
          StaticConstants.RoutePaths.EmailConfirmation
        }`}
        render={() => <EmailConfirmationComponent {...props} />}
      />
      <Route
        exact
        path={`${props.match.url}${
          StaticConstants.RoutePaths.AccountForgotPassword
        }`}
        render={() => <ForgotPasswordComponent {...props} />}
      />
      <Route
        exact
        path={`${props.match.url}${
          StaticConstants.RoutePaths.AccountPasswordRecovery
        }`}
        render={() => <PasswordRecoveryComponent {...props} />}
      />
      <Route
        exact
        path={`${props.match.url}${StaticConstants.RoutePaths.Home}*`}
        render={() => <MainApp {...props} />}
      />
      {/* <Route path="*" render={() => <MainApp {...props} match={{ url: "/" }} />} /> */}
    </Switch>
  );
};

const restrictedRouteRenderer = (Comp, props, url) => {
  if (!props.globals.isLoggedIn) {
    let redirectURI = encodeURIComponent(window.location.href);
    let to = StaticHelper.getLink(
      StaticConstants.RoutePaths.Login +
        "?" +
        Constants.Instance.QueryParams.redirectURI +
        "=" +
        redirectURI
    );
    return <Redirect to={to} />;
  }
  return <Comp {...props as any} match={{ url: url }} />;
};

class ThemeImplementedRoutes extends BaseComponent {
  render() {
    return (
      <div
        className="gx-main-content-wrapper"
        // style={{
        //   minHeight: 500, // window.innerHeight - this.g.headerHeight,
        //   height: "auto"
        // }}
      >
        <Switch>
          <Route
            exact
            path={`${this.props.match.url}${
              StaticConstants.RoutePaths.ContactUs
            }`}
            render={() => <ContactUsComponent {...this.props} />}
          />
          <Route
            path={`${this.props.match.url}${StaticConstants.RoutePaths.Trade}`}
            render={() => {
              return restrictedRouteRenderer(
                TradeComponent,
                this.props,
                `${this.props.match.url}${StaticConstants.RoutePaths.Trade}`
              );
            }}
          />
          <Route
            path={`${this.props.match.url}${
              StaticConstants.RoutePaths.Funding
            }`}
            render={() => {
              return restrictedRouteRenderer(
                FundingComponent,
                this.props,
                `${this.props.match.url}${StaticConstants.RoutePaths.Funding}`
              );
            }}
          />
          <Route
            path={`${this.props.match.url}${
              this.constants.RoutePaths.MyAccount
            }`}
            render={() => {
              return restrictedRouteRenderer(
                MyAccountSwitch,
                this.props,
                `${this.props.match.url}${this.constants.RoutePaths.MyAccount}`
              );
            }}
          />
          <Route
            path={`${this.props.match.url}/`}
            render={() => {
              if (this.g.isLoggedIn) {
                return (
                  <Redirect
                    to={this.getLink(this.constants.RoutePaths.Trade)}
                  />
                );
              }
              return <HomeComponent {...this.props} />;
            }}
          />
        </Switch>
      </div>
    );
  }
}

export { OpenRoutes, ThemeImplementedRoutes };
