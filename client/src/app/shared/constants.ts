export class Constants{
    static BaseURL:string = "http://localhost:1337/";
    static ResponseMessageTimeout = 4;//in seconds
    static RecaptchaSiteKey = "6Lfab3YUAAAAANbb2Lp1WYVMiwyUSCLyeZkbw5HK";
    static MaxScale = 10;
    static Float = Math.pow(10, Constants.MaxScale);
    static MaxScaleToAvoidScientificNotation = 6;
    static MinScaleForClientInput = 2;
    public static Regex = {
        MustStartWithSmallLetter: "(?=^[a-z]+)",
        MustStartWithCapitalLetter: "(?=^[A-Z]+)",
        MustStartWithLetter: "(?=^[a-zA-Z]+)",
        MustBeAlphaNumeric: "(?=^[a-zA-Z0-9_]+$)",
        MustBeAlphaNumericSmallLetters: "(?=^[a-z0-9_]+$)",
        MinLength: `(?=^.{{0},}$)`,
        MaxLength: `(?=^.{,{0}}$)`,
        RangeLength: `(?=^.{{0},{1}}$)`,
        MustContainSmallLetter: '(?=.*[a-z])',
        MustContainCapitalLetter: '(?=.*[A-Z])',
        MustContainNumber: '(?=.*[0-9])',
        MustContainSpecialChar: '(?=.*[!@#\$%\^&\*_])',
        CannotHaveSpace: '(?=^\\S*$)',
    }
    public static EndPoints = {
        PostContactUs: "contactUs/contactUs",
        PostAccountRegister: "account/register",
        PostAuthLogin: "auth/login",
        GetSendSignUpVerificationEmail: "account/sendSignUpVerificationEmail",
        PostAccountVerify: "account/verify",
        GetAuthUser: "auth/user",
        GetLogout: "auth/logout",
        PostTradeCurrencyPairs: "trade/currencyPairs",
        PostOrder: "trade/order",
        PostPairDetails: "trade/pairDetails",
        PostOrderHistory: "trade/orderHistory",
    }
    public static GrantTypes = {
        Password: "password",
        RefreshToken: "refresh_token",
    }
    public static LanguageKey = {
        ENUS: 'en-us',
    }
    public static RoutePaths = {
        Login: "account/login",
        Home: "",
        Trade: "trade",
        SignUp: "account/signUp",
        ContactUs: "help/contactUs",
        EmailConfirmation: "account/emailConfirmation",
        AccountVerify: "account/verify",
        AccountForgotPassword: "account/forgotPassword",
    }
    public static QueryParams = {
        email: "email",
        redirectURI: "redirectURI",
        key: "key",
    }
    public static RecordStatus = {
        Active: 1,
        Deleted: 2,
        PendingVerification: 3,
    }
    public static Order = {
        Type: {
            limit: 1,
            market: 2,
        },
        Action: {
            buy: 1,
            sell: 2,
        },
        RecordStatus: {
            open: 1,
            cancelled: 2,
            partially_completed: 3,
            completed: 4,
        }
    }
}