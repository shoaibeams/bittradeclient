import { Constants} from "../shared//constants";

export class LanguageBase {
    NameRequired: string;
    Name: string;
    EmailRequired: string;
    Email: string;
    ContactNo: string;
    ContactNoRequired: string;
    Message: string;
    MessageRequired: string;
    Submit: string;
    InvalidEmail: string;
    MaxLengthFormat: string;
    MaxLengthFormat2: string;
    RangeLengthFormat: string;
    RangeLengthFormat2: string;
    RequiredFormat: string;
    ErrorOccured: string;
    ErrorOccuredWhileValidationFormat: string;
    ErrorOccuredFormat: string;
    UUID: string;
    UUIDNotProvided: string;
    AlreadyExistsFormat: string;
    SomethingWentWrongTryAgainLater: string;
    ContactUsInsertedResponseMessage: string;
    UUIDAlreadyExists: string;
    First: string;
    Last: string;
    FirstNameRequired: string;
    LastNameRequired: string;
    FirstName: string;
    LastName: string;
    User: string;
    UserName: string;
    PasswordRequirement: string[];
    AlphaNumericFormat: string;
    Password: string;
    Confirm: string;
    ConfirmPassword: string;
    DidNotMatchFormat: string;
    CapitchaErrorMessage: string;
    Company: string;
    CompanyName: string;
    UserNameRequirement: string[];
    UserNameNotAavailable: string;
    EmailAlreadyRegistered: string;
    AccountType: string;
    InvalidValueFormat: string;
    CannotStartWithNumberFormat: string;
    MustContainOneCapitalLetterFormat: string;
    MustContainOneSmallLetterFormat: string;
    MustContainOneSpecialCharFormat: string;
    MustContainOneNumberFormat: string;
    VerificationEmailSent: string;
    VerificationEmailSentAgain: string;
    Again:string;
    VerificationEmailSentDetail: string;
    Resend: string;
    ResendEmail: string;
    CouldNotVerifyClient: string;
    UnAuthorizedRequest: string;
    SignUpVerificationNotPending: string;
    Success: string;
    CouldNotSendEmailNow: string;
    UnableToCompleteYourRequest: string;
    AccountCreatedLoginToContinue: string;
    Verifying: string;
    Forgot: string;
    ForgotPassword: string;
    BitVelocity: string;
    NotJoinedBitvelocityYet: string;
    Join: string;
    Now: string;
    JoinNow: string;
    Login: string;
    Credentials: string;
    AlreadyHaveAnAccount: string;
    VerificationKey: string;
    VerificationKeyExpired: string;
    CouldNotVerifyUser: string;
    UserAlreadyVerified: string;
    RedirectingYouToLogin: string;
    SuccessfullyVerifiedUser: string;
    NotExists: string;
    NotExistsFormat: string;
    EmailVerificationRequired: string;
    Here: string;
    Invalid: string;
    InvalidFormat: string;
    Home: string;
    Blockchain: string;
    Travel: string;
    RealEstate: string;
    Charts: string;
    FAQ: string;
    AboutUs: string;
    ContactUs: string;
    Help: string;
    SignUp: string;
    Wallet: string;
    Logout: string;
    CouldNotLoadConfig: string;
    Limit: string;
    Sell: string;
    Buy: string;
    Price: string;
    Amount: string;
    Total: string;
    Action: string;
    Currency: string;
    Pair: string;
    CurrencyPair: string;
    Market:string;
    AvailableBalance: string;
    Gross: string;
    GrossTotal: string;
    Fee: string;
    Date: string;
    Type: string;
    NonVerifiedUserCannotPlaceOrder: string;
    ThisUserCannotPlaceOrder: string;
    NotFound: string;
    NotFoundFormat: string;
    Min: string;
    MinTotalOrderAmountFormat: string;
    Order: string;
    NotSupportFormat: string;
    NotEnoughBalance: string;
    MinTierRequriedForTransaction: string;
    NoRecordFound: string;
    OrderPlacedSuccessfully: string;
    LangKey: string;
    CouldNotBeginTransaction: string;
    CouldNotCompleteTransaction: string;
    CouldNotExecuteQuery: string;
    OrderCompleted: string;
    UserWalletNotFoundForOneOfThePairCurrencies: string;
    CouldNotGetResponseFromKraken: string;
    PairKrakenMinOrderVolumeNotDefined: string;
    OrderLessThanMinKrakenOrderVolume: string;
    PairMappingWithKraken: string;
    UnableToVerifyFormat: string;
    Request: string;
    OrderStatusMustBeOpenOrPartiallyCompleted: string;
    Status: string;
    Trade: string;
    UnableToCreateQueueTaskForUpdatingExchangeOrigin: string;
    TaskId: string;
    UnableToUpdateExchangeOrigin: string;
    OrderPostedOnKrakenWithoutTxId: string;
    OrderPostedOnThirdParty: string;
    OrderPostedOnThirdPartyButCouldNotItsTxid: string;
    OrderAlreadyPostedOnFormat: string;
    ExternalOrderIdNotFound: string;
    ChangeExchangeManually: string;
    CaptchaNotVerified: string;

    static getLanguage(lang: string): LanguageBase {
        if(!lang)
        {
            return new LangENUS();
        }
        switch (lang) {
            case Constants.Instance.LanguageKey.ENUS:
                return new LangENUS();
            default:
                return new LangENUS();

        }
    }
    
    static default(): LanguageBase {
        return new LangENUS();
    }

}

export class LangENUS extends LanguageBase {
    Name = "Name";
    Email = "Email";
    ContactNo = "Contact Number";
    Message = "Message";
    Submit = "Submit";
    InvalidEmail = "Invalid " + this.Email;
    MaxLengthFormat = "Maximum {0} character(s)";
    MaxLengthFormat2 = "{0} accept maximum {1} character(s)";
    RangeLengthFormat = "Minimum {0} and Maximum {1} character(s)";
    RangeLengthFormat2 = "{0} accpet minimum {1} and Maximum {2} character(s)";
    RequiredFormat = "{0} is required";
    ErrorOccured = "An error occured";
    ErrorOccuredWhileValidationFormat = "An error occured while validating {0}";
    ErrorOccuredFormat = "An error occured {0}";
    UUID = "UUID";
    UUIDNotProvided = this.UUID + " not provided";
    AlreadyExistsFormat = "{0} already exists";
    SomethingWentWrongTryAgainLater = "Something went wrong, please try again later";
    ContactUsInsertedResponseMessage = "Thank you for contacting us. We've received your message and we'll get back to you soon if required.";
    UUIDAlreadyExists = "UUID already exists";
    First = "First";
    Last = "Last";
    FirstName = this.First + " " + this.Name;
    LastName = this.Last + " " + this.Name;
    User = "User";
    UserName = this.User + " " + this.Name;
    AlphaNumericFormat = "{0} must be alpha numeric";
    MustContainOneSpecialCharFormat = "{0} must contain atleast one special character";
    MustContainOneCapitalLetterFormat = "{0} must contain atleast one capital letter";
    MustContainOneSmallLetterFormat = "{0} must contain atleast one small letter";
    MustContainOneNumberFormat = "{0} must contain atleast one number";
    PasswordRequirement = [
        this.RangeLengthFormat2,
        this.MustContainOneCapitalLetterFormat,
        this.MustContainOneSmallLetterFormat,
        this.MustContainOneSpecialCharFormat,
        this.MustContainOneNumberFormat,
    ];
    Password = "Password";
    Confirm = "Confirm";
    ConfirmPassword = this.Confirm + " " + this.Password;
    DidNotMatchFormat = "{0} and {1} didn't match";
    CapitchaErrorMessage = "Help us prevent spam. Please click on the checkbox";
    Company = "Company";
    CompanyName = this.Company + " " + this.Name;
    CannotStartWithNumberFormat = "{0} Can't start with a number";
    UserNameRequirement = [
        this.RangeLengthFormat2,
        this.AlphaNumericFormat,
        this.CannotStartWithNumberFormat,
    ];
    UserNameNotAavailable = this.UserName + " not available";
    EmailAlreadyRegistered = "An account with this " + this.Email + " already exists. Please click login to continue with that account or enter another " + this.Email;
    AccountType = "Account Type";
    InvalidValueFormat = "Invalid value for {0}";
    VerificationEmailSent = "We've Sent You a Verfication Email";
    VerificationEmailSentDetail = 
`Click the link in your email to verify your account
If you didn't find the email, please check your spam folder or click the link
below to re-send`;
    Resend = "Resend";
    ResendEmail = this.Resend + " " + this.Email;
    CouldNotVerifyClient = "Could not verify client";
    UnAuthorizedRequest = "UnAuthorized Request";
    SignUpVerificationNotPending = "Sign Up verification is not pending for current user";
    Success = "Success";
    CouldNotSendEmailNow = "Couldn't send email now. Please try again later";
    UnableToCompleteYourRequest = "We cannot complete your request this time. Please try again later. If the problem persist, please let us inform through contact us";
    AccountCreatedLoginToContinue = "Your account is created. Please login to continue. Redirecting you to login ...";
    Again = "again";
    VerificationEmailSentAgain = this.VerificationEmailSent + " " + this.Again;
    Verifying = "Verifying ...";
    Forgot = "Forgot";
    ForgotPassword = this.Forgot + " " + this.Password;
    BitVelocity = "Bit Velocity"
    NotJoinedBitvelocityYet = "Not joined " + this.BitVelocity + " yet?";
    Join = "Join";
    Now = "Now";
    JoinNow = this.Join + " " + this.Now;
    Login = "Login";
    Credentials = "Credentials";
    AlreadyHaveAnAccount = "Already have a " + this.BitVelocity + " Account?";
    EmailVerificationRequired = "Email not verified. Please check your mail box. If it isn't in your inbox, check your Spam, Junk, Trash, Deleted Items, or Archive folder or click {0} to resend.";
    Here = "here";
    VerificationKey = "Verification Key";
    VerificationKeyExpired = this.VerificationKey + " is expired. A " + this.VerificationKey + " is expired when a user is already verified or when you request a new verification email.";
    CouldNotVerifyUser = "Sorry! could not verify this " + this.User;
    UserAlreadyVerified = "This user is already verified";
    RedirectingYouToLogin = "Please Login your account to continue. Redirecting to Login";
    SuccessfullyVerifiedUser = "Verification completed with success. " + this.RedirectingYouToLogin;
    NotExists = "Not Exists";
    NotExistsFormat = "{0} " + this.NotExists;
    Invalid = "Invalid";
    InvalidFormat = this.Invalid + " {0}";
    Home = "Home";
    Blockchain = "Blockchain";
    Travel = "Travel";
    RealEstate = "Real Estate";
    Charts = "Charts";
    FAQ = "FAQ";
    AboutUs = "About Us";
    ContactUs = "Contact Us";
    Help = "Help";
    SignUp = "Sign Up";
    Wallet = "Wallet";
    Logout = "Logout";
    CouldNotLoadConfig = "Could Not Load Config";
    Limit = "Limit";
    Sell = "Sell";
    Buy = "Buy";
    Price = "Price";
    Amount = "Amount";
    Total = "Total";
    Action = "Action";
    Currency = "Currency";
    Pair = "Pair";
    CurrencyPair = this.Currency + " " + this.Pair;
    Market = "Market";
    AvailableBalance = "Available Balance";
    Gross = "Gross";
    GrossTotal = this.Gross + " " + this.Total;
    Fee = "Fee";
    Date = "Date";
    Type = "Type";
    NonVerifiedUserCannotPlaceOrder = "Non verified user cannot place the order";
    ThisUserCannotPlaceOrder = "This user cannot place the order";
    NotFound = "not found";
    NotFoundFormat = "{0} not found";
    Min = "Minimum";
    Order = "Order";
    MinTotalOrderAmountFormat = this.Min + " " + this.Total + " "  + this.Order + " " + this.Amount + " is {0} {1}";
    NotSupportFormat = "{0} not supported";
    NotEnoughBalance = "Not enough balance available";
    MinTierRequriedForTransaction = "Minimum tier {0} is required for a transaction";
    NoRecordFound = "No record found";
    OrderPlacedSuccessfully = "Order placed successfully";
    LangKey = Constants.Instance.LanguageKey.ENUS;
    CouldNotBeginTransaction = "Could not begin trnsaction";
    CouldNotCompleteTransaction = "Could not complete transaction";
    CouldNotExecuteQuery = "Could not execute Query";
    OrderCompleted = "Order Completed";
    UserWalletNotFoundForOneOfThePairCurrencies = "User wallet for one of the pair currencie was not found";
    CouldNotGetResponseFromKraken = "Could not get response from kraken";
    PairKrakenMinOrderVolumeNotDefined = "Kraken minimum order volume not defined for this pair";
    OrderLessThanMinKrakenOrderVolume = "Order amount is less than kraken minimum order volume";
    PairMappingWithKraken = "pair mapping with kraken";
    UnableToVerifyFormat = "Unable to verify {0}";
    Request = "Request";
    OrderStatusMustBeOpenOrPartiallyCompleted = "Order status must be open or partially completed";
    Status = "Status";
    Trade = "Trade";
    UnableToCreateQueueTaskForUpdatingExchangeOrigin = "Unable to create queue task from updating exchange origin";
    TaskId = "Task Id";
    UnableToUpdateExchangeOrigin = "Unable to update exchange origin to {0}";
    OrderPostedOnKrakenWithoutTxId = "Order posted on kraken without txid";
    OrderPostedOnThirdParty = "Order posted on {0} Successfully";
    OrderPostedOnThirdPartyButCouldNotItsTxid = this.OrderPostedOnThirdParty + " but could not save its txid";
    OrderAlreadyPostedOnFormat = "Order already on {0}";
    ExternalOrderIdNotFound = "Order Id for {0} not found";
    ChangeExchangeManually = "Please change order exchange origin manually";
    CaptchaNotVerified = "Captcha not verified. Please submit the form again";

}