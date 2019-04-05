import { Constants } from "../shared/constants";
import { LanguageBase } from "./language";

export class LangENUS implements LanguageBase {
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
    ContactUsInsertedResponseMessage = "Thank you for contacting us. We've received your message and we'll get back to you soon.";
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
    VerificationEmailSent = "We've Sent You a Verfication Email at";
    VerificationEmailSentDetail =
        `Click the link in your email to verify your account
If you didn't find the email, please check your spam folder or click below to re-send`;
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
    VerificationEmailSentAgain = this.VerificationEmailSent + " " + this.Again + " at";
    Verifying = "Verifying";
    Forgot = "Forgot";
    ForgotPassword = this.Forgot + " " + this.Password;
    BitVelocity = "BitVelocity"
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
    MinTotalOrderAmountFormat = this.Min + " " + this.Total + " " + this.Order + " " + this.Amount + " is {0} {1}";
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
    FieldRequired = "This Field is required";
    Skype = "Skype";
    Id = "Id";
    SkypeId = this.Skype + " " + this.Id;
    Budget = "Budget";
    Consulting = "Consulting";
    Cost = "Cost";
    You = "You";
    Get = "Get";
    YouGet = this.You + " " + this.Get;
    NotAnAdminUser = "Not an amdin user";
    OrderCancellationResponseFromThirdParty = "Order cancellation resposne from {0} is {1}";
    UnableToSaveFormat = "Unable to save {0}";
    Session = "Session";
    Volume = "Volume";
    LastPrice = this.Last + ' ' + this.Price;
    Change = "Change";
    High = "High";
    Low = "Low";
    Page = "Page";
    Back = "Back";
    BackToHome = this.Back + " to " + this.Home;
    Deposit = "Deposit";
    Withdraw = "Withdraw";
    Withdrawl = "Withdrawl";
    SelectCurrencyTodeposit = "Select " + this.Currency + " to " + this.Deposit;
    Balance = "Balance";
    TotalBalance = this.Total + " " + this.Balance;
    OnHold = "On Hold";
    Account = "Account";
    AccountName = this.Account + " " + this.Name;
    Number = "Number";
    AccountNumber = this.Account + " " + this.Number;
    Bank = "Bank";
    BankName = this.Bank + " " + this.Name;
    Branch = "Branch";
    IBAN = "IBAN";
    Address = "Address";
    Minimum = "Minimum";
    WhichEverHigherFormat = "{0} or {1} (which ever is higher)";
    Reference = "Reference";
    Sr = "Sr.";
    DepositRequest = this.Deposit + " " + this.Request;
    DepositDate = this.Deposit + " " + this.Date;
    New = "New";
    NoCurrencySelected = "No " + this.Currency + " selected";
    Cancel = "Cancel";
    CreatedSuccessfullyFormat = "{0} created successfully";
    Select = "Select";
    File = "File";
    SelectFile = this.Select + " " + this.File;
    Clear = "Clear";
    Size = "Size";
    SizeLimit = this.Size + " " + this.Limit;
    Exceeds = "Exceeds";
    SizeLimitExceeds = this.SizeLimit + " " + this.Exceeds;
    AllowFileTypesAreFormat = "Allowed file types are {0}";
    filesSelectedFormat = '{0} files selected';
    Funding = "Funding";
    Free = "Free";
    to = "to";
    Individual = "Individual";
    Business = "Business";
    Create = "Create";
    CreateAccount = this.Create + " " + this.Account;
    Receipt = "Receipt";
    DepositReceipt = this.Deposit + " " + this.Receipt;
    InterestedIn = "Interested In";
    Duration = "Duration";
    FreeInitialConsultation = "Free Initial Consultation";
    AreYouLookingForAReliable = "Are you looking for a reliable, experienced";
    SolutionProviderThatCanDeliverInTime = "solution provider that can deliver your project in time ?";
    Transparency = "Transparency";
    Quality = "Quality";
    Deliverables = "Deliverables";
    QualityDeliverables = this.Quality + " " + this.Deliverables;
    Flexible = "Flexible";
    Engagement = "Engagement";
    Models = "Models";
    FlexibleEngagementModels = this.Flexible + " " + this.Engagement + " " + this.Models;
    Skilled = "Skilled";
    Team = "Team";
    SkilledTeam = this.Skilled + " " + this.Team;
    Talk = "Talk";
    Our = "Our";
    Experts = "Experts";
    TalkToOurExperts = this.Talk + " to " + this.Our + " " + this.Experts;
    Meet = "Meet";
    Founder = "Founder";
    CEO = "CEO";
    MeetFounderAndCEO = this.Meet + " " + this.Founder + " and " + this.CEO;
    SerialEnterpreneurPara = "Serial enterpreneur and technology evangelist specialized in real-time applications,";
    CPP = "C++";
    Linux = "Linux";
    NodeJS = "NodeJS";
    InnovateSolutionsPara = "Innovate solutions using technology that can solve real world problems for humans";
    Years = "Year(s)";
    Highly = "Highy";
    Experienced = "Expereinced";
    HiglyExperienced = this.Highly + " " + this.Experienced;
    Reliable = "Reliable";
    Trustable = "Trustable";
    ReiableAndTrustable = this.Reliable + " & " + this.Trustable;
    Successfull = "Successfull";
    Cooperation = "Cooperation";
    SuccessfullCooperation = this.Successfull + " " + this.Cooperation;
    HowItWorks = "How it works";
    TalkToOneofOurPara = "Talk to one of our";
    IndusteryExpertsPara = "industry experts";
    AVelocityDirectorPara  = "A Velocity director of engineering will";
    AVelocityDirectorPara2 = "then asses the workload and select";
    AVelocityDirectorPara3 = "suitable resource for the project.";
    AllocateSuitableResource = "Allocate suitable resource";
    WeWillThenAssessTheWorkLoadPara  = "We will then asses the workload and select suitable resource for the project.";
    EnsuringPromptDelivery = "Ensuring prompt delivery";
    EnsuringPromptDeliveryPara1 = "Development starts under internal Scrum";
    EnsuringPromptDeliveryPara2 = "Master and partners are updated weekly";
    EnsuringPromptDeliveryPara3 = "on progress";
    ServicesWeDeliver = "Services we deliver";
    ServicesWeDeliverPara = `At Velocity solutions we are passionate about building new generation applications
    using technology. Since we are building solutions that will solve real-world
    problem. we would love to be a part of organization working in same industry.`;
    TechnicalConsulting = "Technical Consulting";
    TechnicalConsultingPara= `Our inhouse quality control analysts ensure that product only goes live
    in
    production once it passes all stress testing techniques minimizing last
    minute production fixes`;
    ProductDevelopment= "Product Development";
    ProductDevelopmentPara= `We have helped our clients improve their existing product ensuring
    reliability and capability.`;
    UIAndUX= "UI & UX";
    UIAndUXPara = `Our inhouse quality control analysts ensure that product only goes live
    in
    production once it passes all stress testing techniques minimizing last
    minute production fixes`;
    DevOps= "Dev Ops";
    DevOpsPara= `Our inhouse quality control analysts ensure that product only goes live
    in
    production once it passes all stress testing techniques minimizing last
    minute production fixes`;
    TechnologiesPara = "These are the technologies we specialise in and our";
    TechnologiesPara2 = "expert will be in touch with you within 3 working days";
    Experience = "Experience";
    Project = "Project";
    Launched = "Launched";
    ProjectLaunched = this.Project + " " + this.Launched;
    Support = "Support";
    Satisfied = "Satisfied";
    Customers = "Customers";
    SatisfiedCustomers = this.Satisfied + " " + this.Customers;
    OurSoftwareDevelopmentIndustries = "Our Software Development Industries";
    OurSoftwareDevelopmentIndustriesPara = "We have successfully delivered solutions in following industries";
    BlockchainPara = `We believe blockchain technology is next version of internet where trustless
    decentralized ecosystem will solve many problems on modern age. Based on
    this believe we are also developing our inhouse products that will solve
    high fees exchange challenge that travelers have to have.
    Similarly using blockchain we are working to solve real-estate transaction
    issues by placing all the data of a real-estate transaction onto
    blockchain. Additionally, using this platform users are able to buy/sell
    real-estate using digital assets and our exchange system will act as a
    liquidity provider to ensure on-demand conversion is done by taking the
    hassle out of parties involved in the transaction.
    Weather it’s based on Ethereum blockchain, Solidity, private or public
    blockchain, Hyperledger, If you a project that is solving a real-world
    problem using blockchain technology we would be very much interested to
    work together delivering a reliable and scalable solution.`;
    Healthcare = "Healthcare";
    HealthcarePara = `Our developers have dived into several projects in the Healthcare sector;
    ranging from Doctor-client appointment & booking systems to medicine
    verification scanners. If you are looking for a mobile app development
    company
    for your next big app in the healthcare industry, feel free to discuss your
    project with us.Our developers have dived into several projects in the
    healthcare sector; ranging from Doctor-client booking systems to medicine
    verification scanners.Our developers have dived into several projects in
    the
    Healthcare sector; ranging from Doctor-client appointment & booking systems
    to
    medicine verification scanners. If you are looking for a mobile app
    development
    company for your next big app in the healthcare industry, feel free to
    discuss
    your project with us.`;
    BankingAndFinance = "Banking & Finance";
    BankingAndFinancePara =`Our developers have dived into several projects in the Healthcare sector;
    ranging from Doctor-client appointment & booking systems to medicine
    verification scanners. If you are looking for a mobile app development
    company
    for your next big app in the healthcare industry, feel free to discuss your
    project with us.Our developers have dived into several projects in the
    healthcare sector; ranging from Doctor-client booking systems to medicine
    verification scanners.Our developers have dived into several projects in
    the
    Healthcare sector; ranging from Doctor-client appointment & booking systems
    to
    medicine verification scanners. If you are looking for a mobile app
    development
    company for your next big app in the healthcare industry, feel free to
    discuss
    your project with us.`;
    RealTimeTradingApps1 = "Real-time";
    RealTimeTradingApps2 = "Trading apps";
    RealTimeTradingAppsPara = `Our developers have dived into several projects in the Healthcare sector;
    ranging from Doctor-client appointment & booking systems to medicine
    verification scanners. If you are looking for a mobile app development
    company
    for your next big app in the healthcare industry, feel free to discuss your
    project with us.Our developers have dived into several projects in the
    healthcare sector; ranging from Doctor-client booking systems to medicine
    verification scanners.Our developers have dived into several projects in
    the
    Healthcare sector; ranging from Doctor-client appointment & booking systems
    to
    medicine verification scanners. If you are looking for a mobile app
    development
    company for your next big app in the healthcare industry, feel free to
    discuss
    your project with us.`;
    Education = "Education";
    EducationAndELearning1 = this.Education + " &";
    ELearning = "E-learning";
    EducationAndELearningPara = `Our developers have dived into several projects in the Healthcare sector;
    ranging from Doctor-client appointment & booking systems to medicine
    verification scanners. If you are looking for a mobile app development
    company
    for your next big app in the healthcare industry, feel free to discuss your
    project with us.Our developers have dived into several projects in the
    healthcare sector; ranging from Doctor-client booking systems to medicine
    verification scanners.Our developers have dived into several projects in
    the
    Healthcare sector; ranging from Doctor-client appointment & booking systems
    to
    medicine verification scanners. If you are looking for a mobile app
    development
    company for your next big app in the healthcare industry, feel free to
    discuss
    your project with us.`;
    Cloud = "Cloud";
    Technologies = "Technologies";
    CloudTechnologiesPara = `Our developers have dived into several projects in the Healthcare sector;
    ranging from Doctor-client appointment & booking systems to medicine
    verification scanners. If you are looking for a mobile app development
    company
    for your next big app in the healthcare industry, feel free to discuss your
    project with us.Our developers have dived into several projects in the
    healthcare sector; ranging from Doctor-client booking systems to medicine
    verification scanners.Our developers have dived into several projects in
    the
    Healthcare sector; ranging from Doctor-client appointment & booking systems
    to
    medicine verification scanners. If you are looking for a mobile app
    development
    company for your next big app in the healthcare industry, feel free to
    discuss
    your project with us.`;
    Automotive = "Automotive";
    AutomotivePara = `Our developers have dived into several projects in the Healthcare sector;
    ranging from Doctor-client appointment & booking systems to medicine
    verification scanners. If you are looking for a mobile app development
    company
    for your next big app in the healthcare industry, feel free to discuss your
    project with us.Our developers have dived into several projects in the
    healthcare sector; ranging from Doctor-client booking systems to medicine
    verification scanners.Our developers have dived into several projects in
    the
    Healthcare sector; ranging from Doctor-client appointment & booking systems
    to
    medicine verification scanners. If you are looking for a mobile app
    development
    company for your next big app in the healthcare industry, feel free to
    discuss
    your project with us.`;
    Tourism = "Tourism";
    TravelAndTourism = this.Travel + " & " + this.Tourism;
    TravelAndTourismPara = `Our developers have dived into several projects in the Healthcare sector;
    ranging from Doctor-client appointment & booking systems to medicine
    verification scanners. If you are looking for a mobile app development
    company
    for your next big app in the healthcare industry, feel free to discuss your
    project with us.Our developers have dived into several projects in the
    healthcare sector; ranging from Doctor-client booking systems to medicine
    verification scanners.Our developers have dived into several projects in
    the
    Healthcare sector; ranging from Doctor-client appointment & booking systems
    to
    medicine verification scanners. If you are looking for a mobile app
    development
    company for your next big app in the healthcare industry, feel free to
    discuss
    your project with us.`;
    Manufacturing = "Manufacturing";
    ManufacturingPara = `Our developers have dived into several projects in the Healthcare sector;
    ranging from Doctor-client appointment & booking systems to medicine
    verification scanners. If you are looking for a mobile app development
    company
    for your next big app in the healthcare industry, feel free to discuss your
    project with us.Our developers have dived into several projects in the
    healthcare sector; ranging from Doctor-client booking systems to medicine
    verification scanners.Our developers have dived into several projects in
    the
    Healthcare sector; ranging from Doctor-client appointment & booking systems
    to
    medicine verification scanners. If you are looking for a mobile app
    development
    company for your next big app in the healthcare industry, feel free to
    discuss
    your project with us.`;
    Intellectual = "Intellectual";
    Property = "Property";
    Products = "Products";
    PropertyProducts = this.Property + " " + this.Products;
    IntellectualPropertyProductsPara = `Our developers have dived into several projects in the Healthcare sector;
    ranging from Doctor-client appointment & booking systems to medicine
    verification scanners. If you are looking for a mobile app development
    company
    for your next big app in the healthcare industry, feel free to discuss your
    project with us.Our developers have dived into several projects in the
    healthcare sector; ranging from Doctor-client booking systems to medicine
    verification scanners.Our developers have dived into several projects in
    the
    Healthcare sector; ranging from Doctor-client appointment & booking systems
    to
    medicine verification scanners. If you are looking for a mobile app
    development
    company for your next big app in the healthcare industry, feel free to
    discuss
    your project with us.`;
    Gaming = "Gaming";
    GamingPara = `Our developers have dived into several projects in the Healthcare sector;
    ranging from Doctor-client appointment & booking systems to medicine
    verification scanners. If you are looking for a mobile app development
    company
    for your next big app in the healthcare industry, feel free to discuss your
    project with us.Our developers have dived into several projects in the
    healthcare sector; ranging from Doctor-client booking systems to medicine
    verification scanners.Our developers have dived into several projects in
    the
    Healthcare sector; ranging from Doctor-client appointment & booking systems
    to
    medicine verification scanners. If you are looking for a mobile app
    development
    company for your next big app in the healthcare industry, feel free to
    discuss
    your project with us.`;
    Media = "Media";
    MediaAnd = this.Media + " &";
    Entertainment = "Entertainment";
    MediaAndEntertainmentPara = `Our developers have dived into several projects in the Healthcare sector;
    ranging from Doctor-client appointment & booking systems to medicine
    verification scanners. If you are looking for a mobile app development
    company
    for your next big app in the healthcare industry, feel free to discuss your
    project with us.Our developers have dived into several projects in the
    healthcare sector; ranging from Doctor-client booking systems to medicine
    verification scanners.Our developers have dived into several projects in
    the
    Healthcare sector; ranging from Doctor-client appointment & booking systems
    to
    medicine verification scanners. If you are looking for a mobile app
    development
    company for your next big app in the healthcare industry, feel free to
    discuss
    your project with us.`;
    ProjectsSuccessfullyDelivery1 = "Projects successfully delivery";
    ProjectsSuccessfullyDelivery2 = "for these clients";
    DepartureControlSystem1 = "Departure Control System and";
    DepartureControlSystem2 = "Flight management System";
    RealtimeRemoteControl1 = "Real-time remote control";
    RealtimeRemoteControl2 = "application";
    LondonUndergroundRailSimulation1 = "London underground rail";
    LondonUndergroundRailSimulation2 = "simulation";
    CloudGaming = this.Cloud + " " + this.Gaming;
    Virtualization = "Virtualization";
    CloudVirtualization = this.Cloud + " " + this.Virtualization;
    Lets = "Lets";
    ContactUs1 = "We believe in solving problem with";
    ContactUs2 = "Skill, Passion, Quality and Reliability";
    ContactUs3 = "that could result in building long term relationships.";
    ContactUs4 = "So if you are looking for a developer in these areas,";
    ContactUs5 = "fill our the form below and our team will be in contact within few days.";
    ThankYouForContactingUs = "Thank you for contacting us.";
    WeHaveReceivedYourMessage = "We've received your message.";
    OurExpertWillBeInTouchWithYou = "Our expert will be in touch with you within 3 working days";
    FahadSheikh = "Fahad Sheikh";
    AngularJS = "AngularJS";
    MeanStack = "Mean Stack";
    ReactNative = "React Native";
    BlockchainForTravel = this.Blockchain + " for " + this.Travel;
    BlockchainForRealEstate = this.Blockchain + " for " + this.RealEstate;
    HTML5 = "HTML5";
    CSS = "CSS";
    ReactJS = "ReactJS";
    FullStackDevelopment = "Full Stack Development";
    MobileDevelopment = "Mobile Development";
    ServerDevelopment = "Server Development";
    AWS = "AWS";
    EC2Console = "EC2 Console";
    ERC20Tokens = "ERC20 Tokens";
    DecentralisedApps = "Decentralised Apps";
    XenServer = "Xen Server";
    RealTime = "RealTime";
    Applications = "Applications";
    RealTimeApplications = this.RealTime + " " + this.Applications;
    Java = "Java";
    ApacheTomcat = "Apache Tomcat";
    Copyrights = "Copyrights";
    CopyrightsWithYear = this.Copyrights + "@2019";
    AllRightsReserved = "All rights reserved";
    VelocitySolutions = "Velocity Solutions";
    OperatingUnderVelocitySolutions = "Operating under " + this.VelocitySolutions;
    CompanyNo = "Company No";
    Method = "Method";
    DepositMethod = this.Deposit + " " + this.Method
    Params = "Params";
    MinimumAmountFormat = this.Minimum + " " + this.Amount + " is {0}";
    NotSaved = "Not Saved";
    or = "or";
    SignIn = "Sign In";
    QuestionMark = "?";
    Crypto = "Crypto";
    Coin = "Coin";
    CryptoCoin = this.Crypto + " " + this.Coin;
    LoginPageSignupPara = "Signing Up and start trading on a secure crypto trade platform"
    GetAnAccount = "Get an account!!!";
    Alert = "Alert";
    Exchange = "Exchange";
    Volume24H = "24H " + this.Volume;
    Change24H = "24H " + this.Change;
    High24H = "24H " + this.High;
    Low24H = "24H " + this.Low;
    Error = "Error";
    History = "History";
    OrderHistory = this.Order + " " + this.History;
    Detailed = "Detailed";
    DetailedHistory = this.Detailed + " " + this.History;
    Pending = "Pending";
    Orders = this.Order + "(s)";
    PendingOrders = this.Pending + " " + this.Orders;
    Previous = "Previous";
    PreviousHistory = this.Previous + " " + this.History;
    Time = "Time";
    Local = "Local";
    Recent = "Recent";
    Trades = "Trades";
    RecentTrades = this.Recent + " " + this.Trades;
    DepositRequests = this.DepositRequest + "(s)";
    NewDepositRequest = this.New + " " + this.DepositRequest;
    SiteCompanyName = "Velocity Solutions";
    English = "English";
    German = "German";
    Terms = "Terms";
    Use = "Use";
    TermsOfUse = this.Terms + " of " + this.Use;
    I = "I";
    Agree = "Agree";
    IAgree = this.I + " " + this.Agree;
    Verification = "Verification";
    AccountVerification = this.Account + " " + this.Verification;
    Please = "Please";
    Wait = "Wait";
    PleaseWait = this.Please + " " + this.Wait;
    at = "at";
    Calculator = "Calculator";
    CurrencyCalculator = this.Currency + " " + this.Calculator;
    MainPageHeader = `Buy your digital assests in native currency pairs to reduce huge conversion cost.
    Now supporting buying in GBP, Euro and USD`;
    Expert = "Expert"
    ExpertSupport = this.Expert + " " + this.Support;
    ExpertSupportPara = "We target to ensure that your query is answered in best possible way with guidance on Account verification, KYC, Fiat deposits, Security and Trading.";
    Safe = "Safe";
    Secure = "Secure";
    SafeAndSecurePara = "We follow best industry practices back-end with customized security to protect your coins";
    Fees = this.Fee + "s";
    Advanced = "Advanced";
    Ordering = "Ordering";
    AdvancedOrdering = this.Advanced + " " + this.Ordering;
    AdvancedOrderingPara = "Order limit and stop loss to automate your strategy and minimize the trading risk";
    Reliability = "Reliability";
    ReliabilityPara = "Reliable service with 24x7 support via email";
    Offline = "Offline";
    Storage = "Storage";
    OfflineStorage = this.Offline + " " + this.Storage;
    OfflineStoragePara = "Majority of the digital assets are storted offline to prevent hackers attacks";
    Standard = "Standard";
    Register = "Register";
    RegisterPara = "Registration is easy and will help you keep track of your assets";
    KYC = "KYC";
    Verified = "Verified";
    GetKYCVerifiedPara = "As per regulatoring requiments, we will only allow customers that have passed our KYC criteria";
    Make = "Make";
    Fiat = "Fiat";
    Debit = "Debit";
    Credit = "Credit";
    Card = "Card";
    MakeFiatDepositPara = "Buy instantly with debit/credit card or deposit Euro/USD to convert to crypto";
    Start = "Start";
    Buying = "Buying";
    StartBuyingPara = "Start trading. Or be a long-term hodler";
    GetKYCVerified = this.Get + " " + this.KYC + " " + this.Verified;
    MakeFiatDeposit = this.Make + " " + this.Fiat + " " + this.Deposit;
    RegisterDebitCreditCard = this.Register + " " + this.Debit + "/" + this.Credit + " " + this.Card;
    StartBuying = this.Start + " " + this.Buying;
    How = "How";
    Trading = "Trading";
    StartTradingNow = this.Start + " " + this.Trading + " " + this.Now;
    Brief = "Brief";
    BriefHistory = this.Brief + " " + this.History;
    MapComponentHeading = "Covering major Eurpeon countries and US";
    MapComponentPara = "We offer easy and simple steps to buy crypto taking hassle away from our clients letting them focus on things that actually matter the cryptocurrency marketcap is always increasing and is expected to reach multi trillion dollar industry";
    Part = "Part";
    PartBuyting = this.Part + " " + this.Buying;
    PartBuytingPara = "Schedule weekly or monthly direct debits from your account for buying cryptocurrency in parts";
    SupportPara = "We target to ensure that your query is answered in best possible way with guidance on Account verification, KYC, Fiat deposits, Security and Trading";
    API = "API";
    APIPara = "Our restful APIs will be available soon for integration";
    Feature = "Feature";
    Features = this.Feature + "s";
    Manage = "Manage";
    Wallets = this.Wallet + "s";
    ManageWallets = this.Manage + " " + this.Wallets;
    Explore = "Explore";
    Security = "Security";
    Statistics = "Statistics";
    MarketStatistics = this.Market + " " + this.Statistics
    Center = "Center";
    SupportCenter = this.Support + " " + this.Center;
    Knowledge = "Knowledge";
    Base = "Base";
    KnowledgeBase = this.Knowledge + " " + this.Base;
    Social = "Social";
    OurFees = this.Our + " " + this.Fees;

}