import { Constants } from "../shared/constants";
import { LangENUS } from "./enus";
import { LangDE } from "./de";

export interface LanguageBase {
    Name: string;
    Email: string;
    ContactNo: string;
    Message: string;
    Submit: string;
    InvalidEmail: string;
    MaxLengthFormat: string;
    MaxLengthFormat2: string;
    RangeLengthFormat: string;
    RangeLengthFormat2: string;
    RequiredFormat: string;
    FieldRequired: string;
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
    Again: string;
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
    Market: string;
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
    Skype: string;
    Id: string;
    SkypeId: string;
    Budget: string;
    Consulting: string;
    Cost: string;
    You: string;
    Get: string;
    YouGet: string;
    NotAnAdminUser: string;
    OrderCancellationResponseFromThirdParty: string;
    UnableToSaveFormat: string;
    Session: string;
    Volume: string;
    LastPrice: string;
    Change: string;
    High: string;
    Low: string;
    Page: string;
    Back: string;
    BackToHome: string;
    Deposit: string;
    Withdraw: string;
    Withdrawl: string;
    SelectCurrencyTodeposit: string;
    Balance: string;
    TotalBalance: string;
    OnHold: string;
    Account: string;
    AccountName: string;
    Number: string;
    AccountNumber: string;
    Bank: string;
    BankName: string;
    Branch: string;
    IBAN: string;
    Address: string;
    Minimum: string;
    WhichEverHigherFormat: string;
    Reference: string;
    Sr: string;
    DepositRequest: string;
    DepositDate: string;
    New: string;
    NoCurrencySelected: string;
    Cancel: string;
    CreatedSuccessfullyFormat: string;
    Select: string;
    File: string;
    SelectFile: string;
    Clear: string;
    Size: string;
    SizeLimit: string;
    Exceeds: string;
    SizeLimitExceeds: string;
    AllowFileTypesAreFormat: string;
    filesSelectedFormat: string;
    Funding: string;
    Free: string;
    to: string;
    Individual: string;
    Business: string;
    Create: string;
    CreateAccount: string;
    Receipt: string;
    DepositReceipt: string;
    Method: string;
    DepositMethod: string;
    Params: string;
    MinimumAmountFormat: string;
    NotSaved: string;
    InterestedIn: string;
    Duration: string;
    FreeInitialConsultation: string;
    AreYouLookingForAReliable: string;
    SolutionProviderThatCanDeliverInTime: string;
    Transparency: string;
    Quality: string;
    Deliverables: string;
    QualityDeliverables: string;
    Flexible: string;
    Engagement: string;
    Models: string;
    FlexibleEngagementModels: string;
    Skilled: string;
    Team: string;
    SkilledTeam: string;
    Talk: string;
    Our: string;
    Experts: string;
    TalkToOurExperts: string;
    Meet: string;
    Founder: string;
    CEO: string;
    MeetFounderAndCEO: string;
    SerialEnterpreneurPara: string;
    CPP: string;
    Linux: string;
    NodeJS: string;
    InnovateSolutionsPara: string;
    Years: string;
    Highly: string;
    Experienced: string;
    Experience: string;
    HiglyExperienced: string;
    Reliable: string;
    Trustable: string;
    ReiableAndTrustable: string;
    Successfull: string;
    Cooperation: string;
    SuccessfullCooperation: string;
    HowItWorks: string;
    TalkToOneofOurPara: string;
    IndusteryExpertsPara: string;
    AVelocityDirectorPara: string;
    AVelocityDirectorPara2: string;
    AVelocityDirectorPara3: string;
    AllocateSuitableResource: string;
    WeWillThenAssessTheWorkLoadPara: string;
    EnsuringPromptDelivery: string;
    EnsuringPromptDeliveryPara1: string;
    EnsuringPromptDeliveryPara2: string;
    EnsuringPromptDeliveryPara3: string;
    ServicesWeDeliver: string;
    ServicesWeDeliverPara: string;
    TechnicalConsulting: string;
    TechnicalConsultingPara: string;
    ProductDevelopment: string;
    ProductDevelopmentPara: string;
    UIAndUX: string;
    UIAndUXPara: string;
    DevOps: string;
    DevOpsPara: string;
    TechnologiesPara: string;
    TechnologiesPara2: string;
    Project: string;
    Launched: string;
    ProjectLaunched: string;
    Support: string;
    Satisfied: string;
    Customers: string;
    SatisfiedCustomers: string;
    OurSoftwareDevelopmentIndustries: string;
    OurSoftwareDevelopmentIndustriesPara: string;
    BlockchainPara: string;
    Healthcare: string;
    HealthcarePara: string;
    BankingAndFinance: string;
    BankingAndFinancePara: string;
    RealTimeTradingApps1: string;
    RealTimeTradingApps2: string;
    RealTimeTradingAppsPara: string;
    Education: string;
    EducationAndELearning1: string;
    ELearning: string;
    EducationAndELearningPara: string;
    Cloud: string;
    Technologies: string;
    CloudTechnologiesPara: string;
    Automotive: string;
    AutomotivePara: string;
    Tourism: string;
    TravelAndTourism: string;
    TravelAndTourismPara: string;
    Manufacturing: string;
    ManufacturingPara: string;
    Intellectual: string;
    Property: string;
    Products: string;
    PropertyProducts: string;
    IntellectualPropertyProductsPara: string;
    Gaming: string;
    GamingPara: string;
    Media: string;
    MediaAnd: string;
    Entertainment: string;
    MediaAndEntertainmentPara: string;
    ProjectsSuccessfullyDelivery1: string;
    ProjectsSuccessfullyDelivery2: string;
    DepartureControlSystem1: string;
    DepartureControlSystem2: string;
    RealtimeRemoteControl1: string;
    RealtimeRemoteControl2: string;
    LondonUndergroundRailSimulation1: string;
    LondonUndergroundRailSimulation2: string;
    CloudGaming: string;
    CloudVirtualization: string;
    Virtualization: string;
    Lets: string;
    ContactUs1: string;
    ContactUs2: string;
    ContactUs3: string;
    ContactUs4: string;
    ContactUs5: string;
    ThankYouForContactingUs: string;
    WeHaveReceivedYourMessage: string;
    OurExpertWillBeInTouchWithYou: string;
    FahadSheikh: string;
    AngularJS: string;
    MeanStack: string;
    ReactNative: string;
    BlockchainForTravel: string;
    BlockchainForRealEstate: string;
    HTML5: string;
    CSS: string;
    ReactJS: string;
    FullStackDevelopment: string;
    MobileDevelopment: string;
    ServerDevelopment: string;
    AWS: string;
    EC2Console: string;
    ERC20Tokens: string;
    DecentralisedApps: string;
    XenServer: string;
    RealTime: string;
    Applications: string;
    RealTimeApplications: string;
    Java: string;
    ApacheTomcat: string;
    Copyrights: string;
    CopyrightsWithYear: string;
    AllRightsReserved: string;
    VelocitySolutions: string;
    OperatingUnderVelocitySolutions: string;
    CompanyNo: string;

}

export function getLanguage(lang: string): LanguageBase {
    if (!lang) {
        return new LangENUS();
    }
    switch (lang) {
        case Constants.Instance.LanguageKey.ENUS:
            return new LangENUS();
            
        case Constants.Instance.LanguageKey.DE:
        return new LangDE();

        default:
            return new LangENUS();

    }
}

export function getDefaultLanguage(): LanguageBase {
    return new LangENUS();
}
