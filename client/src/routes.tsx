import * as React from 'react';
import { Route, Switch } from "react-router";

import { StaticConstatns, Constants } from "./shared/constants";
import { StaticHelper } from './shared/static-helper';
import asyncComponent from "./app/components/base/AsyncComponent"
import NoMatchComponent from './app/components/base/NoMatchComponent';

const ContactUsComponent = asyncComponent(() =>
    import('./app/components/contact-us/ContactUsComponent').then(module => module.default)
)
const HomeComponent = asyncComponent(() =>
    import('./app/components/home/HomeComponent').then(module => module.default)
)
const AccountVerificationComponent = asyncComponent(() =>
    import('./app/components/account/AccountVerificationComponent').then(module => module.default)
)
const EmailConfirmationComponent = asyncComponent(() =>
    import('./app/components/account/EmailConfirmationComponent').then(module => module.default)
)
const LoginComponent = asyncComponent(() =>
    import('./app/components/account/LoginComponent').then(module => module.default)
)
const SignUpComponent = asyncComponent(() =>
    import('./app/components/account/SignUpComponent').then(module => module.default)
)
const FragmentSupportingSwitch = asyncComponent(() =>
    import('./app/components/base/FragmentSupportingSwitch').then(module => module.default)
)
const FundingComponent = asyncComponent(() =>
    import('./modules/funding/FundingComponent').then(module => module.default)
)
const TradeComponent = asyncComponent(() =>
    import('./modules/trade/TradeComponent').then(module => module.default)
)

const getRoutesForLangKey = (langKey, props) => {
    return (
        <React.Fragment key={langKey}>
            <Route key={langKey + StaticConstatns.RoutePaths.Home}
                exact path={"/" + langKey + StaticConstatns.RoutePaths.Home}
                render={() => <HomeComponent {...props} />}></Route>
            <Route key={langKey + StaticConstatns.RoutePaths.Trade}
                exact path={"/" + langKey + StaticConstatns.RoutePaths.Trade}
                render={() => <TradeComponent {...props} />}></Route>
            <Route key={langKey + StaticConstatns.RoutePaths.Funding}
                exact path={"/" + langKey + StaticConstatns.RoutePaths.Funding}
                render={() => <FundingComponent {...props} />}></Route>
            <Route key={langKey + StaticConstatns.RoutePaths.Consulting}
                exact path={"/" + langKey + StaticConstatns.RoutePaths.Consulting}
                render={() => <HomeComponent {...props} />}></Route>
            <Route key={langKey + StaticConstatns.RoutePaths.ContactUs}
                exact path={"/" + langKey + StaticConstatns.RoutePaths.ContactUs}
                render={() => <ContactUsComponent {...props} />}></Route>
            <Route key={langKey + StaticConstatns.RoutePaths.Login}
                exact path={"/" + langKey + StaticConstatns.RoutePaths.Login}
                render={() => <LoginComponent {...props} />}></Route>
            <Route key={langKey + StaticConstatns.RoutePaths.SignUp}
                exact path={"/" + langKey + StaticConstatns.RoutePaths.SignUp}
                render={() => <SignUpComponent {...props} />}></Route>
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

const AppRoutes = (props) => {
    let langKeys = StaticHelper.objectToValuesArray(Constants.Instance.LanguageKey);
    return (
        <FragmentSupportingSwitch>
            {
                langKeys.map((k, i) => {
                    return getRoutesForLangKey(k, props);
                })
            }
            <Route path="*" render={() => <NoMatchComponent {...this.props} />} />
        </FragmentSupportingSwitch>
    );
}
export default AppRoutes;