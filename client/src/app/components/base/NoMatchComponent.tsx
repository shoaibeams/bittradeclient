import { BaseComponent } from "./BaseComponent";
import * as React from "react";
import { StaticHelper } from "../../../shared/static-helper";
import { Constants } from "../../../shared/constants";
import history from '../../../shared/history';
import NotFoundComponent from "../not-found/NotFoundComponent";

export default class NoMatchComponent extends BaseComponent {
    render() {
        return this.loadNotFoundComponent ? (<NotFoundComponent {...this.props} />) : null;
    }

    loadNotFoundComponent: boolean;
    constructor(props) {
        super(props);
        let loc = location.pathname.split('/');
        let langKeys = StaticHelper.objectToValuesArray(Constants.Instance.LanguageKey);
        if (loc.length < 2) {
            loc = ["", this.g.langKey];
        }
        else {
            if (langKeys.indexOf(loc[1]) > -1) {
                loc = ["", loc[1], ...loc.slice(2)];
            }
            else
            {
                loc = ["", this.g.langKey, ...loc.slice(2)];
            }
        }
        if (location.pathname != loc.join("/")) {
            history.push(loc.join("/") + location.search);
            this.loadNotFoundComponent = false;
            return;
            // location.replace(loc.join("/"));
            // location.href = loc.join("/");
        }
        this.loadNotFoundComponent = true;
    }
}
