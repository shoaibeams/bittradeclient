import * as React from "react";
// import "../assets/css/bootstrap.css";
// import "../assets/css/nebular.default.css";
// import "../assets/css/easy-responsive-tabs.css";
// import "../assets/css/font-awesome.min.css";
// import "../assets/css/slick.css";
// import "../assets/css/styles.css";
// import "../assets/css/responsive.css";
// import "../assets/css/bootstrap-validationv4.css";
// import "../assets/css/general.css";
// import "../assets/css/toggle-switch.css";
import asyncComponent from "../app/components/base/AsyncComponent"
import { Route } from "react-router";
import { StaticConstatns } from "../shared/constants";

const MainFooterHTML = asyncComponent(() =>
    import('../app/components/main-footer/MainFooterHTML').then(module => module.default)
)

const MainHeaderComponent = asyncComponent(() =>
    import('../app/components/main-header/MainHeaderComponet').then(module => module.default)
)

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
const OldThemeRoutes = (props) => {
  return (
    <div style={{ overflow: 'auto', height: '100%' }}>
      <MainHeaderComponent {...props} />
      <Route exact path={`${props.match.url}`}//home
        render={() => <HomeComponent {...props} />}></Route>
      <Route exact path={`${props.match.url}${StaticConstatns.RoutePaths.ContactUs}`}
        render={() => <ContactUsComponent {...props} />}></Route>
      {/* <Route exact path={`${props.match.url}${StaticConstatns.RoutePaths.EmailConfirmation}`}
        render={() => <EmailConfirmationComponent {...props} />}></Route>
      <Route exact path={`${props.match.url}${StaticConstatns.RoutePaths.AccountVerify}`}
        render={() => <AccountVerificationComponent {...props} />}></Route> */}
      <MainFooterHTML {...props} />
    </div>
  );
}
export default OldThemeRoutes;