export class Constants {
  private static _instance: Constants;
  public static getInstance() {
    if (!this._instance) {
      this._instance = new Constants();
    }
    return this._instance;
  }
  private constructor() {}

  static get Instance(): Constants {
    return this.getInstance();
  }

  BaseURL: string = "http://localhost:1337"; //"https://api.bitvelocity.io"; //"http://localhost:1337";
  IsDev: boolean = this.BaseURL == "https://api.bitvelocity.io" ? false : true;
  SocketURL: string = "/stream";
  ResponseMessageTimeout = 4; //in seconds
  RecaptchaSiteKey = StaticConstants.RecaptchaSiteKey;
  MaxScale = 10;
  Float = Math.pow(10, this.MaxScale);
  MaxScaleToAvoidScientificNotation = 6;
  MinScaleForClientInput = 2;
  DefaultValue = "|1|";
  LoadBriefHistoryTimeout = 15 * 1000; //15 seconds
  DefaultDateFormat = "DD/MM/YYYY";
  SmallLetters = "a-z";
  CapitalLetters = "A-Z";
  SpecialChars = "!@#$%^&*_";
  Numbers = "0-9";
  MaxFileUploadSize = 5; //5 mb
  public Regex = {
    MustStartWithSmallLetter: "(?=^[a-z]+)",
    MustStartWithCapitalLetter: "(?=^[A-Z]+)",
    MustStartWithLetter: "(?=^[a-zA-Z]+)",
    MustBeAlphaNumeric: "(?=^[a-zA-Z0-9_]+$)",
    MustBeAlphaNumericSmallLetters: "(?=^[a-z0-9_]+$)",
    MinLength: `(?=^.{{0},}$)`,
    MaxLength: `(?=^.{,{0}}$)`,
    RangeLength: `(?=^.{{0},{1}}$)`,
    MustContainSmallLetter: "(?=.*[" + this.SmallLetters + "])",
    MustContainCapitalLetter: "(?=.*[" + this.CapitalLetters + "])",
    MustContainNumber: "(?=.*[" + this.Numbers + "])",
    MustContainSpecialChar: "(?=.*[" + this.SpecialChars + "])",
    CannotHaveSpace: "(?=^\\S*$)",
    NumberWithDecimal: "[0-9]"
  };
  public EndPoints = {
    PostContactUs: "/contactUs/contactUs",
    PostAccountRegister: "/account/register",
    PostAuthLogin: "/auth/login",
    GetSendSignUpVerificationEmail: "/account/sendSignUpVerificationEmail",
    PostAccountVerify: "/account/verify",
    PostAccountForgotPassword: "/account/forgotPassword",
    PostAccountUpdatePassword: "/account/updatePassword",
    PostAccountPasswordRecoveryToken: "/account/verifyPasswordRecoveryToken",
    GetAuthUser: "/auth/user",
    GetLogout: "/auth/logout",
    GetCurrenciesCurrencyPairs: "/currencies/currencyPairs",
    GetTradeBriefRecentHistory: "/trade/briefRecentHistory",
    PostOrder: "/trade/order",
    PostPairDetails: "/trade/pairDetails",
    PostGetTrades: "/trade/getTrades",
    PostOrderHistory: "/trade/orderHistory",
    GetDepositableCurrencies: "/currencies/depositableCurrencies",
    GetWithdrawableCurrencies: "/currencies/withdrawableCurrencies",
    GetWithdrawalPreRequisites: "/withdrawal/preRequisites",
    PostDepositMethods: "/deposit/depositMethods",
    PostDepositRequest: "/deposit/depositRequest",
    PostDepositRequestHistory: "/deposit/depositRequestHistory",
    PostDepositReceipt: "/deposit/receipt",
    PostWithdrawalRequestHistory: "/withdrawal/withdrawalRequestHistory",
    PostSaveWithdrawalRequest: "/withdrawal/saveWithdrawalRequest",
    GetUserBankAccounts: "/bankAccounts/userBankAccounts",
    PostSaveBankAccount: "/bankAccounts/saveBankAccount",
    GetStreamSocket: "/stream",
    GetCountries: "/data/countries",
    PostProfilePicture: "/auth/profilePicture",
    PostKYCSaveDocuments: "/kyc/saveDocuments",
    GetKYCProofsSummary: "/kyc/proofsSummary",
    PostKYCDocumentHistory: "/kyc/documentHistory",
    PostDigitalEvidence: "/digitalEvidence?type="
  };
  public GrantTypes = {
    Password: "password",
    RefreshToken: "refresh_token"
  };
  public LanguageKey = {
    ENUS: "en",
    DE: "de"
  };
  CookieKeys = {
    LangKey: "langKey"
  };
  DefaultLangKey = this.LanguageKey.ENUS;
  public NonHeaderRoutePaths = [StaticConstants.RoutePaths.Consulting];
  public NonFooterRoutePaths = [StaticConstants.RoutePaths.Consulting];
  public RoutePaths = StaticConstants.RoutePaths;
  public Ids = StaticConstants.Ids;
  public QueryParams = {
    email: "email",
    redirectURI: "redirectURI",
    key: "key",
    aType: "atype"
  };
  public RecordStatus = {
    Active: 1,
    Deleted: 2,
    PendingVerification: 3
  };
  public Order = {
    Type: {
      limit: 1,
      market: 2
    },
    Action: {
      buy: 1,
      sell: 2
    },
    RecordStatus: {
      open: 1,
      cancelled: 2,
      partially_completed: 3,
      completed: 4
    }
  };
  RedirectToLoginMessages = [
    "Invalid token: access token is invalid".toUpperCase(),
    "Unauthorized request: no authentication given".toUpperCase()
  ];
}

export class StaticConstants {
  static Ids = {
    HowItWorks: "how-it-works",
    OurFees: "our-fees"
  };
  public static RoutePaths = new (class {
    Login: string;
    Home: string;
    Trade: string;
    SignUp: string;
    ContactUs: string;
    EmailConfirmation: string;
    AccountVerify: string;
    MyAccount: string;
    Verification: string;
    AccountVerification: string;
    AccountVerificationProofs: string;
    AccountForgotPassword: string;
    AccountPasswordRecovery: string;
    Consulting: string;
    Funding: string;
    Deposit: string;
    FundingDeposit: string;
    Withdrawal: string;
    FundingWithdrawal: string;
    Proofs: string;
    Identity: string;
    AccountVerificationProofsIdentity: string;
    Address: string;
    AccountVerificationProofsAddress: string;
    Income: string;
    AccountVerificationProofsIncome: string;
    constructor() {
      this.Home = "";
      this.Login = "/account/login";
      this.Trade = "/exchange/trade";
      this.SignUp = "/account/signUp";
      this.ContactUs = "/help/contactUs";
      this.EmailConfirmation = "/account/emailConfirmation";
      this.AccountVerify = "/account/verify";
      this.MyAccount = "/account";
      this.Verification = "/verification";
      this.Proofs = "/proofs";
      this.Identity = "/identity";
      this.Address = "/address";
      this.Income = "/income";
      this.AccountVerification = "/account" + this.Verification;
      this.AccountVerificationProofs = this.AccountVerification + this.Proofs;
      this.AccountVerificationProofsIdentity =
        this.AccountVerificationProofs + this.Identity;
      this.AccountVerificationProofsAddress =
        this.AccountVerificationProofs + this.Address;
      this.AccountVerificationProofsIncome =
        this.AccountVerificationProofs + this.Income;
      this.AccountForgotPassword = "/account/forgotPassword";
      this.AccountPasswordRecovery = "/account/passwordRecovery";
      this.Consulting = "https://consulting.bitvelocity.io";
      this.Funding = "/funding";
      this.Deposit = "/deposit";
      this.Withdrawal = "/withdrawal";
      this.FundingDeposit = this.Funding + this.Deposit;
      this.FundingWithdrawal = this.Funding + this.Withdrawal;
    }
  })();
  public static RecaptchaSiteKey = "6Lfab3YUAAAAANbb2Lp1WYVMiwyUSCLyeZkbw5HK";
}
