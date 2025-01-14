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

  BaseURL: string =
    process.env.NODE_ENV === "production"
      ? "https://api.bitvelocity.io"
      : "http://localhost:1337";
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
  PhoneNumberVerificationCodeLength = 6;
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
    PostAuthLogin: "/user/login",
    PostEnableTwoFA: "/user/enableTwoFA",
    PostDisableTwoFA: "/user/disableTwoFA",
    GetAuthUser: "/user/user",
    GetLogout: "/user/logout",
    GetCodeForTwoFA: "/user/codeForTwoFA",
    PostProfilePicture: "/user/profilePicture",
    GetUserPreferences: "/user/userPreferences",
    PostSavePreferences: "/user/saveUserPreferences",
    GetUserPhoneNumber: "/user/getPhoneNumber",
    PostSaveUserPhoneNumber: "/user/saveUserPhoneNumber",
    PostResendSMSVerificationCode: "/user/resendSMSVerificationCode",
    PostVerifyPhoneNumberSMSCode: "/user/verifyPhoneNumberSMSCode",
    GetSendSignUpVerificationEmail: "/account/sendSignUpVerificationEmail",
    PostAccountVerify: "/account/verify",
    PostAccountForgotPassword: "/account/forgotPassword",
    PostAccountUpdatePassword: "/account/updatePassword",
    PostAccountChangePassword: "/account/changePassword",
    PostAccountPasswordRecoveryToken: "/account/verifyPasswordRecoveryToken",
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
    Terms: string;
    Privacy: string;

    Travel: string;
    RealEstate: string;
    Support: string;
    InvestorsZone: string;
    KnowledgeBase: string;
    Market: string;
    Trading: string;
    STO: string;
    FAQ: string;
    AboutUs: string;
    OurFees: string;
    Security: string;
    Investing: string;

    Login: string;
    Home: string;
    Trade: string;
    SignUp: string;
    ContactUs: string;
    EmailConfirmation: string;
    AccountVerify: string;
    MyAccount: string;
    Verification: string;
    MyAccountVerification: string;
    MyAccountVerificationProofs: string;
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
    MyAccountVerificationProofsIdentity: string;
    Address: string;
    MyAccountVerificationProofsAddress: string;
    Income: string;
    MyAccountVerificationProofsIncome: string;
    Preferences: string;
    MyAccountPreferences: string;
    Account: string;
    MyAccountAccount: string;
    constructor() {
      this.Account = "/account";
      this.Home = "";
      this.Login = this.Account + "/login";
      this.Trade = "/exchange/trade";
      this.SignUp = this.Account + "/signUp";
      this.ContactUs = "/help/contactUs";
      this.EmailConfirmation = this.Account + "/emailConfirmation";
      this.AccountVerify = this.Account + "/verify";
      this.MyAccount = "/myAccount";
      this.Verification = "/verification";
      this.Proofs = "/proofs";
      this.Identity = "/identity";
      this.Address = "/address";
      this.Income = "/income";
      this.MyAccountVerification = this.MyAccount + this.Verification;
      this.MyAccountVerificationProofs =
        this.MyAccountVerification + this.Proofs;
      this.MyAccountVerificationProofsIdentity =
        this.MyAccountVerificationProofs + this.Identity;
      this.MyAccountVerificationProofsAddress =
        this.MyAccountVerificationProofs + this.Address;
      this.MyAccountVerificationProofsIncome =
        this.MyAccountVerificationProofs + this.Income;
      this.AccountForgotPassword = this.Account + "/forgotPassword";
      this.AccountPasswordRecovery = this.Account + "/passwordRecovery";
      this.Consulting = "https://consulting.bitvelocity.io";
      this.Funding = "/funding";
      this.Deposit = "/deposit";
      this.Withdrawal = "/withdrawal";
      this.FundingDeposit = this.Funding + this.Deposit;
      this.FundingWithdrawal = this.Funding + this.Withdrawal;

      this.InvestorsZone = "/invesotrsZone";
      this.Security = "/security";
      this.Travel = "/blockchain/travel";
      this.RealEstate = "/blockchain/realEstate";
      this.Support = "/support";
      this.Market = "/market";
      this.Trading = "/tradeDemo";
      this.KnowledgeBase = "/help/knowledgeBase";
      this.AboutUs = "/help/about";
      this.FAQ = "/help/faq";
      this.OurFees = "/fees";
      this.STO = "/sto";
      this.Terms = "/legal/terms";
      this.Privacy = "/legal/privacy";
      this.Preferences = "/preferences";
      this.MyAccountPreferences = this.MyAccount + this.Preferences;
      this.MyAccountAccount = this.MyAccount + this.Account;
    }
  })();
  public static RecaptchaSiteKey = "6Lfab3YUAAAAANbb2Lp1WYVMiwyUSCLyeZkbw5HK";
}
