import React, { Component } from "react";
import { connect } from "react-redux";
import URLSearchParams from 'url-search-params'
import { Redirect, Route, Switch, Router } from "react-router-dom";

import AppLocale from "../../lngProvider";
import { setInitUrl } from "../../appRedux/actions/Auth";
import { updateWindowWidth } from "../../appRedux/actions/Setting";
import { onLayoutTypeChange, onNavStyleChange, setThemeType } from "../../appRedux/actions/Setting";
import { NotificationContainer } from "react-notifications";

import {
  LAYOUT_TYPE_BOXED,
  LAYOUT_TYPE_FRAMED,
  LAYOUT_TYPE_FULL,
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL
} from "../../constants/ThemeSetting";
import { BaseComponent } from "../../app/components/base/BaseComponent";
import Socket from "../../shared/socket";
import { StaticHelper } from "../../shared/static-helper";
import { Constants } from "../../shared/constants";
import { mdCallResponse } from "../../models/call-response";
import { getLanguage } from "../../language/language";
import { CookieHelper } from "../../shared/cookie-heler";
import { updateGlobalInstance, updateGlobalProperty } from "../../store/actions/globals.actions";
import { ClipLoaderComponent } from "../../thirdparty/ClipLoaderComponent";
import NoMatchComponent from "../../app/components/base/NoMatchComponent";
import BVApp from "./BVApp";
import "../../assets/css/animate.css";
import "../../assets/css/general.less";
import { RestrictedRoutes } from "../../routes";

class App extends BaseComponent {

  langKeys = [];
  constructor(props) {
    super(props);
    this.state = {
      checkedLogin: false,
    }
    this.langKeys = StaticHelper.objectToValuesArray(Constants.Instance.LanguageKey);
    this.detectLanguage();
    this.checkUser();
    this.loadCurrencyPairs();
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateWidth);
  }

  componentUnMount() {
    window.removeEventListener("resize", this.updateWidth);
  }

  updateWidth = () => {
    this.props.updateWindowWidth(window.innerWidth);
  }

  initSocket() {
    Socket.Instance.connect(() => {
      this.log.debug("socket connected");
      // Socket.Instance.registerEvent("message", (e)=>{
      //     this.log.debug(e);
      // });
      // Socket.Instance.emitEvent("wait_email_verification", "wait_email_verification");
    });
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
      this.props.updateGlobalProperty(global.propKeys.showMainLoader, true);
      this.http.get<mdCallResponse>(this.constants.EndPoints.GetAuthUser).then((res: mdCallResponse) => {
        this.props.globals.showMainLoader = false;
        let isLoggedIn: boolean;
        if (res.isSuccess) {
          //a user is logged in
          if (res.extras.status == this.constants.RecordStatus.PendingVerification) {
            //email is not verified of the user
            isLoggedIn = false;
          }
          else {
            isLoggedIn = true;
          }

          if (window.location.href.indexOf(this.constants.RoutePaths.Login) > -1) {
            this.props.history.push(this.constants.RoutePaths.Trade);
          }
          this.initSocket();
        }
        else {
          isLoggedIn = false;
        }
        if (res.extras == true) {
          this.navigateToLogin();
          // this.router.navigateByUrl(this.constants.RoutePaths.Login + "?" + this.constants.QueryParams.redirectURI + "=" + window.location.href, { skipLocationChange: false });
          // window.location.href = this.constants.RoutePaths.Login + "?" + this.constants.QueryParams.redirectURI + "=" + window.location.href;
          //a user was logged in but now token has expired
        }
        this.log.info("isLoggedIn: " + isLoggedIn, res);
        let propKeys = [
          global.propKeys.isLoggedIn,
          global.propKeys.username,
          global.propKeys.fullName,
          global.propKeys.email
        ]
        let propValues = [
          isLoggedIn,
          res.extras.username,
          res.extras.fullName,
          res.extras.email
        ]
        this.props.updateGlobalProperty(propKeys, propValues);
        this.updateState({
          checkedLogin: true
        })
      }).catch(error => {
        this.log.debug(error);
        this.props.updateGlobalProperty([global.propKeys.showMainLoader, 
          global.propKeys.isLoggedIn], [false, false]);
        this.updateState({
          checkedLogin: true
        })
      });
    }
    else {
      this.state = {
        ...this.state,
        checkedLogin: true,
      }
      this.props.updateGlobalProperty(global.propKeys.isLoggedIn, false);
    }
  }

  loadCurrencyPairs() {
    this.http.get(this.constants.EndPoints.GetCurrenciesCurrencyPairs).then((res: mdCallResponse) => {
      this.log.debug(res);
      if (res.isSuccess) {
        let propKeys = [
          global.propKeys.currencies,
          global.propKeys.currencyPairs,
          global.propKeys.defaultCurrencyPairId,
          global.propKeys.defaultBuyFee,
          global.propKeys.defaultSellFee,
        ]
        let propValues = [
          res.extras.currencies,
          res.extras.currencyPairs,
          res.extras.defaultCurrencyPair,
          res.extras.defaultBuyFee,
          res.extras.defaultSellFee
        ]
        let cpList = res.extras.currencyPairs.filter(m => m.id == res.extras.defaultCurrencyPair);
        if (cpList.length > 0) {
          propKeys.push(global.propKeys.selectedCurrencyPair);
          propValues.push(cpList[0]);
        }
        this.props.updateGlobalProperty(propKeys, propValues);
        setTimeout(() => {
          this.loadbriefHistory();
        }, 200);
      }

    }).catch(error => {
      this.log.debug(error);
    });
  }

  loadbriefHistory() {
    // if (this.isNullOrEmpty(this.props.globals.currencyPairs)) {
    //   this.loadCurrencyPairs();
    //   return;
    // }
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
          let selectedBriefHistory = history.filter(m => m.id == this.props.globals.selectedCurrencyPair.id)[0];

          this.props.updateGlobalProperty([global.propKeys.briefHistory, 
            global.propKeys.selectedBriefHistory], [history, selectedBriefHistory]);


        }
      }
      setTimeout(() => {
        this.loadbriefHistory();
      }, this.constants.LoadBriefHistoryTimeout);
    }).catch(error => {
      this.log.debug(error);
      setTimeout(() => {
        this.loadbriefHistory();
      }, this.constants.LoadBriefHistoryTimeout);
    });
  }

  loadLanguage(langKey) {
    if (this.isNullOrEmpty(langKey)) {
      langKey = this.constants.DefaultLangKey;
    }
    this.lang = getLanguage(langKey);
    global.langKey = langKey;
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
      lkey = this.constants.DefaultLangKey;
      this.loadLanguage(lkey);
      this.props.updateGlobalProperty(global.propKeys.langKey, lkey);
      // this.http.get<mdCallResponse>("").then((res: mdCallResponse) => {
      //   let isdefault = false;
      //   if (!res.isSuccess) {
      //     isdefault = true;
      //   }
      //   else
      //     if (!res.extras) {
      //       isdefault = true;
      //     }
      //     else {
      //       let langHeader = res.extras["accept-language"];
      //       if (!langHeader) {
      //         isdefault = true;
      //       }
      //       else {
      //         let lkeys = langHeader.split(',');
      //         for (let i = 0; i < lkeys.length; i++) {
      //           let k = lkeys[i];
      //           if (k.indexOf(";") > -1) {
      //             k = k.split(';')[0];
      //           }
      //           if (langKeys.indexOf(k) > -1) {
      //             lkey = k;
      //             break;
      //           }
      //         }
      //         if (this.isNullOrEmpty(lkey)) {
      //           isdefault = true;
      //         }
      //       }
      //     }
      //   if (isdefault) {
      //     lkey = this.constants.DefaultLangKey;
      //   }
      //   else {
      //     if (langKeys.indexOf(lkey) < 0) {
      //       lkey = this.constants.DefaultLangKey;
      //     }
      //     // CookieHelper.set(this.constants.CookieKeys.LangKey, this.langKey);
      //   }
      //   this.loadLanguage(lkey);
      //   this.props.updateGlobalProperty(global.propKeys.langKey, lkey);
      //   // this.updateState({langKey: lkey});
      // })
    }
    else {

      this.loadLanguage(lkey);
      this.props.updateGlobalProperty(global.propKeys.langKey, lkey);
      // this.state = {
      //     langKey: lkey
      // }
    }
  }

  setLayoutType = (layoutType) => {
    if (layoutType === LAYOUT_TYPE_FULL) {
      document.body.classList.remove('boxed-layout');
      document.body.classList.remove('framed-layout');
      document.body.classList.add('full-layout');
    } else if (layoutType === LAYOUT_TYPE_BOXED) {
      document.body.classList.remove('full-layout');
      document.body.classList.remove('framed-layout');
      document.body.classList.add('boxed-layout');
    } else if (layoutType === LAYOUT_TYPE_FRAMED) {
      document.body.classList.remove('boxed-layout');
      document.body.classList.remove('full-layout');
      document.body.classList.add('framed-layout');
    }
  };

  setNavStyle = (navStyle) => {
    if (navStyle === NAV_STYLE_DEFAULT_HORIZONTAL ||
      navStyle === NAV_STYLE_DARK_HORIZONTAL ||
      navStyle === NAV_STYLE_INSIDE_HEADER_HORIZONTAL ||
      navStyle === NAV_STYLE_ABOVE_HEADER ||
      navStyle === NAV_STYLE_BELOW_HEADER) {
      document.body.classList.add('full-scroll');
      document.body.classList.add('horizontal-layout');
    } else {
      document.body.classList.remove('full-scroll');
      document.body.classList.remove('horizontal-layout');
    }
  };

  componentWillMount = () => {
    if ((this.props as any).initURL === '') {
      (this.props as any).setInitUrl((this.props as any).history.location.pathname);
    }
    const params = new URLSearchParams((this.props as any).location.search);

    if (params.has("theme")) {
      (this.props as any).setThemeType(params.get('theme'));
    }
    if (params.has("nav-style")) {
      (this.props as any).onNavStyleChange(params.get('nav-style'));
    }
    if (params.has("layout-type")) {
      (this.props as any).onLayoutTypeChange(params.get('layout-type'));
    }
  }

  render() {
    const { match, location, layoutType, navStyle, locale, authUser, initURL } = this.props as any;

    // if (location.pathname === '/') {
    //   if (authUser === null) {
    //     return (<Redirect to={'/signin'} />);
    //   } else if (initURL === '' || initURL === '/' || initURL === '/signin') {
    //     return (<Redirect to={'/main/dashboard/crypto'} />);
    //   } else {
    //     return (<Redirect to={initURL} />);
    //   }
    // }
    this.setLayoutType(layoutType);

    this.setNavStyle(navStyle);

    const currentAppLocale = AppLocale[locale.locale];
    this.initShorts();
    return this.state.checkedLogin && !this.isNullOrEmpty(this.g.langKey) ? (
      <>
        <ClipLoaderComponent {...this.props} />
        <Switch>
          {
            this.langKeys.map((k, i) => {
              if (k != this.constants.DefaultLangKey) {
                return <Route key={k} path={`/${k}`} render={() => <RestrictedRoutes {...this.props} match={{ url: "/" + k }} />} />
              }
            })
          }
          <Route key={this.constants.DefaultLangKey} path={`/`} render={() => <RestrictedRoutes {...this.props} match={{ url: "" }} />} />
          <Route path="*" render={() => <NoMatchComponent {...this.props} />} />
        </Switch>
        <NotificationContainer />
      </>
    ) : (null)

    // </Router>

    // return (
    //   // <LocaleProvider locale={currentAppLocale.antd}>
    //   //   <IntlProvider
    //   //     locale={currentAppLocale.locale}
    //   //     messages={currentAppLocale.messages}>
    //   //         <FragmentSupportingSwitch>
    //   //           <Route exact path='/signin' component={SignIn} />
    //   //           <Route exact path='/signup' component={SignUp} />
    //   //           <RestrictedRoute path={`${match.url}`} authUser={authUser}
    //   //             component={MainApp} />
    //   //         </FragmentSupportingSwitch>
    //   //   </IntlProvider>
    //   // </LocaleProvider>
    // )
  }
}

const mapStateToProps = ({ settings, auth, globals }) => {
  const { locale, navStyle, width, layoutType } = settings;
  const { authUser, initURL } = auth;
  return {
    locale, navStyle, layoutType, authUser, initURL, width,
    globals
  }
};
export default connect(mapStateToProps, {
  setInitUrl,
  setThemeType,
  onNavStyleChange,
  onLayoutTypeChange,
  updateWindowWidth,
  updateGlobals: updateGlobalInstance,
  updateGlobalProperty
})(App);