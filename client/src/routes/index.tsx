import * as React from "react";
import { Route, Switch, Redirect } from "react-router";

import { StaticConstants, Constants } from "../shared/constants";
import { StaticHelper } from "../shared/static-helper";
import asyncComponent from "../app/components/base/AsyncComponent";
import NoMatchComponent from "../app/components/base/NoMatchComponent";
import { MainApp } from "../containers/App/MainApp";
import { BaseComponent } from "../app/components/base/BaseComponent";
import ScrollToTop from "../util/ScrollToTop";


const Security = asyncComponent(() =>
  import("../app/components/security/Security").then(module => module.default)
);

const InvestorsZone = asyncComponent(() =>
  import("../app/components/investor-zone/InvestorZone").then(
    module => module.default
  )
);

const Support = asyncComponent(() =>
  import("../app/components/support/Support").then(module => module.default)
);

const AboutUs = asyncComponent(() =>
  import("../app/components/about/About").then(module => module.default)
);

const Fees = asyncComponent(() =>
  import("../app/components/fees/Fees").then(module => module.default)
);

const Faq = asyncComponent(() =>
  import("../app/components/faq/Faq").then(module => module.default)
);

const Blockchain = asyncComponent(() =>
  import("../app/components/blockchain/Blockchain").then(
    module => module.default
  )
);

const TradeHistoryTable = asyncComponent(() =>
  import("../app/components/home/tradebriefhistory/TradeHistoryTable").then(
    module => module.default
  )
);

const TradingViewComponent = asyncComponent(() =>
  import("../app/modules/trade/TradingViewComponent").then(
    module => module.default
  )
);

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
    <ScrollToTop>
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
    </ScrollToTop>
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
    let blockchainSelector;
    if (this.props) {
      blockchainSelector = this.props.history.location.pathname.replace(
        "/blockchain/",
        ""
      );
    }
    return (
      <div
        className={
          blockchainSelector === "travel" || blockchainSelector === "realEstate"
            ? "gx-main-content-wrapper-card"
            : "gx-main-content-wrapper"
        }
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
            exact
            path={`${this.props.match.url}${StaticConstants.RoutePaths.Travel}`}
            render={() => <Blockchain {...this.props} />}
          />
          <Route
            exact
            path={`${this.props.match.url}${
              StaticConstants.RoutePaths.RealEstate
            }`}
            render={() => <Blockchain {...this.props} />}
          />
          <Route
            exact
            path={`${this.props.match.url}${
              StaticConstants.RoutePaths.InvestorsZone
            }`}
            render={() => <InvestorsZone {...this.props} />}
          />
          <Route
            exact
            path={`${this.props.match.url}${
              StaticConstants.RoutePaths.AboutUs
            }`}
            render={() => <AboutUs {...this.props} />}
          />
          <Route
            exact
            path={`${this.props.match.url}${
              StaticConstants.RoutePaths.OurFees
            }`}
            render={() => <Fees {...this.props} />}
          />
          <Route
            exact
            path={`${this.props.match.url}${
              StaticConstants.RoutePaths.Support
            }`}
            render={() => <Support {...this.props} />}
          />
          <Route
            exact
            path={`${this.props.match.url}${
              StaticConstants.RoutePaths.KnowledgeBase
            }`}
            render={() => <TradeHistoryTable {...this.props} />}
          />
          <Route
            exact
            path={`${this.props.match.url}${StaticConstants.RoutePaths.Market}`}
            render={() => <TradeHistoryTable {...this.props} />}
          />
           <Route
            path={`${this.props.match.url}${
              StaticConstants.RoutePaths.Trading
            }`}
            render={() => <TradingViewComponent {...this.props} />}
          />
          <Route
            exact
            path={`${this.props.match.url}${StaticConstants.RoutePaths.FAQ}`}
            render={() => <Faq {...this.props} />}
          />
          <Route
            exact
            path={`${this.props.match.url}${
              StaticConstants.RoutePaths.Security
            }`}
            render={() => <Security {...this.props} />}
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
