import * as React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { updateGlobalProperty, updateGlobalInstance } from "../store/actions/globals.actions";
import { LanguageBase } from "../shared/language";
import { Constants, StaticConstatns } from "../shared/constants";

import { MainHeaderComponent } from "../app/components/main-header/MainHeaderComponet";
import { ClipLoaderComponent } from "../thirdparty/ClipLoaderComponent";
import { mdProps } from "../models/props";
import { mdCallResponse } from "../models/call-response";
import { StaticHelper } from "../shared/static-helper";
import * as Enums from "../enums/general";
import { BaseComponent } from "../app/components/BaseComponent";
import AppRoutes from "../routes";
import { MainFooterHTML } from "../app/components/main-footer/MainFooterHTML";
import LoggerService from "../shared/logger";
import HttpClientService from "../shared/http-client.service";

export class App extends BaseComponent {

    checkedLogin: boolean = false;
    render() {
        return (
            <Router>
                <>
                    <ClipLoaderComponent globals={this.props.globals} />
                    <MainHeaderComponent globals={this.props.globals}/>
                    {AppRoutes(this.props)}
                    <MainFooterHTML globals={this.props.globals}/>
                </>
            </Router>
        );
    }

    localProps: mdProps;
    constructor(props: any) {
        super(props);
        this.lang = LanguageBase.getLanguage(Constants.Instance.LanguageKey.ENUS);
        global.lang = this.lang;
        this.checkUser();
        this.loadCurrencyPairs();
    }

    checkUser() {
        if (window.location.href.indexOf(this.constants.RoutePaths.AccountVerify) == -1) {
            this.props.globals.showMainLoader = true;
            this.props.updateGlobals(this.props.globals);
            this.http.get<mdCallResponse>(this.constants.EndPoints.GetAuthUser).then((res: mdCallResponse) => {
                this.props.globals.showMainLoader = false;
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
                    StaticHelper.navigateToLogin(this.props.history);
                    // this.router.navigateByUrl(this.constants.RoutePaths.Login + "?" + this.constants.QueryParams.redirectURI + "=" + window.location.href, { skipLocationChange: false });
                    // window.location.href = this.constants.RoutePaths.Login + "?" + this.constants.QueryParams.redirectURI + "=" + window.location.href;
                    //a user was logged in but now token has expired
                }
                this.log.info("isLoggedIn: " + this.props.globals.isLoggedIn, res);
                this.checkedLogin = true;
                this.props.updateGlobals(this.props.globals);
            }).catch(error => {
                this.log.debug(error);
                this.props.globals.showMainLoader = false;
                this.props.globals.isLoggedIn = false;
                this.checkedLogin = true;
                this.props.updateGlobals(this.props.globals);
            });
        }
        else {
            this.props.globals.isLoggedIn = false;
            this.checkedLogin = true;
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
                let cpList = res.extras.currencyPairs.filter(m => m.res.extras.defaultCurrencyPair);
                if(cpList.length > 0)
                {
                    this.props.globals.selectedCurrencyPair = cpList[0];
                }
            }
            this.props.updateGlobals(this.props.globals);

        }).catch(error => {
            this.log.debug(error);
        });
    }

    loadbriefHistory() {
        if(this.isNullOrEmpty(this.props.globals.currencyPairs))
        {
            this.loadCurrencyPairs();
            return;
        }
        this.http.get(this.constants.EndPoints.GetTradeBriefRecentHistory).then((res:mdCallResponse) => {
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

                    this.props.updateGlobalProperty(global.propKeys.briefHistory, history);
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

}

const mapStateToProps = (state) => {
    return {
        globals: state.globals
    }
    return {
        isLoggedIn: state.globalProps,
        showMainLoader: state.globalProps,
        username: state.globalProps,
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