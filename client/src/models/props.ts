
export class mdProps{
    params?: any;
    history?: any;
    form?: any;
    globals?: mdGlobalProps;
    updateGlobals?: (instance: any) => any;
    updateGlobalProperty?: (property: string, value: any) => any;
    constructor(_params?: any)
    {
        if(_params)
        {
            this.params = _params;
        }
    }
}

export class mdGlobalProps{
    isLoggedIn: boolean;
    showMainLoader: boolean;
    username: string;
    currencyPairs:any[];
    selectedCurrencyPair: any;
    defaultCurrencyPairId: number;
    defaultBuyFee: number;
    defaultSellFee: number;
    // loadingCurrencies: boolean;
    briefHistory:any[];
    selectedBriefHistory: any;
    loadingBriefHistory:boolean;
    old?: mdGlobalProps;
    langKey: string;
}

export class mdPropKeys{
    isLoggedIn: string;
    showMainLoader: string;
    username: string;
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
    constructor()
    {
        this.isLoggedIn = "isLoggedIn";
        this.showMainLoader = "showMainLoader";
        this.username = "username";
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
    }
}