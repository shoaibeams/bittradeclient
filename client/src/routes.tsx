import * as React from 'react';
import { Route } from "react-router";
import { StaticConstatns } from "./shared/constants";
import { App } from "./containers/App";
import ContactUsComponent from "./app/components/contact-us/ContactUsComponent";

const AppRoutes = (props) => {
    return (
        <>
            <Route exact path={StaticConstatns.RoutePaths.Trade}
                render={() => <App {...props} />}></Route>
            <Route exact path={StaticConstatns.RoutePaths.Funding}
                render={() => <App {...props} />}></Route>
            <Route exact path={StaticConstatns.RoutePaths.Consulting}
                render={() => <App {...props} />}></Route>
            <Route exact path={StaticConstatns.RoutePaths.ContactUs}
                render={() => <ContactUsComponent {...props} />}></Route>
            <Route exact path={StaticConstatns.RoutePaths.Login}
                render={() => <App {...props} />}></Route>
            <Route exact path={StaticConstatns.RoutePaths.SignUp}
                render={() => <App {...props} />}></Route>
            <Route exact path={StaticConstatns.RoutePaths.EmailConfirmation}
                render={() => <App {...props} />}></Route>
            <Route exact path={StaticConstatns.RoutePaths.AccountVerify}
                render={() => <App {...props} />}></Route>
        </>
    );
}
export default AppRoutes;