import { BaseComponent } from "./BaseComponent";
import React = require("react");
import { StaticHelper } from "../../../shared/static-helper";
import { Constants } from "../../../shared/constants";
import NotFoundComponent from "../not-found/NotFoundComponent";
import history from '../../../shared/history';

export default class NoMatchComponent extends BaseComponent {
    render() {
        return this.loadNotFoundComponent ? (<NotFoundComponent {...this.props} />) : null;
    }

    loadNotFoundComponent: boolean;
    constructor(props) {
        super(props);
        let defaultLangKey = "en";
        let loc = location.pathname.split('/');
        let langKeys = StaticHelper.objectToValuesArray(Constants.Instance.LanguageKey);
        if (loc.length < 2) {
            loc = ["", defaultLangKey];
        }
        else {
            if (langKeys.indexOf(loc[1]) < 0) {
                loc = ["", defaultLangKey, ...loc.slice(1)];
            }
        }
        if (location.pathname != loc.join("/")) {
            history.push(loc.join("/"));
            this.loadNotFoundComponent = false;
            return;
            // location.replace(loc.join("/"));
            // location.href = loc.join("/");
        }
        this.loadNotFoundComponent = true;
    }
}
