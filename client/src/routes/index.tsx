// import React from "react";
// import {Route, Switch} from "react-router-dom";

// import Components from "./components/index";
// import CustomViews from "./customViews/index";
// import Extensions from "./extensions/index";
// import ExtraComponents from "./extraComponents/index";
// import InBuiltApps from "./inBuiltApps/index";
// import SocialApps from "./socialApps/index";
// import Main from "./main/index";
// import Documents from "./documents/index";

// const App = ({match}) => (
//   <div className="gx-main-content-wrapper">
//     <Switch>
//       <Route path={`${match.url}main`} component={Main}/>
//       <Route path={`${match.url}components`} component={Components}/>
//       <Route path={`${match.url}custom-views`} component={CustomViews}/>
//       <Route path={`${match.url}extensions`} component={Extensions}/>
//       <Route path={`${match.url}extra-components`} component={ExtraComponents}/>
//       <Route path={`${match.url}in-built-apps`} component={InBuiltApps}/>
//       <Route path={`${match.url}social-apps`} component={SocialApps}/>
//       <Route path={`${match.url}documents`} component={Documents}/>
//     </Switch>
//   </div>
// );

// export default App;
import * as React from 'react';
import { Route, Switch, Redirect } from "react-router";

import { StaticConstatns, Constants } from "../shared/constants";
import { StaticHelper } from '../shared/static-helper';
import asyncComponent from "../app/components/base/AsyncComponent"
import NoMatchComponent from '../app/components/base/NoMatchComponent';
import { MainApp } from '../containers/App/MainApp';
import OldThemeRoutes from './OldThemeRoutes';
import { mdProps } from '../models/props';
import { BaseComponent } from '../app/components/base/BaseComponent';

const ContactUsComponent = asyncComponent(() =>
  import('../app/components/contact-us/ContactUsComponent').then(module => module.default)
)
const HomeComponent = asyncComponent(() =>
  import('../app/components/home/HomeComponent').then(module => module.default)
)
const AccountVerificationComponent = asyncComponent(() =>
  import('../app/components/account/AccountVerificationComponent').then(module => module.default)
)
const EmailConfirmationComponent = asyncComponent(() =>
  import('../app/components/account/EmailConfirmationComponent').then(module => module.default)
)
const LoginComponent = asyncComponent(() =>
  import('../app/components/account/LoginComponent').then(module => module.default)
)
const SignUpComponent = asyncComponent(() =>
  import('../app/components/account/SignUpComponent').then(module => module.default)
)
const FundingComponent = asyncComponent(() =>
  import('../app/modules/funding/FundingComponent').then(module => module.default)
)
const TradeComponent = asyncComponent(() =>
  import('../app/modules/trade/TradeComponent').then(module => module.default)
)
const MainFooterHTML = asyncComponent(() =>
  import('../app/components/main-footer/MainFooterHTML').then(module => module.default)
)

const MainHeaderComponent = asyncComponent(() =>
  import('../app/components/main-header/MainHeaderComponet').then(module => module.default)
)

let langKeys = StaticHelper.objectToValuesArray(Constants.Instance.LanguageKey);
const getRestrictedRoutesForLangKey = (langKey, props) => {
  return (
    <React.Fragment key={langKey}>
      <Route key={langKey + StaticConstatns.RoutePaths.Home}
        exact path={"/" + langKey + StaticConstatns.RoutePaths.Home + "*"}
        render={() => <MainApp {...props} match={{ url: "/" + langKey }} />}></Route>
      {/* <Route key={langKey + StaticConstatns.RoutePaths.Trade}
                exact path={"/" + langKey + StaticConstatns.RoutePaths.Trade}
                render={() => <TradeComponent {...props} />}></Route>
            <Route key={langKey + StaticConstatns.RoutePaths.Funding}
                exact path={"/" + langKey + StaticConstatns.RoutePaths.Funding}
                render={() => <FundingComponent {...props} />}></Route> */}
      {/* <Route key={langKey + "/All"}
            path={"/" + langKey + "/*"}
            component={NotFoundComponent}></Route> */}
    </React.Fragment>);
}

const getOpenRoutesForLangKey = (langKey, props) => {
  return (
    <React.Fragment key={langKey}>
      <Route key={langKey + StaticConstatns.RoutePaths.Home}
        exact path={"/" + langKey + StaticConstatns.RoutePaths.Home}
        render={() => <HomeComponent {...props} />}></Route>
      <Route key={langKey + StaticConstatns.RoutePaths.ContactUs}
        exact path={"/" + langKey + StaticConstatns.RoutePaths.ContactUs}
        render={() => <ContactUsComponent {...props} />}></Route>
      <Route key={langKey + StaticConstatns.RoutePaths.EmailConfirmation}
        exact path={"/" + langKey + StaticConstatns.RoutePaths.EmailConfirmation}
        render={() => <EmailConfirmationComponent {...props} />}></Route>
      <Route key={langKey + StaticConstatns.RoutePaths.AccountVerify}
        exact path={"/" + langKey + StaticConstatns.RoutePaths.AccountVerify}
        render={() => <AccountVerificationComponent {...props} />}></Route>
      {/* <Route key={langKey + "/All"}
            path={"/" + langKey + "/*"}
            component={NotFoundComponent}></Route> */}
    </React.Fragment>);
}

const getOpenWithOutHFRoutesForLangKey = (langKey, props) => {
  return (
    <React.Fragment key={langKey}>
      <Route key={langKey + StaticConstatns.RoutePaths.Login}
        exact path={"/" + langKey + StaticConstatns.RoutePaths.Login}
        render={() => <LoginComponent {...props} />}></Route>
      <Route key={langKey + StaticConstatns.RoutePaths.SignUp}
        exact path={"/" + langKey + StaticConstatns.RoutePaths.SignUp}
        render={() => <SignUpComponent {...props} />}></Route>
      {/* <Route key={langKey + "/All"}
            path={"/" + langKey + "/*"}
            component={NotFoundComponent}></Route> */}
    </React.Fragment>);
}

const RestrictedRoutes = (props) => {
  return (
    <Switch>
      <Route exact path={`${props.match.url}${StaticConstatns.RoutePaths.Login}`}
        render={() => <LoginComponent {...props} />}></Route>
      <Route exact path={`${props.match.url}${StaticConstatns.RoutePaths.SignUp}`}
        render={() => <SignUpComponent {...props} />}></Route>
      <Route exact path={`${props.match.url}${StaticConstatns.RoutePaths.AccountVerify}`}
        render={() => <AccountVerificationComponent {...props} />}></Route>
      <Route exact path={`${props.match.url}${StaticConstatns.RoutePaths.EmailConfirmation}`}
        render={() => <EmailConfirmationComponent {...props} />}></Route>
      <Route exact path={`${props.match.url}${StaticConstatns.RoutePaths.Home}*`}
        render={() => <MainApp {...props} />}></Route>
      {/* <Route path="*" render={() => <MainApp {...props} match={{ url: "/" }} />} /> */}
    </Switch>
  );
}

const OpenRoutes = (props) => {
  return (
    <Switch>
      <Route exact path={`${props.match.url}${StaticConstatns.RoutePaths.Login}`}
        render={() => <LoginComponent {...props} />}></Route>
      <Route exact path={`${props.match.url}${StaticConstatns.RoutePaths.SignUp}`}
        render={() => <SignUpComponent {...props} />}></Route>
      <Route exact path={`${props.match.url}${StaticConstatns.RoutePaths.AccountVerify}`}
        render={() => <AccountVerificationComponent {...props} />}></Route>
      <Route exact path={`${props.match.url}${StaticConstatns.RoutePaths.EmailConfirmation}`}
        render={() => <EmailConfirmationComponent {...props} />}></Route>
      <OldThemeRoutes {...props} />
      <Route path="*" render={() => <NoMatchComponent {...props} />} />
    </Switch>
  );
}

class ThemeImplementedRoutes extends BaseComponent {

  render() {
    let redirectToLogin = () => <Redirect to={this.getLink(this.constants.RoutePaths.Login)} />
    return (
      <div className="gx-main-content-wrapper">
        <Switch>
      <Route exact path={`${this.props.match.url}${StaticConstatns.RoutePaths.ContactUs}`}
        render={() => <ContactUsComponent {...this.props} />}></Route>
          <Route path={`${this.props.match.url}/exchange/trade`}
            render={() => {
              if (!this.props.globals.isLoggedIn) {
                return redirectToLogin();
              }
              return <TradeComponent {...this.props as any} match={{ url: `${this.props.match.url}/trade` }}/>
            }} />
          <Route path={`${this.props.match.url}/funding`}
            
            render={() => {
              if (!this.props.globals.isLoggedIn) {
                return redirectToLogin();
              }
              return <FundingComponent {...this.props as any} match={{ url: `${this.props.match.url}/funding` }}/>
            }} />
          <Route path={`${this.props.match.url}/`}
            render={() => <HomeComponent {...this.props} />} />
        </Switch>
      </div>
    );
  }
}

export { OpenRoutes, RestrictedRoutes, ThemeImplementedRoutes };