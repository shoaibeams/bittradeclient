import * as React from "react";
import { connect } from "react-redux";
import { Router } from "react-router-dom";

import { updateGlobalProperty, updateGlobalInstance } from "../store/actions/globals.actions";
import { Constants, StaticConstatns } from "../shared/constants";

import { MainHeaderComponent } from "../app/components/main-header/MainHeaderComponet";
import { ClipLoaderComponent } from "../thirdparty/ClipLoaderComponent";
import { mdProps } from "../models/props";
import { mdCallResponse } from "../models/call-response";
import { StaticHelper } from "../shared/static-helper";
import * as Enums from "../enums/general";
import { BaseComponent } from "../app/components/base/BaseComponent";
import AppRoutes from "../routes";
import { MainFooterHTML } from "../app/components/main-footer/MainFooterHTML";
import history from '../shared/history';
import { getLanguage } from "../language/language";
import { CookieHelper } from "../shared/cookie-heler";

class App extends BaseComponent {

    render() {
        this.initShorts();
        return this.state.checkedLogin ? (
            this.isNullOrEmpty(this.g.langKey) ? null :
            <Router history={history}>
                <>
                    <ClipLoaderComponent {...this.props} />
                    <MainHeaderComponent {...this.props} />
                    {AppRoutes(this.props)}
                    <MainFooterHTML {...this.props} />
                </>
            </Router>
        ) : (null)

    }

    localProps: mdProps;

    constructor(props: any) {
        super(props);
        // console.log(this.parsedLocation);
        this.state = {
            checkedLogin: false,
        }
        this.detectLanguage();
        this.checkUser();
        this.loadCurrencyPairs();
    }

    getLangKey() {
        let langKeys = StaticHelper.objectToValuesArray(Constants.Instance.LanguageKey);
        let langKey = "";
        let splittedPath = location.pathname.split('/');
        if (splittedPath.length > 1) {
            let index = langKeys.indexOf(splittedPath[1]);
            if (index > -1) {
                langKey = langKeys[index];
            }
        }
        return langKey;
    }

    checkUser() {
        if (window.location.href.indexOf(this.constants.RoutePaths.AccountVerify) == -1) {
            this.props.globals.showMainLoader = true;
            this.props.updateGlobals(this.props.globals);
            this.http.get<mdCallResponse>(this.constants.EndPoints.GetAuthUser).then((res: mdCallResponse) => {
                this.props.globals.showMainLoader = false;
                this.updateState({
                    checkedLogin: true
                })
                if (res.isSuccess) {
                    //a user is logged in
                    if (res.extras.status == this.constants.RecordStatus.PendingVerification) {
                        //email is not verified of the user
                        this.props.globals.isLoggedIn = false;
                    }
                    else {
                        this.props.globals.isLoggedIn = true;
                    }

                    if (window.location.href.indexOf(this.constants.RoutePaths.Login) > -1) {
                        this.props.history.push(this.constants.RoutePaths.Trade);
                    }
                    this.props.globals.username = res.extras.username;
                }
                else {
                    this.props.globals.isLoggedIn = false;
                }
                if (res.extras == true) {
                    this.props.globals.username = res.extras.username;
                    this.navigateToLogin();
                    // this.router.navigateByUrl(this.constants.RoutePaths.Login + "?" + this.constants.QueryParams.redirectURI + "=" + window.location.href, { skipLocationChange: false });
                    // window.location.href = this.constants.RoutePaths.Login + "?" + this.constants.QueryParams.redirectURI + "=" + window.location.href;
                    //a user was logged in but now token has expired
                }
                this.log.info("isLoggedIn: " + this.props.globals.isLoggedIn, res);
                this.props.updateGlobals(this.props.globals);
            }).catch(error => {
                this.log.debug(error);
                this.props.globals.showMainLoader = false;
                this.props.globals.isLoggedIn = false;
                this.props.updateGlobals(this.props.globals);
                this.updateState({
                    checkedLogin: true
                })
            });
        }
        else {
            this.props.globals.isLoggedIn = false;
            this.state = {
                ...this.state,
                checkedLogin: true,
            }
            this.props.updateGlobals(this.props.globals);
        }
    }

    loadCurrencyPairs() {
        this.http.get(this.constants.EndPoints.GetCurrenciesCurrencyPairs).then((res: mdCallResponse) => {
            this.loadbriefHistory();
            this.log.debug(res);
            if (res.isSuccess) {
                this.props.globals.currencyPairs = res.extras.currencyPairs;
                this.props.globals.defaultCurrencyPairId = res.extras.defaultCurrencyPair;
                this.props.globals.defaultBuyFee = res.extras.defaultBuyFee;
                this.props.globals.defaultSellFee = res.extras.defaultSellFee;
                let cpList = res.extras.currencyPairs.filter(m => m.id == res.extras.defaultCurrencyPair);
                if (cpList.length > 0) {
                    this.props.globals.selectedCurrencyPair = cpList[0];
                }
            }
            this.props.updateGlobals(this.props.globals);

        }).catch(error => {
            this.log.debug(error);
        });
    }

    loadbriefHistory() {
        if (this.isNullOrEmpty(this.props.globals.currencyPairs)) {
            this.loadCurrencyPairs();
            return;
        }
        this.http.get(this.constants.EndPoints.GetTradeBriefRecentHistory).then((res: mdCallResponse) => {
            this.log.debug(res);
            if (res.isSuccess) {
                if (res.extras.briefHistory) {
                    let history = res.extras.briefHistory;
                    for (let i = 0; i < history.length; i++) {
                        let cp = this.props.globals.currencyPairs.filter(m => m.id == history[i].id)[0];
                        history[i].current_buy = StaticHelper.roundNumber(history[i].last + (history[i].last * (cp.buy_fee / 100)), cp.tcd_scale);
                        history[i].current_sell = StaticHelper.roundNumber(history[i].last - (history[i].last * (cp.sell_fee / 100)), cp.tcd_scale);
                        history[i] = StaticHelper.copyProp(cp, history[i]);
                    }
                    // this.props.updateGlobalProperty(global.propKeys.briefHistory, history);
                    let selectedBriefHistory = history.filter(m => m.id == this.props.globals.selectedCurrencyPair.id)[0];
                    // this.props.updateGlobalProperty(global.propKeys.selectedBriefHistory, selectedBriefHistory);
                    this.props.updateGlobals({
                        ...this.props.globals,
                        briefHistory: history,
                        selectedBriefHistory: selectedBriefHistory,
                    })
                    this.props.globals.selectedBriefHistory = selectedBriefHistory
                    // this.props.globals.briefHistory = history;


                }
            }
            setTimeout(() => {
                this.loadbriefHistory();
            }, 15 * 1000);
        }).catch(error => {
            this.log.debug(error);
            setTimeout(() => {
                this.loadbriefHistory();
            }, 10 * 1000);
        });
    }

    loadLanguage(langKey) {
        if(this.isNullOrEmpty(langKey))
        {
            langKey = this.constants.DefaultLangKey;
        }
        this.lang = getLanguage(langKey);
        global.lang = this.lang;
    }

    detectLanguage() {
        let lkey: string;
        let loc = location.pathname.split('/');
        let langKeys = StaticHelper.objectToValuesArray(Constants.Instance.LanguageKey);
        if (loc.length > 1) {
            if (langKeys.indexOf(loc[1]) > -1) {
                lkey = loc[1];
            }
        }
        if (this.isNullOrEmpty(lkey)) {
            lkey = CookieHelper.get(this.constants.CookieKeys.LangKey);
        }
        if (this.isNullOrEmpty(lkey)) {
            this.http.get<mdCallResponse>("").then((res: mdCallResponse) => {
                let isdefault = false;
                if (!res.isSuccess) {
                    isdefault = true;
                }
                else
                    if (!res.extras) {
                        isdefault = true;
                    }
                    else {
                        let langHeader = res.extras["accept-language"];
                        if (!langHeader) {
                            isdefault = true;
                        }
                        else {
                            let lkeys = langHeader.split(',');
                            for(let i = 0; i < lkeys.length; i++)
                            {
                                let k = lkeys[i];
                                if (k.indexOf(";") > -1) {
                                    k = k.split(';')[0];
                                }
                                if (langKeys.indexOf(k) > -1) {
                                    lkey = k;
                                    break;
                                }
                            }
                            if (this.isNullOrEmpty(lkey)) {
                                isdefault = true;
                            }
                        }
                    }
                if (isdefault) {
                    lkey = this.constants.DefaultLangKey;
                }
                else {
                    if (langKeys.indexOf(lkey) < 0) {
                        lkey = this.constants.DefaultLangKey;
                    }
                    // CookieHelper.set(this.constants.CookieKeys.LangKey, this.langKey);
                }
                this.loadLanguage(lkey);
                this.props.updateGlobalProperty(global.propKeys.langKey, lkey);
                // this.updateState({langKey: lkey});
            })
        }
        else {
            
            this.loadLanguage(lkey);
            this.props.updateGlobalProperty(global.propKeys.langKey, lkey);
            // this.state = {
            //     langKey: lkey
            // }
        }
    }

}

const mapStateToProps = (state) => {
    return {
        globals: state.globals
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateGlobals: (instance) => {
            dispatch(updateGlobalInstance(instance));
        },
        updateGlobalProperty: (property, value) => {
            dispatch(updateGlobalProperty(property, value));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);