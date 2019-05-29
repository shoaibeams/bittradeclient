import { mdCurrency } from "./currency";
import { mdCurrencyPair } from "./currency-pair";
import { mdCountry } from "./country";
import { mdAuthUsers } from "./auth-users";
import { mdPreferences } from "./user-preference";

export class mdProps {
  params?: any;
  history?: any;
  form?: any;
  globals?: mdGlobalProps;
  initURL?: string;
  match?: any;
  updateGlobals?: (instance: any) => any;
  updateGlobalProperty?: (
    property: string | string[],
    value: any | any[]
  ) => any;
  setInitUrl?: (url: string) => any;
  setThemeType?: (type: string) => any;
  onNavStyleChange?: (style: string) => any;
  onLayoutTypeChange?: (layout: string) => any;
  userSignOut?: () => any;
  toggleCollapsedSideNav?: (params: boolean) => any;
  updateWindowWidth?: (params: number) => any;
  switchLanguage?: (lang: any) => any;
  constructor(_params?: any) {
    if (_params) {
      this.params = _params;
    }
  }
}

export class mdGlobalProps {
  isLoggedIn: boolean;
  showMainLoader: boolean;
  // username: string;
  currencies: mdCurrency[];
  currencyPairs: mdCurrencyPair[];
  selectedCurrencyPair: any;
  defaultCurrencyPairId: number;
  defaultBuyFee: number;
  defaultSellFee: number;
  // loadingCurrencies: boolean;
  briefHistory: any[];
  selectedBriefHistory: any;
  loadingBriefHistory: boolean;
  old?: mdGlobalProps;
  langKey: string;
  // fullName: string;
  // email: string;
  headerHeight: number;
  countries: mdCountry[];
  sessionExpiry: Date;
  sessionStartedOn: Date;
  lastLogon: Date;
  user: mdAuthUsers;
  preferences: mdPreferences;
  loginChecked: boolean;
}

export class mdPropKeys {
  isLoggedIn: string;
  showMainLoader: string;
  // username: string;
  currencies: string;
  currencyPairs: string;
  defaultCurrencyPairId: string;
  defaultBuyFee: string;
  defaultSellFee: string;
  // loadingCurrencies: string;
  selectedCurrencyPair: string;
  briefHistory: string;
  selectedBriefHistory: string;
  loadingBriefHistory: string;
  langKey: string;
  // fullName: string;
  // email: string;
  headerHeight: string;
  countries: string;
  sessionExpiry: string;
  sessionStartedOn: string;
  lastLogon: string;
  user: string;
  preferences: string;
  loginChecked: string;

  constructor() {
    this.isLoggedIn = "isLoggedIn";
    this.showMainLoader = "showMainLoader";
    // this.username = "username";
    this.currencyPairs = "currencyPairs";
    this.defaultCurrencyPairId = "defaultCurrencyPairId";
    this.defaultBuyFee = "defaultBuyFee";
    this.defaultSellFee = "defaultSellFee";
    // this.loadingCurrencies = "loadingCurrencies";
    this.selectedCurrencyPair = "selectedCurrencyPair";
    this.briefHistory = "briefHistory";
    this.selectedBriefHistory = "selectedBriefHistory";
    this.loadingBriefHistory = "loadingBriefHistory";
    this.langKey = "langKey";
    this.currencies = "currencies";
    // this.fullName = "fullName";
    // this.email = "email";
    this.headerHeight = "headerHeight";
    this.countries = "countries";
    this.sessionExpiry = "sessionExpiry";
    this.sessionStartedOn = "sessionStartedOn";
    this.lastLogon = "lastLogon";
    this.user = "user";
    this.preferences = "preferences";
    this.loginChecked = "loginChecked";
  }
}
