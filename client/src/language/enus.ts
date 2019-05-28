import { Constants } from "../shared/constants";
import { LanguageBase } from "./language";

export class LangENUS implements LanguageBase {
  Profile = "Profile";
  Settings = "Settings";
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
  SomethingWentWrongTryAgainLater =
    "Something went wrong, please try again later";
  ContactUsInsertedResponseMessage =
    "Thank you for contacting us. We've received your message and we'll get back to you soon.";
  UUIDAlreadyExists = "UUID already exists";
  First = "First";
  Last = "Last";
  FirstName = this.First + " " + this.Name;
  LastName = this.Last + " " + this.Name;
  User = "User";
  UserName = "Username";
  // UserName = this.User + " " + this.Name;
  AlphaNumericFormat = "{0} must be alpha numeric";
  MustContainOneSpecialCharFormat =
    "{0} must contain atleast one special character (" +
    Constants.Instance.SpecialChars +
    ")";
  MustContainOneCapitalLetterFormat =
    "{0} must contain atleast one capital letter (" +
    Constants.Instance.CapitalLetters +
    ")";
  MustContainOneSmallLetterFormat =
    "{0} must contain atleast one small letter (" +
    Constants.Instance.SmallLetters +
    ")";
  MustContainOneNumberFormat =
    "{0} must contain atleast one number (" + Constants.Instance.Numbers + ")";
  PasswordRequirement = [
    this.RangeLengthFormat2,
    this.MustContainOneCapitalLetterFormat,
    this.MustContainOneSmallLetterFormat,
    this.MustContainOneSpecialCharFormat,
    this.MustContainOneNumberFormat
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
    this.CannotStartWithNumberFormat
  ];
  UserNameNotAavailable = this.UserName + " not available";
  EmailAlreadyRegistered =
    "An account with this " +
    this.Email +
    " already exists. Please click login to continue with that account or enter another " +
    this.Email;
  AccountType = "Account Type";
  InvalidValueFormat = "Invalid value for {0}";
  VerificationEmailSent = "We've Sent You a Verfication Email";
  VerificationEmailSentDetail = `Click the link in your email to verify your account
If you didn't find the email, please check your spam folder or click the link
below to re-send`;
  Resend = "Resend";
  ResendEmail = this.Resend + " " + this.Email;
  CouldNotVerifyClient = "Could not verify client";
  UnAuthorizedRequest = "UnAuthorized Request";
  SignUpVerificationNotPending =
    "Sign Up verification is not pending for current user";
  Success = "Success";
  CouldNotSendEmailNow = "Couldn't send email now. Please try again later";
  UnableToCompleteYourRequest =
    "We cannot complete your request this time. Please try again later. If the problem persist, please let us inform through contact us";
  AccountCreatedLoginToContinue =
    "Your account is created. Please login to continue. Redirecting you to login ...";
  Again = "again";
  VerificationEmailSentAgain = this.VerificationEmailSent + " " + this.Again;
  Verifying = "Verifying ...";
  Forgot = "Forgot";
  ForgotPassword = this.Forgot + " " + this.Password;
  BitVelocity = "BitVelocity";
  NotJoinedBitvelocityYet = "Not joined " + this.BitVelocity + " yet?";
  Join = "Join";
  Now = "Now";
  JoinNow = this.Join + " " + this.Now;
  Login = "Login";
  Credentials = "Credentials";
  AlreadyHaveAnAccount = "Already have a " + this.BitVelocity + " Account?";
  EmailVerificationRequired =
    "Email not verified. Please check your mail box. If it isn't in your inbox, check your Spam, Junk, Trash, Deleted Items, or Archive folder or click {0} to resend.";
  Here = "here";
  VerificationKey = "Verification Key";
  VerificationKeyExpired =
    this.VerificationKey +
    " is expired. A " +
    this.VerificationKey +
    " is expired when a user is already verified or when you request a new verification email.";
  CouldNotVerifyUser = "Sorry! could not verify this " + this.User;
  UserAlreadyVerified = "This user is already verified";
  RedirectingYouToLogin =
    "Please Login your account to continue. Redirecting to Login";
  SuccessfullyVerifiedUser =
    "Verification completed with success. " + this.RedirectingYouToLogin;
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
  MinTotalOrderAmountFormat =
    this.Min +
    " " +
    this.Total +
    " " +
    this.Order +
    " " +
    this.Amount +
    " is {0} {1}";
  NotSupportFormat = "{0} not supported";
  NotEnoughBalance = "Not enough balance available";
  MinTierRequriedForTransaction =
    "Minimum tier {0} is required for a transaction";
  NoRecordFound = "No record found";
  OrderPlacedSuccessfully = "Order placed successfully";
  LangKey = Constants.Instance.LanguageKey.ENUS;
  CouldNotBeginTransaction = "Could not begin trnsaction";
  CouldNotCompleteTransaction = "Could not complete transaction";
  CouldNotExecuteQuery = "Could not execute Query";
  OrderCompleted = "Order Completed";
  UserWalletNotFoundForOneOfThePairCurrencies =
    "User wallet for one of the pair currencie was not found";
  CouldNotGetResponseFromKraken = "Could not get response from kraken";
  PairKrakenMinOrderVolumeNotDefined =
    "Kraken minimum order volume not defined for this pair";
  OrderLessThanMinKrakenOrderVolume =
    "Order amount is less than kraken minimum order volume";
  PairMappingWithKraken = "pair mapping with kraken";
  UnableToVerifyFormat = "Unable to verify {0}";
  Request = "Request";
  OrderStatusMustBeOpenOrPartiallyCompleted =
    "Order status must be open or partially completed";
  Status = "Status";
  Trade = "Trade";
  UnableToCreateQueueTaskForUpdatingExchangeOrigin =
    "Unable to create queue task from updating exchange origin";
  TaskId = "Task Id";
  UnableToUpdateExchangeOrigin = "Unable to update exchange origin to {0}";
  OrderPostedOnKrakenWithoutTxId = "Order posted on kraken without txid";
  OrderPostedOnThirdParty = "Order posted on {0} Successfully";
  OrderPostedOnThirdPartyButCouldNotItsTxid =
    this.OrderPostedOnThirdParty + " but could not save its txid";
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
  OrderCancellationResponseFromThirdParty =
    "Order cancellation resposne from {0} is {1}";
  UnableToSaveFormat = "Unable to save {0}";
  Session = "Session";
  Volume = "Volume";
  LastPrice = this.Last + " " + this.Price;
  Change = "Change";
  High = "High";
  Low = "Low";
  Page = "Page";
  Back = "Back";
  BackToHome = this.Back + " to " + this.Home;
  Deposit = "Deposit";
  Withdraw = "Withdraw";
  Withdrawal = "Withdrawal";
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
  filesSelectedFormat = "{0} files selected";
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
  SolutionProviderThatCanDeliverInTime =
    "solution provider that can deliver your project in time ?";
  Transparency = "Transparency";
  Quality = "Quality";
  Deliverables = "Deliverables";
  QualityDeliverables = this.Quality + " " + this.Deliverables;
  Flexible = "Flexible";
  Engagement = "Engagement";
  Models = "Models";
  FlexibleEngagementModels =
    this.Flexible + " " + this.Engagement + " " + this.Models;
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
  SerialEnterpreneurPara =
    "Serial enterpreneur and technology evangelist specialized in real-time applications,";
  CPP = "C++";
  Linux = "Linux";
  NodeJS = "NodeJS";
  InnovateSolutionsPara =
    "Innovate solutions using technology that can solve real world problems for humans";
  Years = "Year(s)";
  Highly = "Highy";
  Experienced = "Expereinced";
  HiglyExperienced = this.Highly + " " + this.Experienced;
  Reliable = "Reliable";
  Trustable = "Trustable";
  ReiableAndTrustable = this.Reliable + " & " + this.Trustable;
  Successful = "Successful";
  Successfully = "Successfully";
  Cooperation = "Cooperation";
  SuccessfulCooperation = this.Successful + " " + this.Cooperation;
  HowItWorks = "How it works";
  TalkToOneofOurPara = "Talk to one of our";
  IndusteryExpertsPara = "industry experts";
  AVelocityDirectorPara = "A Velocity director of engineering will";
  AVelocityDirectorPara2 = "then asses the workload and select";
  AVelocityDirectorPara3 = "suitable resource for the project.";
  AllocateSuitableResource = "Allocate suitable resource";
  WeWillThenAssessTheWorkLoadPara =
    "We will then asses the workload and select suitable resource for the project.";
  EnsuringPromptDelivery = "Ensuring prompt delivery";
  EnsuringPromptDeliveryPara1 = "Development starts under internal Scrum";
  EnsuringPromptDeliveryPara2 = "Master and partners are updated weekly";
  EnsuringPromptDeliveryPara3 = "on progress";
  ServicesWeDeliver = "Services we deliver";
  ServicesWeDeliverPara = `At Velocity solutions we are passionate about building new generation applications
    using technology. Since we are building solutions that will solve real-world
    problem. we would love to be a part of organization working in same industry.`;
  TechnicalConsulting = "Technical Consulting";
  TechnicalConsultingPara = `Our inhouse quality control analysts ensure that product only goes live
    in
    production once it passes all stress testing techniques minimizing last
    minute production fixes`;
  ProductDevelopment = "Product Development";
  ProductDevelopmentPara = `We have helped our clients improve their existing product ensuring
    reliability and capability.`;
  UIAndUX = "UI & UX";
  UIAndUXPara = `Our inhouse quality control analysts ensure that product only goes live
    in
    production once it passes all stress testing techniques minimizing last
    minute production fixes`;
  DevOps = "Dev Ops";
  DevOpsPara = `Our inhouse quality control analysts ensure that product only goes live
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
  OurSoftwareDevelopmentIndustriesPara =
    "We have successfully delivered solutions in following industries";
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
  BankingAndFinancePara = `Our developers have dived into several projects in the Healthcare sector;
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
  ContactUs5 =
    "fill our the form below and our team will be in contact within few days.";
  ThankYouForContactingUs = "Thank you for contacting us.";
  WeHaveReceivedYourMessage = "We've received your message.";
  OurExpertWillBeInTouchWithYou =
    "Our expert will be in touch with you within 3 working days";
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
  DepositMethod = this.Deposit + " " + this.Method;
  Params = "Params";
  MinimumAmountFormat = this.Minimum + " " + this.Amount + " is {0}";
  NotSaved = "Not Saved";
  SignIn = "Sign In";
  Your = "Your";
  SignInToYourAccount = this.SignIn + " to " + this.Your + " " + this.Account;
  Age = "Age";
  CNIC = "CNIC";
  Guardian = "Guardian";
  GuardianName = this.Guardian + " " + this.Name;
  Relationship = "Relationship";
  GuardianRelationship = this.Guardian + " " + this.Relationship;
  Gender = "Gender";
  Middle = "Middle";
  MiddleName = this.Middle + " " + this.Name;
  Patient = "Patient";
  NewPatient = this.New + " " + this.Patient;
  DateofBirth = this.Date + " of Birth";
  Months = "Month(s)";
  Days = "Day(s)";
  Reset = "Reset";
  Find = "Find";
  FindOrder = this.Find + " " + this.Order;
  AmountFrom = this.Amount + " From";
  AmountTo = this.Amount + " To";
  Created = "Created";
  Range = "Range";
  DateRange = this.Date + " " + this.Range;
  Origin = "Origin";
  Exchange = "Exchange";
  ExchangeOrigin = this.Exchange + " " + this.Origin;
  FeeCurrency = this.Fee + " " + this.Currency;
  FeePercentage = this.Fee + " Percentage";
  From = "From";
  FeePercentageFrom = this.FeePercentage + " " + this.From;
  To = "To";
  FeePercentageTo = this.FeePercentage + " " + this.To;
  Filters = "Filters";
  LoginHeaderMessage = "Hello! Log in with your email";
  CreatedDateRange = this.Created + " " + this.DateRange;
  MoveTo = "Move to";
  MoveToFormat = this.MoveTo + " {0}";
  PriceFrom = this.Price + " " + this.From;
  PriceTo = this.Price + " " + this.To;
  RemainingAmount = "Remaining " + this.Amount;
  RemainingAmountFrom = this.RemainingAmount + " " + this.From;
  RemainingAmountTo = this.RemainingAmount + " " + this.To;
  Target = "Target";
  TargetOrigin = this.Target + " " + this.Origin;
  Orders = "Order(s)";
  Serial = "Serial";
  SerialNo = this.Serial + " No.";
  CreatedOn = this.Created + " On";
  Updated = "Updated";
  LastUpdated = this.Last + " " + this.Updated;
  CancelledOn = "Cancelled On";
  DepositDateRange = this.DepositDate + " " + this.Range;
  FeeFrom = this.Fee + " " + this.From;
  FeeTo = this.Fee + " " + this.To;
  OK = "OK";
  Alert = "Alert";
  Details = "Details";
  Error = "Error";
  Close = "Close";
  DepositRequestId = this.DepositRequest + " " + this.Id;
  UserId = this.User + " " + this.Id;
  Approve = "Approve";
  Reject = "Reject";
  Fund = "Fund";
  AmountToFund = this.Amount + " to " + this.Fund;
  Other = "Other";
  Deduction = "Deduction";
  Deductions = this.Deduction + "(s)";
  OtherDeductions = this.Other + " " + this.Deductions;
  Remarks = "Remarks";
  Received = "Received";
  AmountReceived = this.Amount + " " + this.Received;
  AmountAddedToUsersWallet =
    "This " + this.Amount + "'ll be added to user's " + this.Wallet;
  EmailSentSuccessfully = this.Email + " sent " + this.Successfully;
  CannotBeEmptyFormat = "{0} can not be empty";
  CurrentStatusInvalidFormat = "{0} is not {1}";
  Funded = "Funded";
  FundedAmount = this.Funded + " " + this.Amount;
  MustBeEqualToFormat = "{0} must be equal to {1}";
  CannotBeFormat = "{0} can not be {1}";
  Rejected = "Rejected";
  NoAmountReceivedForDepositRequestVerification =
    "If no " +
    this.Amount +
    " is received, then " +
    this.DepositRequest +
    " should be " +
    this.Rejected;
  Approved = "Approved";
  ApprovedSuccessfullyFormat = "{0} " + this.Approved + " " + this.Successfully;
  RejectedSuccessfullyFormat = "{0} " + this.Rejected + " " + this.Successfully;
  Verified = "Verified";
  AccountEmailIsNotVerified =
    this.Account + " " + this.Email + " is not " + this.Verified;
  AccountStatusIsFormat = this.Account + " " + this.Status + " is {0}";
  Unable = "Unable";
  UnableToSendEmail = this.Unable + " to send " + this.Email;
  UpdatedSuccessfullyFormat = "{0} " + this.Updated + " " + this.Successfully;
  Passwords = this.Password + "(s)";
  Use = "Use";
  Cannot = "Can not";
  Previous = "Previous";
  CannotUsePreviousPasswords =
    this.Cannot + " " + this.Use + " " + this.Previous + " " + this.Passwords;
  DecentralizedApps = "Decentralized Apps";
  or = "or";
  QuestionMark = "?";
  Crypto = "Crypto";
  Coin = "Coin";
  CryptoCoin = this.Crypto + " " + this.Coin;
  LoginPageSignupPara =
    "Signing Up and start trading on a secure crypto trade platform";
  GetAnAccount = "Get an account!!!";
  Volume24H = "24H " + this.Volume;
  Change24H = "24H " + this.Change;
  High24H = "24H " + this.High;
  Low24H = "24H " + this.Low;
  History = "History";
  OrderHistory = this.Order + " " + this.History;
  Detailed = "Detailed";
  DetailedHistory = this.Detailed + " " + this.History;
  Pending = "Pending";
  PendingOrders = this.Pending + " " + this.Orders;
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
  Conditions = "Conditions";
  Privacy = "Privacy";
  Policy = "Policy";
  TermsAndConditions = this.Terms + " & " + this.Conditions;
  PrivacyPolicy = this.Privacy + " " + this.Policy;
  And = "and";
  TermsOfUse = "By signing up on BitVelocity, you agree to our";
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
  MainPageHeader = `Buy your digital assets in native currency pairs to reduce huge conversion cost.
        Now supporting buying in GBP, Euro and USD`;
  Expert = "Expert";
  ExpertSupport = this.Expert + " " + this.Support;
  ExpertSupportPara =
    "We target to ensure that your query is answered in best possible way with guidance on Account verification, KYC, Fiat deposits, Security and Trading.";
  Safe = "Safe";
  Secure = "Secure";
  SafeAndSecurePara =
    "We follow best industry practices back-end with customized security to protect your coins";
  Fees = this.Fee + "s";
  Advanced = "Advanced";
  Ordering = "Ordering";
  AdvancedOrdering = this.Advanced + " " + this.Ordering;
  AdvancedOrderingPara =
    "Order limit and stop loss to automate your strategy and minimize the trading risk";
  Reliability = "Reliability";
  ReliabilityPara = "Reliable service with 24x7 support via email";
  Offline = "Offline";
  Storage = "Storage";
  OfflineStorage = this.Offline + " " + this.Storage;
  OfflineStoragePara =
    "Majority of the digital assets are stored offline to prevent hackers attacks";
  Standard = "Standard";
  Register = "Register";
  RegisterPara =
    "Registration is easy and will help you keep track of your assets";
  KYC = "KYC";
  GetKYCVerifiedPara =
    "As per regulatoring requirements, we will only allow customers that have passed our KYC criteria";
  Make = "Make";
  Fiat = "Fiat";
  Debit = "Debit";
  Credit = "Credit";
  Card = "Card";
  MakeFiatDepositPara =
    "Buy instantly with debit/credit card or deposit Euro/USD to convert to crypto";
  Start = "Start";
  Buying = "Buying";
  StartBuyingPara = "Start trading. Or be a long-term holder";
  GetKYCVerified = this.Get + " " + this.KYC + " " + this.Verified;
  MakeFiatDeposit = this.Make + " " + this.Fiat + " " + this.Deposit;
  RegisterDebitCreditCard =
    this.Register + " " + this.Debit + "/" + this.Credit + " " + this.Card;
  StartBuying = this.Start + " " + this.Buying;
  How = "How";
  Trading = "Trading";
  StartTradingNow = this.Start + " " + this.Trading + " " + this.Now;
  Brief = "Brief";
  BriefHistory = this.Brief + " " + this.History;
  MapComponentHeading = "Covering major Eurpeon countries and US";
  MapComponentPara =
    "We offer easy and simple steps to buy crypto taking hassle away from our clients letting them focus on things that actually matter the cryptocurrency marketcap is always increasing and is expected to reach multi trillion dollar industry";
  Part = "Part";
  PartBuying = this.Part + " " + this.Buying;
  PartBuyingPara =
    "Schedule weekly or monthly direct debits from your account for buying cryptocurrency in parts";
  SupportPara =
    "We target to ensure that your query is answered in best possible way with guidance on Account verification, KYC, Fiat deposits, Security and Trading";
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
  MarketStatistics = this.Market + " " + this.Statistics;
  Center = "Center";
  SupportCenter = this.Support + " " + this.Center;
  Knowledge = "Knowledge";
  Base = "Base";
  KnowledgeBase = this.Knowledge + " " + this.Base;
  Social = "Social";
  OurFees = this.Our + " " + this.Fees;
  ForgotYourPassword = this.Forgot + " " + this.Your + " " + this.Password;
  ForgotYourPasswordPara =
    "Don't worry. Recovering the password is easy. Just tell us the email you have registered with";
  Recovery = "Recovery";
  PasswordRecoveryEmailSentPara =
    "We've sent you a " +
    this.Password +
    " " +
    this.Recovery +
    " " +
    this.Email +
    ". Please follow the instructions mentioned there";
  PasswordRecovery = this.Password + " " + this.Recovery;
  Set = "Set";
  SetNewPassword = this.Set + " " + this.New + " " + this.Password;
  Update = "Update";
  Token = "Token";
  Try = "Try";
  Warning = "Warning";
  My = "My";
  MyAccount = this.My + " " + this.Account;
  Selection = "Selection";
  AccountTypeSelection = this.AccountType + " " + this.Selection;
  Proof = "Proof";
  Identity = "Identity";
  Income = "Income";
  ProofOfIdentity = this.Proof + " of " + this.Identity;
  ProofOfAddress = this.Proof + " of " + this.Address;
  ProofOfIncome = this.Proof + " of " + this.Income;
  AccountForAnIndividual = this.Account + " for an " + this.Individual;
  AccountForBusiness = this.Account + " for " + this.Business;
  ProofOfBusiness = this.Proof + " of " + this.Business;
  Verify = "Verify";
  BusinessName = this.Business + " " + this.Name;
  Country = "Country";
  Operation = "Operation";
  CountryOfOperation = this.Country + " " + this.Operation;
  Incorporation = "Incorporation";
  DateOfIncorporation = this.Date + " of " + this.Incorporation;
  Birth = "Birth";
  BirthDate = this.Birth + " " + this.Date;
  Submitted = this.Submit + "ted";
  Not = "Not";
  NotSubmitted = this.Not + " " + this.Submitted;
  NotVerified = this.Not + " " + this.Verified;
  Nationality = "Nationality";
  Personal = "Personal";
  Information = "Information";
  PersonalInformation = this.Personal + " " + this.Information;
  Basic = "Basic";
  BasicInformation = this.Basic + " " + this.Information;
  Next = "Next";
  Passport = "Passport";
  National = "National";
  NationalIdentityCard = this.National + " " + this.Identity + " " + this.Card;
  Resident = "Resident";
  Permit = "Permit";
  ResidentPermit = this.Resident + " " + this.Permit;
  Driving = "Driving";
  License = "License";
  DrivingLicense = this.Driving + " " + this.License;
  Statement = "Statement";
  BankStatement = this.Bank + " " + this.Statement;
  Utility = "Utility";
  Bill = "Bill";
  Bills = this.Bill + "(s)";
  UtilityBill = this.Utility + " " + this.Bill;
  Wages = "Wages";
  Slip = "Slip";
  WagesSlip = this.Wages + " " + this.Slip;
  Certification = "Certification";
  Certificate = "Certificate";
  BusinessIncorporationCertificate =
    this.Business + " " + this.Incorporation + " " + this.Certificate;
  Memorandum = "Memorandum";
  Association = "Association";
  MemorandumOfAssociation = this.Memorandum + " of " + this.Association;
  Tax = "Tax";
  Document = "Document";
  Documents = this.Document + "(s)";
  TaxDocument = this.Tax + " " + this.Document;
  Picture = "Picture";
  Front = "Front";
  FrontPicture = this.Front + " " + this.Picture;
  BackPicture = this.Back + " " + this.Picture;
  Attachment = "Attachment";
  Attachments = this.Attachment + "(s)";
  atLeast = "at-least";
  Section = "Section";
  Sections = this.Section + "(s)";
  SelectatLeastsectionsFormat =
    this.Select + " " + this.atLeast + " {0} " + this.Sections.toLowerCase();
  SelectatLeastdocumentsFormat =
    this.Select + " " + this.atLeast + " {0} " + this.Documents.toLowerCase();
  SelectDocumentType = this.Select + " " + this.Document + " " + this.Type;
  Click = "Click";
  Drag = "Drag";
  Upload = "Upload";
  ClickOrDragFileToUpload =
    this.Click + " or " + this.Drag + " " + this.File + " to " + this.Upload;
  PleaseTryAgain = this.Please + " " + this.Try + " " + this.Again;
  SomethingWentWrong = "Something went wrong";
  MaxAttachmentSizeFormat = "Maximum " + this.Attachment + " size is {0}";
  Expired = "Expired";
  SessionExpired = this.Session + " " + this.Expired;
  ProofsAttachmentAlert = `Please select a valid, clear and color picture`;
  Post = "Post";
  Postal = this.Post + "al";
  Code = "Code";
  PostalCode = this.Postal + " " + this.Code;
  City = "City";
  Expected = "Expected";
  Invest = "Invest";
  Investment = this.Invest + "ment";
  ExpectedAmountOfInvestment =
    this.Expected + " " + this.Amount + " of " + this.Investment;
  HighlyExperienced = this.Highly + " " + this.Experienced;
  ReliableAndTrustable = this.Reliable + " & " + this.Trustable;
  IndustryExpertsPara = "industry experts";
  Digital = "Digital";
  Evidence = "Evidence";
  DigitalEvidence = this.Digital + " " + this.Evidence;
  PerMonth = "Per Month";
  IncomePerMonth = this.Income + " " + this.PerMonth;
  Maximum = "Maximum";
  MaximumAttachmentsAllowedForRequirementFormat =
    this.Maximum + " {0} " + this.Attachments + " are allowed for {1}";
  MinimumAttachmentsRequirementFormat =
    "At-least {0} " + this.Attachments + " are required for {1}";
  While = "While";
  Saving = "Saving";
  ErrorOccuredWhileSavingFormat =
    this.ErrorOccured + " " + this.While + " " + this.Saving + " {0}";
  Files = this.File + "(s)";
  Uploaded = this.Upload + "ed";
  MaximumFilesCanBeUploadedFormat =
    this.Maximum + " {0} " + this.Files + " can be " + this.Uploaded;
  Partially = "Partially";
  PartiallyApproved = this.Partially + " " + this.Approved;
  PartiallySubmitted = this.Partially + " " + this.Submitted;
  PartiallyVerified = this.Partially + " " + this.Verified;
  Review = "Review";
  Higher = "Higher";
  Limits = this.Limit + "(s)";
  HigherDepositAndWithdrawalLimits =
    this.Higher +
    " " +
    this.Deposit +
    " and " +
    this.Withdrawal +
    " " +
    this.Limits;
  BankAccount = this.Bank + " " + this.Account;
  WithdrawalRequest = this.Withdrawal + " " + this.Request;
  Currencies = "Currencies";
  CryptoCurrencies = this.Crypto + " " + this.Currencies;
  FiatCurrencies = this.Fiat + " " + this.Currencies;
  WithdrawalRequests = this.WithdrawalRequest + "(s)";
  Add = "Add";
  AddBankAccount = this.Add + " " + this.BankAccount;
  BranchCode = this.Branch + " " + this.Code;
  Saved = "Saved";
  SavedSuccessfully = this.Saved + " " + this.Successfully;
  NewBankAccountAlert =
    "Please enter your bank account details properly and double check it. In case of wrong bank account details, you may lost your funds"; // or withdrawal process may take more time than usual";
  WithdrawalMethod = this.Withdrawal + " " + this.Method;
  Daily = "Daily";
  Monthly = "Monthly";
  DailyLimit = this.Daily + " " + this.Limit;
  MonthlyLimit = this.Monthly + " " + this.Limit;
  ExchangeFee = this.Exchange + " " + this.Fee;
  ThirdParty = "Third Party";
  ThirdPartyFee = this.ThirdParty + " " + this.Fee;
  Charges = "Charges";
  BankCharges = this.Bank + " " + this.Charges;
  Logon = "Logon";
  LastLogon = this.Last + " " + this.Logon;
  Current = "Current";
  CurrentSession = this.Current + " " + this.Session;
  CurrentTime = this.Current + " " + this.Time;
  UpdatePicture = this.Update + " " + this.Picture;

  //SUPPORT CENTER//
  Money = "Money";
  Transfer = "Transfer";
  Appliction = "Application";
  Bugs = "Bugs";
  Reporting = "Reporting";
  Authentication = "Authentication";
  Issues = "Issues";
  Title = "Title";
  title = "title";
  Complaint = "Complaint";
  SubmitAComplaint = this.Submit + " a " + this.Complaint;
  ///////////////////////////////////////////////////////////

  // COMPANY ROADMAP/////////////////////////////////////////////
  InvestorZonePara = `The seed round for Velocity Solutions Ltd. was completed in July
 2017. Historically we have not actively looked for external
 investments, however we are always open to good strategic partners
 that can help us grow our business. We only welcome investors who
 are passionate about digital assets and blockchain technologies. For
 further information in participation of Velocity Solutions as
 investor, please fill the form below and our team will be in contact
 with you.`;
  //YEARS
  twoThousandSixteen = "2016";
  twoThousandSeventeen = "2017";
  twoThousandEighteen = "2018";
  twoThousandNineteen = "2019";
  twoThousandTwenty = "2020";
  quater1 = "Q1";
  quater2 = "Q2";
  quater3 = "Q3";
  quater4 = "Q4";

  STO = "STO";
  Incorporated = "Incorporated";
  Seed = "Seed";
  Completed = "Completed";
  Design = "Design";
  Technical = "Technical";
  Architecture = "Architecture";
  Liquidity = "Liquidity";
  Partners = "Partners";
  Agreement = "Agreement";
  Signed = "Signed";
  Offering = "Offering";
  Whitepaper = "Whitepaper";
  Development = "Development";
  DAT = "DAT";
  Platform = "Platform";
  Available = "Available";
  Public = "Public";
  Asset = "Asset";
  Live = "Live";
  Companies = "Companies";
  Investors = "Investors";
  Completion = "Completion";
  Payment = "Payment";
  SeedFundingCompleted = this.Seed + " " + this.Funding + " " + this.Completed;
  ExchangeDesign =
    this.Exchange +
    " " +
    this.Design +
    " & " +
    this.Technical +
    " " +
    this.Architecture;
  TechnicalDesign =
    this.Technical +
    " " +
    this.Design +
    " & " +
    this.Technical +
    " " +
    this.Architecture;
  LiquidityPartners =
    this.Liquidity +
    " " +
    this.Partners +
    " " +
    this.Agreement +
    " " +
    this.Signed;
  SecurityTokenOffering =
    this.Security +
    " " +
    this.Token +
    " " +
    this.Offering +
    " " +
    this.Whitepaper;
  DigitalAssetTrading =
    this.Digital +
    " " +
    this.Asset +
    " " +
    this.Trading +
    " " +
    this.Platform +
    " " +
    this.Completion;
  DATPlatformAvailable =
    this.DAT +
    " " +
    this.Platform +
    " " +
    this.Available +
    " for " +
    this.Public;
  EMoneyLicense =
    "E-" + this.Money + " " + this.License + " " + this.Appliction;
  STOPlatformDevelopment =
    this.STO + " " + this.Platform + " " + this.Development;
  STOPlatformDevelopmentLive =
    this.STO +
    " " +
    this.Platform +
    " " +
    this.Live +
    " for " +
    this.Companies +
    " & " +
    this.Investors;
  AboutHeading = "Digital Asset Exchange Headquatered in UK";

  /////////////////////////////// BLOCKCHAIN PAPERS ///////////////////////////////////////////
  //----------------------REAL ESTATE CONTENT----------------------//
  BlockChainPageCaption = "All Roads Lead to Blockchain";
  RealEstatePaperHeading1 = "Blockchain in Real Estate";
  RealEstatePaperHeading2 = "Purchasing Real Estate with Crypto";
  RealEstatePaperHeading3 = "Security and Transparency";
  RealEstatePaperHeading4 = "Data for Everyone";
  RealEstatePaperHeading5 = "BitVelocity as Liquidity Provider";

  RealEstatePaperPara1 = `Investors who bought Bitcoin and Ethereum at
 early stages are now sitting on big fortunes and are actively looking to
 convert these fortunes into tangible assets. Many times buyers want to
 purchase a real estate from cryptos however sellers are mostly declining as
 they are not certain how the transaction will work out, and how will they get
 the real liquidity from their asset sale. This is where BitVelocity will act
 as a liquidity provider—acting as a middleman in such cases.`;
  RealEstatePaperPara2 = `The beauty of
 such solution is that seller will be paid in Fiat currency of their choice
 (USD, Euro, GBP), hence avoiding crypto volatility risks, and both buyer or
 seller or even estate agents will not have to fear losing any deal since seller will 
 be able to seal the deal without having to deal with crypto in the process. 
 In such cases, we receive the crypto from buyer, perform liquidity at our end 
 and send fiat to the seller. Actual amount sellers and buyers will also have an option to do the
 transaction in small tranches in order to gain more trust of all parties/
 This way all parties get to keep the deal, seller is happy, buyer is
 happy, hence we are happy.`;
  RealEstatePaperPara3 = `Blockchain based property offer Echosystem In both commercial and residential 
  real estate market, there is a serious lack of transparency that ultimately defines the sold price. 
  While both sellers and property agents claim that already have real offers higher than the offers made 
  by sellers, they get outpriced by hype created by market players. With blockchain technology, we will place real offers onto the blockchain, hence open to public for validation. Using the pattern 
  and trend recognition algo, we will eliminate the bad players, resulting a transparent and honest bidding system for property market making more stable and 
  realistic sale price for each property.`;
  RealEstatePaperPara4 = `Bidding data and its history will
 be available to public for future deals. This is in particular very useful
 in commercial and corporate properties when high worth deals are done well
 in time before the property gets to the real public. `;
  RealEstatePaperPara5 = `Acting as Liquidity provider for both buyers and sellers. We believe in solutions that not only
             bring disruption but also are compatible with existing system. For both
             buyers and sellers just want to convert their digital assets into cryptos or
             convert the fiat funds into cryptos after the sale we would act as a
             conversion platform. Both buyers and sellers can receive the funds in the
             currency of their choice (GBP, Euro, USD) with fraction of conversation fees.
 `;

  //----------------------TRAVEL PAPER CONTENT----------------------//
  Introduction = "Introduction";
  TravelPaperHeading1 = "Blockchain for Travel";
  TravelPaperHeading2 = `Problem to Solve`;
  TravelPaperHeading3 = `Massive Cost Reduction`;
  TravelPaperHeading4 = `Future Plan`;

  TravelPaperPara1 = `Emergence of blockchain applications and non-financial use cases is
 expanding everyday, one such promising usecase that is of particular
 interest to use is travel & tourism. This makes more sense since the
 company Founder has come from background working in Travel & Tourism
 industry for many years.`;
  TravelPaperPara2 = `Our facility will reduce dependency on foreign banks and hence reduce the
 related, often excessive, fees. A typical speed of buying a foreign
 currency for traveller’s forex is 2.7% which then becomes 5% once the
 converted foreign currency is revesed back to original currency on return
 of travel. With BitVelocity, once live, we will have the infrastruce to
 reduce this cost to as low as 0.5%.`;
  TravelPaperPara3 = `After a successful launch of social crypto platform we intend
 to offer our crypto marketplace to travellers and tourists. Users like
 traders and investors will already benefit from the platform since holding
 BTC or XRP on the platform they can either pay direct in BTC or XRP. Eventually
 paying a little fraction of a cost to what a forex exchange would charge. On our platform, users 
 can convert their crypto to local currency and then spend, again paying very little of a cost to 
 what a fiat currency would charge. Converting to fiat, they will be able to spend
 using our digital app as if they were using a debit cards.`;
  TravelPaperPara4 = `Future plan for
 travellers includes travel debit card, that will have debit cards
 with local currency (GBP, Euro, USD) hence eliminating the need to
 exchange to foreign currency completely.`;

  //////////////////////////////FAQ////////////////////////////////////////////
  Getting = "Getting";
  Started = "Started";
  Managment = "Managment";

  GSQuestion1 = "What is BitVelocity?";
  GSQuestion2 = "How do I get started?";
  GSQuestion3 =
    "Which countries are currently where BitVelocity is operational?";
  GSAnswer1 =
    "BitVelocity is a secure, real-time, social, crypto trading solution for digital assets.";
  GSAnswer2 = "To get started, you can start sign up process";
  GSAnswer3 =
    "BitVelocity is currently functional in UK, Euro, and US. Soon our platform will go in many other countries.";

  AMQuestion1 = "How to create an account?";
  AMQuestion2 = "How to retrieve a lost password?";
  AMQuestion3 = "How to setup two-factor authentication?";
  AMAnswer1 = "You can create an account on our platform by signing up";
  AMAnswer2 = `You can retrive your lost password by giving us the recovery email on password-recovery page here. 
 We will send you an email with a code then you can give us that code back to create a new password.`;
  AMAnswer3 =
    "We support Google Authenticator for two-factor authentication. You can setup 2FA under your account. ";

  TradeQuestion1 = "How do I buy crypto assets?";
  TradeQuestion2 = "How do I buy sell assets?";
  TradeQuestion3 = "What is the minimum amount for trading?";
  TradeAnswer1 = `First, you need to register on our site. Then, you need to get KYC verified. Once verification process is completed, your account is available for 
 funding fiat deposits`;
  TradeAnswer2 = `First, you need to register on our site. Then, you need to get KYC verified. Once verification process is completed, your account is available for 
 funding fiat deposits`;
  TradeAnswer3 = "The minimum trading limit is £10.";

  FeesQuestion1 = "What is the deposit fee?";
  FeesQuestion2 = "What is the withdrawl fee while trading on BitVelocity?";
  FeesQuestion3 = "Are there any other charges?";
  FeesAnswer1 =
    "Deposit fee for the deposit of 10 to 25 euros is £1.99. For 25 to 100 euros is £4.99, and for more than 100£, it is 10£. To view other fees, click";
  FeesAnswer2 = `When the amount traded is less than 250£, buying fee is 0.9% and selling fee is 0.49%.  
  When the amount traded is more than £250, buying fee is 0.3% and selling fee is 0.19%. To view other fees, click`;
  FeesAnswer3 =
    "We charge on deposits and withdrawls plus there is a small charge on each buy and sell trade.";

  SecurityQuestion1 = "What is KYC?";
  SecurityQuestion2 = "How can I get KYC verified on BitVelocity?";
  SecurityQuestion3 = "How are my assets kept secured?";
  SecurityAnswer1 =
    "KYC means Know Your Customer. It is a procedure to identify clients and source of income as per the regulations of corresoponding jurisdiction.";
  SecurityAnswer2 =
    "To get KYC verified, you need to upload your identity documents, proof of address and source of income.";
  SecurityAnswer3 = `We keep 95% of assets in storage. We have great record of providing security to our customers, and is safe from external hacks since the first day. 
 For security reasons, we don't offer crypto withdrawls on trading platform. Users have to make a withdrawl request on email for crypto withdrawls, and it is only done after verification of each withdrawl requests.`;

  PayQuestion1 = "What payment methods are available?";
  PayQuestion2 = "How long does it take to recieve bank deposits?";
  PayQuestion3 = "How long does it take to recieve payment?";
  PayAnswer1 =
    "We are currently supporting bank deposits. However, we will be support credit and debit card in near future.";
  PayAnswer2 =
    "Within UK, we aim to credit the deposits within the week of receiving the payment. For EU and US customers, it can take upto 2 to 4 weeks to recieve deposit.";
  PayAnswer3 =
    "Within UK, we aim to credit the withdrawls within the week of receiving the payment. For EU and US customers, it can take upto 2 to 4 weeks to recieve withdrawls.";

  ///////////////////////////////////////////////////////////////////////////////////
  BitVelocityMail = "fk@bitvelocity.io";
  Contact = "Contact";
  InvestorsZone = "Investors Zone";
  TradeDemo = "Trade Demo";
  Withdrawl = "Withdrawl";
  Phone = "Phone";
  Mobile = "Mobile";
  Articles = "Articles";
  Roadmap = "Roadmap";
  Popular = "Popular";
  SupportIntro = "How can we help?";
  SupportIntroPara = `Our Team is ready to assist you 24/7. If you need any help getting
  started, request a feature, or have trouble finding a tool, get in
  touch so we can help you.`;
  ArticleHeading1 = "How Blockchain is going to change the way people travel";
  ArticleHeading2 = "Blockchain, Real Estate, and a new Future";

  BitVelocityPhone = "+44 203 620 7120";
  BitVelocityMobile = "+44 79 15 220 209";

  SecurityIntroPara = `At BitVelocity, we put security and privacy of users' data at the
  top of our priority list. Securing users data and protecting the
  integrity of every execution of deal that is made on our platform is
  paramount to us. Our network and security engineers are working
  assiduously every day to make the system impenetrable so users' data
  is never misused or exposed to any malicous party whatsoever. Using
  modern available techniques, our engineers have made sure that
  BitVelocity is as secured as it can be.`;
  TwoFactorAuthHeading = "Two-Factor Auth";
  TwoFactorAuthPara = `Users can setup 2-factor authentication by installing google authenticator in the mobile app.`;
  DDosHeading = `DDoS Protection`;
  DDosPara = `Diligently designed, highly protected crypto network against
  DDOS attacks and all other network attacks.`;
  OfflineStoragePara1 = ` Offline Storage of 95% assets to ensure peace of mind to
  investors and traders`;
  Multisig = "Multisig";
  MultisigWalletPara = `Enhanced security by multisignature wallet to promote
  decentralization in exchange.`;
  Today = "Today";

  SaveMoney1 = `Saving cost of fiat conversion from GBP, Euro and USD. Buying
  digital assets directly from local fiat currency (initially to
  be launched in UK, then Europe and finally US and Asia).`;
  SaveMoney2 = ` As low as 0.49% on buy/sell spreads for trades on internal
    exchange`;
  SaveMoney3 = `Upto 90% savings on buying/selling fee on trades compared to
  market.`;

  Mission = "Mission";
  AboutIntroPara = `BitVelocity is a secure, real-time, social, crypto trading solution
  for digital assets. BitTrade will be our the first commercial
  product targeted to be launched by Q2 2019 in production. Based on
  our smart proprietary trading system using Artificial Intelligence
  to analyze critical data and predict market trends.`;

  AboutMission = `Innovate solutions using blockchain technology that can solve real
  world problems for humans by offering easy access to digital assets,
  reduce cost and effort for startups and established institution’s to
  raise capital in tokenized economy.`;

  Why = "Why";
  Bit = "Bit";
  Velocity = "Velocity";
  Tokenization = "Tokenization";
  AI = "AI";
  TA = "TA";
  Tools = "Tools";
  Forecast = "Forecast";

  AboutPara1 = `Diligently designed, highly secure crypto framework to prevent
  any network hack.`;
  AboutPara2 = `Offline Storage of 95% assets to ensure peace of mind to
  investors and traders`;
  AboutPara3 = ` Enhanced security by multisignature wallet to promote
  decentralization in exchange.`;
  AboutPara4 = `Bringing digital tokenization of real world assets in for of
  STOs`;
  AboutPara5 = ` AI to forecast market trends, algorithms based on fundamentals
  and technical`;
  AboutPara6 = `Market standard TA tools available for all the listed assets.`;

  CEOPara = ` Fahad Sheikh is a technology evangelist, an enterprenuer who has built
  successful startups previously, has run 3 development studios in 3 different
  cities at a given time, an investor, a technology consultant and someone who
  believes in solving real world problems using technology.`;

  TeamPara = `Our team is a collection of people who are working day in, day out to make a
  product that lives up to not only the expectations of its users, but also to
  their own expectations. It's a diverse group of people from different
  backgrounds and areas of experties, recruited by the founder of the company to
  work in tandem to build his promising platform in the light of his vision.`;

  FeeLine1 = "Most reasonable rates in the market.";
  FeeLine2 = "Only upfront charges. No hidden fees.";
  FeeLine3 = "Most of the services without any charges.";
  FeeLine4 = "Charges only for the buy/sell spreads.";
  FeeFooter = `For transactons that are international, currency convertion
  rates may apply through the relavant currency-conversion service
  provider or by the laws and authorities of user's current
  location`;

  DontHaveAccount = "Don't have an account? Create a new account";
  Coming = "Coming";
  Soon = "Soon";
  STOPlaceholder =
    "Come back soon to find a Security Token Offering (STO) page here.";
  ////////////////////////////---TERMS & CONDITIONS---////////////////////////////////////////////
  TermsContent = ` `;

  TermsHeading1 = "Agreement Conditions";
  TermsHeading2 = "Eligibility";
  TermsHeading3 = "Prohibition of use";
  TermsHeading4 = "Description of services";
  TermsHeading5 = "Binance Account Registration & Requirements";
  TermsHeading6 = "a. Registration";
  TermsHeading7 = "b. User Identity Verification";
  TermsHeading8 = "c. Account Usage Requirements";
  TermsHeading9 = "d. Account Security";
  TermsHeading10 = "6. Guidelines for Usage of the Services";
  TermsHeading11 = "a. License";
  TermsHeading12 = "b. Restrictions";
  TermsHeading13 = "7. Orders and Service Fees";
  TermsHeading14 = "a. Orders";
  TermsHeading15 = "b. Cancellations";
  TermsHeading16 = "c. Fees";
  TermsHeading17 = "8. Liability";
  TermsHeading18 = "a. Disclaimer of Warranties";
  TermsHeading19 = "b. Disclaimer of Damages and Limitation of Liability";
  TermsHeading20 = "c. Indemnification";
  TermsHeading21 = "9. Announcements";
  TermsHeading22 = "10. Termination of Agreement";
  TermsHeading23 = "a. Remaining funds after Account termination";
  TermsHeading24 =
    "b. Remaining funds after Account termination due to fraud, violation of law, or violation of these terms)";
  TermsHeading25 = "11. No Financial Advice";
  TermsHeading26 = "12. Compliance with Local Laws";
  TermsHeading27 = "13. Privacy Policy";
  TermsHeading28 =
    "14. RESOLVING DISPUTES: FORUM, ARBITRATION, CLASS ACTION WAIVER, GOVERNING LAW";
  TermsHeading29 = "a. Notification of Dispute.";
  TermsHeading30 = "b. Agreement to Arbitrate.";
  TermsHeading31 = "c. Arbitration Procedure.";
  TermsHeading32 = "d. Exceptions.";
  TermsHeading33 = "e. Notice.";
  TermsHeading34 = "f. Controlling Law.";
  TermsHeading35 = "15. Miscellaneous";
  TermsHeading36 = "a. Independent Parties.";
  TermsHeading37 = "b. Entire Agreement. ";
  TermsHeading38 = "c. Force Majeure.";
  TermsHeading39 = "d. Severability.";
  TermsHeading40 = "e. Assignment.";
  TermsHeading41 = "f. Waiver.";
  TermsHeading42 = "g. Third-Party Website Disclaimer.";
  TermsHeading43 = "h. Contact Information.";

  TermsPara1 = `This agreement is between you (referenced herein as “you” or with “your”) and BitVelocity. By accessing, using or clicking “I agree” to any of the services made available by BitVelocity or one of its affiliates through the website (https://www.bitvelocity.io), the API, our mobile applications, or any other related services provided by BitVelocity or its affiliates as further described in Section 4 below (collectively, the “Services”) you agree that you have read, understood and accepted all of the terms and conditions contained in this Terms of Use agreement (the or these “Terms”), as well as our Privacy Policy found at https://www.bitvelocity.io/statement.html. Additionally, when using certain features of the Services, you may be subject to additional terms and conditions applicable to such features.`;
  TermsPara2 = `PLEASE READ THESE TERMS CAREFULLY AS THEY GOVERN YOUR USE OF THE SERVICES. THESE TERMS CONTAINS IMPORTANT PROVISIONS INCLUDING AN ARBITRATION PROVISION THAT REQUIRES ALL CLAIMS TO BE RESOLVED BY WAY OF BINDING ARBITRATION. THE TERMS OF THE ARBITRATION PROVISION ARE SET FORTH IN SECTION 14 BELOW ENTITLED “RESOLVING DISPUTES: FORUM, ARBITRATION, CLASS ACTION WAIVER, GOVERNING LAW.” AS WITH ANY ASSET, THE VALUE OF DIGITAL CURRENCIES CAN GO UP OR DOWN AND THERE CAN BE A SUBSTANTIAL RISK THAT YOU WILL LOSE MONEY BUYING, SELLING, HOLDING, OR INVESTING IN DIGITAL CURRENCIES. BY USING THE SERVICES YOU ACKNOWLEDGE AND AGREE THAT (1) YOU ARE AWARE OF THE RISKS ASSOCIATED WITH TRANSACTING IN DIGITAL CURRENCIES (2) THAT YOU ASSUME ALL RISKS WITH RESPECT TO YOUR USE OF THE SERVICES AND TRADING IN DIGITAL CURRENCIES AND (3) BitVelocity IS NOT RESPONSIBLE OR LIABLE FOR ANY SUCH RISKS OR ADVERSE OUTCOMES.`;
  TermsPara3 = `BY ACCESSING, USING OR ATTEMPTING TO USE THE SERVICES IN ANY CAPACITY, YOU ACKNOWLEDGE THAT YOU ACCEPT AND AGREE TO BE BOUND BY THESE TERMS. IF YOU DO NOT AGREE, DO NOT ACCESS OR USE THE SERVICES.`;
  TermsPara4 = `BitVelocity reserves the right to modify or change the Terms at any time and at its sole discretion. Any and all modifications or changes to these Terms will be effective immediately upon being announced on the website or released to users. As such, your continued use of BitVelocity’s services acts as acceptance of the amended agreement and rules. If you do not agree to any modification to these Terms, you must stop using the Services. BitVelocity encourages you to frequently review the Terms to ensure you understand the terms and conditions that apply to your access to, and use of, the Services.
  `;
  TermsPara5 = `By registering to use a BitVelocity Account (as defined in Section 5 below), you represent and warrant that you (a) are at least 18 years old or of legal age to form a binding contract under applicable law, (b) are an individual, legal person or other organization with full legal capacity and authority to enter into these Terms, (c) have not previously been suspended or removed from using our Services and (d) you do not currently have an existing BitVelocity Account. If you are entering into these Terms on behalf of a legal entity of which you are an employee or agent, you represent and warrant that you have all necessary rights and authority to bind such legal entity.
  `;
  TermsPara6 = `By accessing and using the Services, you represent and warrant that you are not on any trade or economic sanctions lists, such as the UN Security Council Sanctions list, designated as a “Specially Designated National” by OFAC (Office of Foreign Assets Control of the U.S. Treasury Department) or placed on the U.S. Commerce Department’s “Denied Persons List”. BitVelocity maintains the right to select its markets and jurisdictions to operate and may restrict or deny the Services in certain countries at its discretion.
  `;
  TermsPara7 = `BitVelocity provides an online digital asset trading platform (crypto to crypto) for products commonly known as cryptographic tokens, digital tokens or cryptographic currency (collectively, “Digital Currency”). BitVelocity does not provide fiat trading capabilities on as part of the Services. BitVelocity functions as a trading platform provider and not as a buyer or seller in trades made between traders. BitVelocity is also not a market maker. Users must register and open an account with BitVelocity as further set forth in Section 5 below and deposit digital assets prior to commencement of trading. Traders may request the withdrawal of their digital assets, subject to the limitations as stated in these Terms.
  `;
  TermsPara8 = `BitVelocity strives to maintain the accuracy of information posted on the Services however it cannot and does not guarantee the accuracy, suitability, reliability, completeness, performance or fitness for any purpose of the content made available through the Services, and will not be liable for any loss or damage that may arise directly or indirectly from your use of such content. Information on the Services can be subjected to change without notice and is provided for the primary purpose of facilitating users to arrive at independent decisions. BitVelocity does not provide investment or advisory advice and will have no liability for the use or interpretation of information as stated on the Services or other communication mediums. All users of the Services must understand that there are risks involved in trading in Digital Currencies. BitVelocity encourages all users to exercise prudence and trade responsibly within their own means.
  `;
  TermsPara9 = `All users of the Services (each, a “User”) must register at (https://www.bitvelocity.io/account/signUp) for a BitVelocity account (an “Account”) before using the Services. To register for an Account, you must provide your real name, email address and password, as well as accept the Terms of Use, Privacy Policy and Consent Form. BitVelocity may, in its sole discretion, refuse to open an account for you. You agree to provide complete and accurate information when opening an Account and agree to promptly update any information you provide to BitVelocity so that such information is complete and accurate at all times. Each registration is for a single user only and each User (including with respect to any User that is a business or legal entity) may only maintain one active Account with BitVelocity.
  `;
  TermsPara10 = `With registration of an account on BitVelocity, you agree to share personal information requested for the purposes of identity verification. This information is used specifically for the detection of money laundering, terrorist financing, fraud and other financial crimes on the BitVelocity platform. We will collect, use and share this information in accordance with our posted Privacy Policy. In addition to providing this information, to facilitate compliance with global industry standards for data retention, you agree to permit us to keep a record of such information for the lifetime of your account plus 5 years beyond account closing. You also authorise us to make inquiries, either directly or through third parties, that are deemed necessary to verify your identity or to protect you and/or us against financial crimes such as fraud.
  `;
  TermsPara11 = `The identity verification information we request may include, but is not limited to, your: Name, Email Address, Contact Information, Telephone Number, Username, Government Issued ID, Date of Birth and other information collected at the time of account registration. In providing this required information, you confirm that it is accurate and authentic. Post-registration, you must guarantee that the information is truthful, complete and updated in a timely manner with any changes. If there is any reasonable doubt that any information provided by you is wrong, untruthful, outdated or incomplete, BitVelocity shall have the right to send you a notice to demand corrections, remove relevant information directly and, as the case may be, terminate all or part of the Services to you. You shall be solely and fully responsible for any loss or expenses incurred during the use of BitVelocity Service if you cannot be reached through the contact information provided. You hereby acknowledge and agree that you have the obligation to keep all information provided up to date if there are any changes.
  `;
  TermsPara12 = `BY SIGNING UP FOR ACCOUNT YOU HEREBY AUTHORIZE BitVelocity TO MAKE INQUIRIES, WHETHER DIRECTLY OR THROUGH THIRD PARTIES, THAT BitVelocity CONSIDERS NECESSARY TO VERIFY YOUR IDENTITY OR PROTECT YOU AND/OR BitVelocity AGAINST FRAUD OR OTHER FINANCIAL CRIMES, AND TO TAKE ACTION BitVelocity REASONABLY DEEMS NECESSARY BASED ON THE RESULTS OF SUCH INQUIRIES. YOU ALSO ACKNOWLEDGE AND AGREE THAT YOUR PERSONAL INFORMATION MAY BE DISCLOSED TO CREDIT REFERENCE AND FRAUD PREVENTION OR FINANCIAL CRIME AGENCIES AND THAT THESE AGENCIES MAY RESPOND TO OUR INQUIRIES IN FULL.
  `;
  TermsPara13 = `Accounts can only be used by the person whose name they are registered under. BitVelocity reserves the right to suspend, freeze or cancel accounts that are used by persons other than the persons whose names they are registered under. You shall immediately notify BitVelocity if you suspect or become aware of unauthorized use of your user name and password. BitVelocity will not be liable for any loss or damage arising from any use of your Account by you or by any third party (whether or not authorized by you).
  `;
  TermsPara14 = `BitVelocity strives to maintain the safety of those user funds entrusted to us and has implemented industry standard protections for the Services. However, there are risks that are created by individual User actions. You agree to consider your access credentials such as user name and password as confidential information and not to disclose such information to any third party. You also agree that you alone are responsible for taking necessary safety precautions to protect your own account and personal information.
  `;
  TermsPara15 = `
  You shall be solely responsible for the safekeeping of your BitVelocity account and password on your own, and you shall be responsible for all activities under Account and BitVelocity will not be responsible for any loss or consequences of authorized or unauthorized use of your Account credentials including but not limited to information disclosure, information posting, consent to or submission of various rules and agreements by clicking on the website, online renewal of agreement, etc.
  `;
  TermsPara16 = `By creating an Account, you hereby agree that: 
  (i) you will notify BitVelocity immediately if you are aware of any unauthorized use of your BitVelocity account and password by any person or any other violations to the security rules;
  (ii) you will strictly observe the security, authentication, dealing, charging, withdrawal mechanism or procedures of the website/service; and
  (iii) you will log out from the website by taking proper steps at the end of every visit.`;
  TermsPara17 = `Subject to your continued compliance with the express terms and conditions of these Terms, BitVelocity provides to you a revocable, limited, royalty-free, non-exclusive, non-transferable, and non-sublicensable license to access and use the Services on your computer or other internet compatible device for your personal, internal use only. You are not permitted to use the Services for any resale or commercial use including to place trades on behalf of another person or entity. All such use is expressly prohibited and shall constitute a material violation of these Terms. The content layout, formatting, and features of and access privileges for the Services shall be as specified by BitVelocity in its sole discretion. All rights not expressly granted under these Terms are hereby reserved. Accordingly, you are hereby prohibited from using the Services in any manner that is not expressly and unambiguously authorized by these Terms.
  `;
  TermsPara18 = `These Terms provide only a limited license to access and use the Services. Accordingly, you hereby agree that BitVelocity transfers no ownership or intellectual property interest or title in and to the Services or any BitVelocity intellectual property to you or anyone else in connection with your use of the Services. All text, graphics, user interfaces, visual interfaces, photographs, sounds, artwork, computer code (including html code), programs, software, products, information, and documentation as well as the design, structure, selection, coordination, expression, “look and feel,” and arrangement of any content contained on or available through the Services are exclusively owned, controlled, and/or licensed by BitVelocity or its members, parent(s), licensors, or affiliates.
  `;
  TermsPara19 = `
  BitVelocity will own any feedback, suggestions, ideas, or other information or materials regarding BitVelocity or the Services that you provide, whether by email, through the Services or otherwise (“Feedback”). You hereby assign to BitVelocity all right, title and interest to Feedback together with all associated intellectual property rights. You will not be entitled to, and hereby waive any claim for, acknowledgment or compensation based on any Feedback or any modifications made based on any Feedback.
  `;
  TermsPara20 = `When you use the Services you agree and covenant to observe the following:
  All the activities that you carry out during the use of the Services will be in compliance with the requirements of applicable laws, regulations, as well as the various guidelines of BitVelocity:
  Your use of the Services will not be in violation of public interests, public ethics or other’s legitimate interests including taking any action that would interfere with, disrupt, negatively affect, or inhibit other Users from using the Services:
  You agree not to use the services for engaging in market manipulation (such as pump and dump schemes, wash trading, self-trading, front running, quote stuffing, and spoofing or layering regardless of whether prohibited by law);
  The following commercial uses of BitVelocity data is prohibited unless written consent from BitVelocity is granted:
  1) Exchange services that use quotes or order book information from BitVelocity.
  2) Data feed or data stream services that make use of any market data from BitVelocity.
  3) Any other websites/apps/services that charge for, or otherwise commercially monetize (including through advertising or referral fees), market data obtained from BitVelocity.
  You may not modify, reproduce, duplicate, copy, download, store, further transmit, disseminate, transfer, disassemble, broadcast, publish, remove or alter any proprietary notices or labels, license, sublicense, sell, mirror, frame, rent, lease, private label, grant a security interest in, create derivative works of, or otherwise exploit the Properties, or any portion of the Properties without BitVelocity’s prior written consent.
  You may not (i) use any "deep link," "page scrape," "robot," "spider," or other automatic device, program, script, algorithm, or methodology, or any similar or equivalent manual process, to access, acquire, copy, or monitor any portion of the Properties or in any way reproduce or circumvent the navigational structure or presentation of the Services to obtain or attempt to obtain any materials, documents, or information through any means not purposely made available through the Services, (ii) attempt to gain unauthorized access to any portion or feature of the Properties or any other systems or networks connected to the Services or to any BitVelocity server or to any of the services offered on or through the Services, by hacking, password "mining," or any other illegitimate or prohibited means, (iii) probe, scan, or test the vulnerability of the Services or any network connected to the Properties, nor breach the security or authentication measures on the Services or any network connected to the Services, (iv) reverse look-up, trace, or seek to trace any information on any other user of or visitor to the Services, (v) take any action that imposes an unreasonable or disproportionately large load on the infrastructure of the Services or BitVelocity’s systems or networks or any systems or networks connected to the Services, (v) use any device, software, or routine to interfere with the proper working of the Services or any transaction conducted on the Services, or with any other person's use of the Services, (vi) forge headers, impersonate a person, or otherwise manipulate identifiers in order to disguise your identity or the origin of any message or transmittal you send to the Services, or (vii) use the Services in an unlawful manner.`;
  TermsPara21 = `By accessing the Service, you agree that BitVelocity shall have the right to investigate any violation of these Terms, unilaterally determine whether you have violated these Terms, and take actions to apply relevant rules without receiving your consent or giving prior notice to you. Examples of such actions include, but are not limited to:
  `;
  TermsPara22 = `● block and close order requests
  ● freezing your account
  ● reporting the incident to authorities
  ● publishing the alleged violations and actions that have been taken
  ● deleting any information you published that is in violation
  `;
  TermsPara23 = `Upon placing an instruction to effect a trade using the Services (an “Order”), your Account will be updated to reflect the open Order and your Order will be included in BitVelocity’s order book for matching with Orders from other Users. If all or a portion of your Order is matched with another User, the Services will execute an exchange (a “Trade”). Upon execution of a Trade, your Account will be updated to reflect that the Order has either been closed due to having been fully executed, or updated to reflect any partial fulfillment of the Order. Orders will remain open until fully executed or cancelled in accordance with subsection (b) below. For purposes of effectuating a Trade, you authorize BitVelocity to take temporary control of the Digital Currency that you are disposing of in the Trade.
  `;
  TermsPara24 = `You may only cancel an order initiated via the Services if such cancellation occurs before your Order has been matched with an Order from another user. Once your Order has been matched with an Order from another user, you may not change, withdraw, or cancel your authorization for BitVelocity to complete such Order. If any order has been partially matched, you may cancel the unmatched portion of the Order unless and until the unmatched portion has been matched. BitVelocity reserves the right to refuse any cancellation request associated with an Order after you have submitted such Order. If you have an insufficient amount of Digital Currency in your Account to fulfill an Order, BitVelocity may cancel the entire Order or may fulfill a partial Order that can be covered by the Digital Currency in your Account (in each case after deducting any fees payable to BitVelocity in connection with the Trade as described in subsection (c) below).
  `;
  TermsPara25 = `You agree to pay BitVelocity the fees set forth at https://www.bitvelocity.io/fee which may be updated from time to time in BitVelocity’s sole discretion. Any such updated fees will apply prospectively to any trades or other transactions that take place following the effective date of such updated fees. You authorize BitVelocity to remove any amounts from your Account for any applicable fees owed by you under these Terms.
  `;
  TermsPara26 = `TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, THE SERVICES, THE BitVelocity MATERIALS AND ANY PRODUCT, SERVICE OR OTHER ITEM PROVIDED BY OR ON BEHALF OF BitVelocity ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS AND BitVelocity EXPRESSLY DISCLAIMS, AND YOU WAIVE, ANY AND ALL OTHER WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE OR NON-INFRINGEMENT OR WARRANTIES ARISING FROM COURSE OF PERFORMANCE, COURSE OF DEALING OR USAGE IN TRADE. WITHOUT LIMITING THE FOREGOING, BitVelocity DOES NOT REPRESENT OR WARRANT THAT THE SITE, THE SERVICES OR BitVelocity MATERIALS ARE ACCURATE, COMPLETE, RELIABLE, CURRENT, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. BitVelocity DOES NOT GUARANTEE THAT ANY ORDER WILL BE EXECUTED, ACCEPTED, RECORDED OR REMAIN OPEN. EXCEPT FOR THE EXPRESS STATEMENTS SET FORTH IN THIS AGREEMENT, YOU HEREBY ACKNOWLEDGE AND AGREE THAT YOU HAVE NOT RELIED UPON ANY OTHER STATEMENT OR UNDERSTANDING, WHETHER WRITTEN OR ORAL, WITH RESPECT TO YOUR USE AND ACCESS OF THE SERVICES. WITHOUT LIMITING THE FOREGOING, YOU HEREBY UNDERSTAND AND AGREE THAT BitVelocity WILL NOT BE LIABLE FOR ANY LOSSES OR DAMAGES ARISING OUT OF OR RELATING TO: (A) ANY INACCURACY, DEFECT OR OMISSION OF DIGITAL CURRENCY PRICE DATA, (B) ANY ERROR OR DELAY IN THE TRANSMISSION OF SUCH DATA, (C) INTERRUPTION IN ANY SUCH DATA AND (D) ANY DAMAGES INCURRED BY ANOTHER USER’S ACTIONS, OMISSIONS OR VIOLATION OF THIS AGREEMENT.
  `;
  TermsPara27 = `
  THE DISCLAIMER OF IMPLIED WARRANTIES CONTAINED HEREIN MAY NOT APPLY IF AND TO THE EXTENT IT IS PROHIBITED BY APPLICABLE LAW OF THE JURISDICTION IN WHICH YOU RESIDE.
  `;
  TermsPara28 = `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL BitVelocity, ITS AFFILIATES AND THEIR RESPECTIVE SHAREHOLDERS, MEMBERS, DIRECTORS, OFFICERS, EMPLOYEES, ATTORNEYS, AGENTS, REPRESENTATIVES, SUPPLIERS OR CONTRACTORS BE LIABLE FOR ANY INCIDENTAL, INDIRECT, SPECIAL, PUNITIVE, CONSEQUENTIAL OR SIMILAR DAMAGES OR LIABILITIES WHATSOEVER (INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF DATA, INFORMATION, REVENUE, PROFITS OR OTHER BUSINESS OR FINANCIAL BENEFIT) ARISING OUT OF OR IN CONNECTION WITH THE SERVICES, ANY PERFORMANCE OR NON-PERFORMANCE OF THE SERVICES, OR ANY OTHER PRODUCT, SERVICE OR OTHER ITEM PROVIDED BY OR ON BEHALF OF BitVelocity AND ITS AFFILIATES, WHETHER UNDER CONTRACT, STATUTE, STRICT LIABILITY OR OTHER THEORY EVEN IF BitVelocity HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES EXCEPT TO THE EXTENT OF A FINAL JUDICIAL DETERMINATION THAT SUCH DAMAGES WERE A RESULT OF BitVelocity’S GROSS NEGLIGENCE, FRAUD, WILLFUL MISCONDUCT OR INTENTIONAL VIOLATION OF LAW. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE LIMITATION MAY NOT APPLY TO YOU.
  `;
  TermsPara29 = `NOTWITHSTANDING THE FOREGOING, IN NO EVENT WILL THE LIABILITY OF BitVelocity, ITS AFFILIATES AND THEIR RESPECTIVE SHAREHOLDERS, MEMBERS, DIRECTORS, OFFICERS, EMPLOYEES, ATTORNEYS, AGENTS, REPRESENTATIVES, SUPPLIERS OR CONTRACTORS ARISING OUT OF OR IN CONNECTION THE SERVICES, ANY PERFORMANCE OR NON-PERFORMANCE OF THE SERVICES, OR ANY OTHER PRODUCT, SERVICE OR OTHER ITEM PROVIDED BY OR ON BEHALF OF BitVelocity OR ITS AFFILIATES WHETHER UNDER CONTRACT, STATUTE, STRICT LIABILITY OR OTHER THEORY, EXCEED THE AMOUNT OF THE FEES PAID BY YOU TO BitVelocity UNDER THIS AGREEMENT IN THE TWELVE-MONTH PERIOD IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM FOR LIABILITY.
  `;
  TermsPara30 = `You agree to indemnify and hold harmless BitVelocity, its affiliates, contractors, licensors, and their respective directors, officers, employees and agents from and against any claims, actions, proceedings, investigations, demands, suits, costs, expenses and damages (including attorneys’ fees, fines or penalties imposed by any regulatory authority) arising out of or related to (i) your use of, or conduct in connection with, the Services, (ii) your breach or our enforcement of these Terms, or (iii) your violation of any applicable law, regulation, or rights of any third party during your use of the Service. If you are obligated to indemnify BitVelocity, its affiliates, contractors, licensors, and their respective directors, officers, employees or agents pursuant to this clause, BitVelocity will have the right, in its sole discretion, to control any action or proceeding and to determine whether BitVelocity wishes to settle, and if so, on what terms.
  `;
  TermsPara31 = `Please be aware that all official announcements, news, promotions, competitions and airdrops will be listed on https://www.bitvelocity.io/support where we urge all users to refer to regularly. BitVelocity will not be held liable or responsible in any manner of compensation should users incur personal losses arising from ignorance or negligence of the announcements.
  `;
  TermsPara32 = `You agree that BitVelocity shall have the right to immediately suspend your account (and any accounts beneficially owned by related entities or affiliates), freeze or lock the funds in all such accounts, and suspend your access to BitVelocity for any reason including if it suspects any such accounts to be in violation of these Terms, our Privacy Policy, or any applicable laws and regulations. You agree that BitVelocity shall not be liable to you for any permanent or temporary modification, suspension or termination of your Account or access to all or any portion of the Services. BitVelocity shall have the right to keep and use the transaction data or other information related to such accounts. The above account controls may also be applied in the following cases:
  `;
  TermsPara33 = `The account is subject to a governmental proceeding, criminal investigation or other pending litigation;
  We detect unusual activity in the account;
  We detect unauthorized access to the account;
  We are required to do so by a court order or command by a regulatory/government authority
  In case of any of the following events, BitVelocity shall have the right to directly terminate this agreement by cancelling your Account, and shall have the right to permanently freeze (cancel) the authorizations of your account on BitVelocity and withdraw the corresponding BitVelocity Account thereof:`;
  TermsPara34 = `After BitVelocity terminates services to you;
  you allegedly register or register in any other person’s name as BitVelocity user again, directly or indirectly;
  the information that you have provided is untruthful, inaccurate, outdated or incomplete;
  when these Terms are amended, you expressly state and notify BitVelocity of your unwillingness to accept the amended Terms;
  you request that the Services be terminated; and
  any other circumstances where BitVelocity deems it should terminate the services.
  Should your Account be terminated, the Account and transactional information required for meeting data retention standards will be securely stored for 5 years. In addition, if a transaction is unfinished during the Account termination process, BitVelocity shall have the right to notify your counterparty of the situation at that time. You acknowledge that a user initiated account exit (right to erasure under GDPR or other equivalent regulations) will also be subjected to the termination protocol stated above.`;
  TermsPara35 = `
  If BitVelocity receives notice that any funds held in your Account are alleged to have been stolen or otherwise are not lawfully possessed by you, BitVelocity may, but has no obligation to, place an administrative hold on the affected funds and your Account. If BitVelocity does place an administrative hold on some or all of your funds or Account, BitVelocity may continue such hold until such time as the dispute has been resolved and evidence of the resolution acceptable to BitVelocity has been provided to BitVelocity in a form acceptable to BitVelocity. BitVelocity will not involve itself in any such dispute or the resolution of the dispute. You agree that BitVelocity will have no liability or responsibility for any such hold, or for your inability to withdraw funds or execute trades during the period of any such hold.
  `;
  TermsPara36 = `Except as set forth in subsection (b) below, once the Account is closed/withdrawn, all remaining balance (which includes charges and liabilities owed to BitVelocity) on the account will be payable immediately to BitVelocity. Upon payment of all outstanding charges to BitVelocity (if any), the User will have 5 business days to withdraw all funds from the Account.
  `;
  TermsPara37 = `BitVelocity maintains full custody of the funds and User data/information which may be turned over to governmental authorities in the event of Account suspension/closure arising from fraud investigations, violation of law investigations or violation of these Terms.
  `;
  TermsPara38 = `BitVelocity is not your broker, intermediary, agent, or advisor and has no fiduciary relationship or obligation to you in connection with any trades or other decisions or activities effected by you using the Services. No communication or information provided to you by BitVelocity is intended as, or shall be considered or construed as, investment advice, financial advice, trading advice, or any other sort of advice. All trades are executed automatically, based on the parameters of your order instructions and in accordance with posted trade execution procedures, and you are solely responsible for determining whether any investment, investment strategy or related transaction is appropriate for you based on your personal investment objectives, financial circumstances and risk tolerance. You should consult your legal or tax professional regarding your specific situation. BitVelocity does not recommend that any Digital Currency should be bought, earned, sold, or held by you. Before making the decision to buy, sell or hold any Digital Currency, you should conduct your own due diligence and consult your financial advisors before making any investment decision. BitVelocity will not be held responsible for the decisions you make to buy, sell, or hold Digital Currency based on the information provided by BitVelocity.
  `;
  TermsPara39 = `It is the responsibility of the User to abide by local laws in relation to the legal usage of BitVelocity in their local jurisdiction. Users must also factor, to the extent of their local law all aspects of taxation, the withholding, collection, reporting and remittance to their appropriate tax authorities. All Users of BitVelocity and any of its services acknowledge and declare that the source of their funds come from a legitimate manner and are not derived from illegal activities. BitVelocity maintains a stance of cooperation with law enforcement authorities globally and will not hesitate to seize, freeze, terminate the account and funds of Users which are flagged out or investigated by legal mandate.
  `;
  TermsPara40 = `Access to the Services will require the submission of certain personally identifiable information. Please review BitVelocity’s Privacy Policy found at https://www.bitvelocity.io/legal/privacy for a summary of BitVelocity’s practices related to the collection and use of personally identifiable information.
  `;
  TermsPara41 = `
  PLEASE READ THIS SECTION CAREFULLY, AS IT INVOLVES A WAIVER OF CERTAIN RIGHTS TO BRING LEGAL PROCEEDINGS, INCLUDING AS A CLASS ACTION FOR RESIDENTS OF THE U.S.
  `;
  TermsPara42 = `
  Please contact BitVelocity first! BitVelocity wants to address your concerns without resorting to formal legal proceedings. Before filing a claim, you agree to try to resolve the dispute informally by contacting BitVelocity first through https://support.bitVelocity.io/hc/en-us/requests/new.`;
  TermsPara43 = `You and BitVelocity agree to resolve any claims relating to this Agreement (including any question regarding its existence, validity, termination, or any services or products provided and any representations made by us) through final and binding arbitration, except as set forth under Exceptions to Agreement to Arbitrate below. You agree to first give us an opportunity to resolve any claims by contacting us as set forth in subsection (a) above. If we are not able to resolve your claims within 60 days of receiving the notice, you may seek relief through arbitration or in the Small Claims Tribunals of Singapore (“SCT”), as set forth below.`;

  TermsPara44 = `Either you or BitVelocity may submit a dispute (after having made good faith efforts to resolve such dispute in accordance with subsections (a) and (b) above) for final, binding resolution by arbitration under the arbitration rules of the Singapore International Arbitration Centre (“SIAC”), which are deemed to be incorporated by reference. The arbitration tribunal shall consist of a sole arbitrator to be appointed by the President of SIAC. The language of the arbitration hearings shall be English and the seat, or legal place, of arbitration shall be Singapore. Judgment on any arbitral award may be entered in any court having jurisdiction over the party (or the assets of the party) due and owing such award.`;

  TermsPara45 = `Either party may instead choose to assert the claims in the SCT if the claims fall within the jurisdiction of the SCT, and either party may seek injunctive relief or other urgent equitable relief in a court of competent jurisdiction. However, for the avoidance of doubt, where the claims fall outside of the jurisdiction of the SCT, the claims will be referred to and finally resolved by SIAC arbitration.
  `;
  TermsPara46 = `To begin an arbitration proceeding, you must send a letter requesting arbitration and describing your claims to BitVelocity Europe Services Limited, Melita Court, Level 3, Triq Giuseppe Cali, Ta’Xbiex XBX 1420, Malta. If we request arbitration against you, we will give you notice at the email address or street address you have provided. SIAC Rules and filing instructions are available at http://www.siac.org.sg/our-rules or by calling +65 6713 9777.
  `;
  TermsPara47 = `This Agreement is governed by the law of Singapore except for its conflicts of laws principles, unless otherwise required by a mandatory law of any other jurisdiction.
  `;

  TermsPara48 = `BitVelocity is an independent contractor and not an agent of you in the performance of these Terms. These Terms not to be interpreted as evidence of an association, joint venture, partnership, or franchise between the parties.
  `;
  TermsPara49 = `These Terms constitute the entire agreement between the parties regarding use of the Services and will supersede all prior agreements between the parties whether, written or oral. No usage of trade or other regular practice or method of dealing between the parties will be used to modify, interpret, supplement, or alter the terms of these Terms.
  `;

  TermsPara50 = `BitVelocity will not be liable for any delay or failure to perform as required by these Terms because of any cause or condition beyond BitVelocity’s reasonable control.
  `;
  TermsPara51 = `If any portion of these Terms are held invalid or unenforceable, such invalidity or enforceability will not affect the other provisions of these Terms, which will remain in full force and effect, and the invalid or unenforceable portion will be given effect to the greatest extent possible.
  `;
  TermsPara52 = `You may not assign or transfer any right to use the Services or any of your rights or obligations under these Terms without prior written consent from us, including by operation of law or in connection with any change of control. BitVelocity may assign or transfer any or all of its rights or obligations under these Terms, in whole or in part, without notice or obtaining your consent or approval.
  `;
  TermsPara53 = `The failure of a party to require performance of any provision will not affect that party’s right to require performance at any time thereafter, nor will a waiver of any breach or default of these Terms or any provision of these Terms constitute a waiver of any subsequent breach or default or a waiver of the provision itself.
  `;
  TermsPara54 = `Any links to third-party websites from the Services does not imply endorsement by BitVelocity of any products, services or information presented therein, nor does BitVelocity guarantee the accuracy of the information contained on them. In addition, since BitVelocity has no control over the terms of use or privacy practices of third-party websites, you should read and understand those policies carefully.
  `;
  TermsPara55 = ` For more information on Binance, you can refer to the company and license information found on the website. If you have questions regarding this agreement, please feel free to contact Binance for clarification via our Customer Support team at https://www.bitvelocity.io/help/contactUs`;

  ////////////////////////////---PRIVACY POLICY---////////////////////////////////////////////
  PrivacyHeading1 = "Information BitVelocity Collects";
  PrivacyHeading2 =
    "We want you to understand the types of information we collect when you register for and use BitVelocity’s services";
  PrivacyHeading3 = "Service Usage Information";
  PrivacyHeading4 = "Transaction Information";
  PrivacyHeading5 = "Why does BitVelocity collect this information";
  PrivacyHeading6 = "To provide and maintain our services";
  PrivacyHeading7 = "To protect our users";
  PrivacyHeading8 = "To comply with legal and regulatory requirements";
  PrivacyHeading9 = "To measure site performance";
  PrivacyHeading10 = "To communicate with you";
  PrivacyHeading11 = "To enforce our Terms of Use and other agreements";
  PrivacyHeading12 = "How does BitVelocity protect user data";

  PrivacyPara11 = `This Privacy Policy explains how BitVelocity (“BitVelocity”) collects, uses, shares, and protects user information obtained through the BitVelocity.com website. The terms “we,” “us,” and “our” refer to BitVelocity and its affiliates. When we ask for certain personal information from users it is because we are required by law to collect this information or it is relevant for specified purposes. Any non-required information you provide to us is done so voluntarily. You decided whether to provide us with these non-required information; you may not be able to access or utilize all of our Services if you choose not to.`;

  PrivacyPara12 = `By using the Site, you consent to the data practices described in this Privacy Policy. On occasion, BitVelocity may revise this Privacy Policy to reflect changes in law or our personal data collection and use practices. If material changes are made to this Privacy Policy, the changes will be announced by posting on the site. We will ask for your consent before using your information for any purpose that is not covered in this Privacy Policy.`;

  PrivacyPara13 = `The latest privacy policy has incorporated elements from the General Data Protection Regulation (GDPR) as we act in accordance to its personal information processing rules within the European Economic Area (EEA).`;

  PrivacyPara21 = `Information you provide to us at registration`;

  PrivacyPara22 = `When you create a BitVelocity Account, you provide us with personal information that includes your contact information (Email Address, name, and a password). You can also choose to add a phone number for SMS or Google Authenticator account to be used for 2FA verification for improved security.`;

  PrivacyPara23 = `Information we collect when authenticating user identity`;

  PrivacyPara24 = `To comply with global industry regulatory standards including Anti-Money Laundering (AML), Know-Your-Customer (KYC), and Counter Terrorist Financing (CTF), BitVelocity requires user accounts to undergo user identity authentication for both Personal & Enterprise-level accounts. This entails collecting formal identification.`;

  PrivacyPara25 = `Information we collect as you use our services`;

  PrivacyPara26 = `Through your use of the BitVelocity platform, we also monitor and collect tracking information related to usage such as access date & time, device identification, operating system, browser type and IP address. This information may be directly obtained by BitVelocity or through third party services. This service usage data helps us our systems to ensure that our interface is accessible for users across all platforms and can aid during criminal investigations.`;

  PrivacyPara27 = `For all personal and enterprise user accounts, we collect transaction information including deposit snapshots, account balances, trade history, withdrawals, order activity and distribution history. This transaction data is monitored for suspicious trading activity for user fraud protection, and legal case resolution.`;

  PrivacyPara3 = `We use the information collected to deliver our services and verify user identity.
  We use the IP address and unique identifiers stored in your device’s cookies to help us authenticate your identity and provide our service. Given our legal obligations and system requirements, we cannot provide you with services without data like identification, contact information and transaction-related information.`;

  PrivacyPara4 = `We use the information collected to protect our platform, users’ accounts and archives.
  We use IP addresses and cookie data to protect against automated abuse such as spam, phishing and Distributed Denial of Service (DDoS) attacks.
  We analyse trading activity with the goal of detecting suspicious behavior early to prevent potential fraud and loss of funds to bad actors.`;

  PrivacyPara5 = `Respect for the privacy and security of data you store with BitVelocity informs our approach to complying with regulations, governmental requests and user-generated inquiries. We will not disclose or provide any personal information to third party sources without review from our legal case team and/or prior consent from the user.`;

  PrivacyPara6 = `We actively measure and analyse data to understand how our services are used. This review activity is conducted by our operations team to continually improve our platform’s performance and to resolve issues with the user experience. 
  We continuously monitor our systems’ activity information and communications with users to look for and quickly fix problems.`;

  PrivacyPara7 = `We use personal information collected, like an email address to interact with users directly when providing customer support on a ticket or to keep you informed on log ins, transations, and security. Without processing your personal information for confirming each communication, we will not be able to respond to your submitted requests, questions and inquiries. All direct communications are kept confidential and reviewed internally for accuracy.`;

  PrivacyPara8 = `It is very important for us and our customers that we continually review, investigate and prevent any potentially prohibited or illegal activities that violate our Terms of Service. For the benefit of our entire user base, we carefully enforce our agreements with third parties and actively investigate violations of our posted Terms of Use. BitVelocity reserves the right to terminate the provision of service to any user found engaging in activities that violate our Terms of Use.`;

  PrivacyPara9 = `BitVelocity has implemented a number of security measures to ensure that your information is not lost, abused, or altered. Our data is stored offline to ensure that it is protected against all network hacks.
  Our data security measures include, but are not limited to: PCI Scanning, Secured Sockets Layered encryption technology, pseudonymisation, internal data access restrictions, and strict physical access controls to buildings & files. Please note that it is impossible to guarantee 100% secure transmission of data over the Internet nor method of electronic storage. As such, we request that you understand the responsibility to independently take safety precautions to protect your own personal information.
  If you suspect that your personal information has been compromised, especially account and/or password information, please lock your account and contact BitVelocity customer service immediately.`;

  Inaam = "Inaam ur Rehman";
  Shoaib = "Shoaib Khalid";

  Senior = "Senior";
  Junior = "Junior";
  TeamDescription1 = `Senior Javascript Developer who likes to work on the whole specturm of development. 
  He has previously worked on the blockchain technolgies for years. Now he is leading the BitVelocity development team on making 
  a well-secured trading platform.`;
  TeamDescription2 = `Junior Full Stack Developer who, before joining the BitVelocity team, developed smart contracts for Etherem Network. 
                      He loves to work with modern technologies and tools to provide solutions that are effective and reliable.`;
  CompanyNumber = "10744902";

  Loans = "Loans";
  Shares = "Shares";
  Funds = "Funds";
  Instant = "Instant";
  Approval = "Approval";
  TwentyFourHours = "24-hours";
  Easy = "Easy";
  Application = "Application";
  STOFeaturesHeading = "Why you should choose BitVelocity";
  Google = "Google";
  Authenticator = "Authenticator";
  GoogleAuthenticator = this.Google + " " + this.Authenticator;
  PasswordChange = this.Password + " " + this.Change;
  Sensitive = "Sensitive";
  SensitiveAccountSettingsChange =
    this.Sensitive +
    " " +
    this.Account +
    " " +
    this.Settings +
    " " +
    this.Change;
  GoogleAuthenticatorUsedFor =
    "Used for Login, Withdrawals and Security modifications";
  Enable = "Enable";
  Disable = "Disable";
  TwoFactorAuthentication = "Two-Factor Authentication";
  Download = "Download";
  App = "App";
  DownloadApp = this.Download + " " + this.App;
  Subscribe = "Subscribe";
  Backup = "Backup";
  Finish = "Finish";
  Step = "Step";
  DownloadAndInstallFormat = this.Download + " and install {0}";
  DownloadGoogleAuthAppPara = "If you need help getting started, please visit";
  GoogleSupport = this.Google + " " + this.Support;
  Scan = "Scan";
  QRCode = "QR Code";
  ScanQRCode = this.Scan + " " + this.QRCode;
  OR = "OR";
  ScanThisQRCode = this.Scan + " this " + this.QRCode;
  EnterTokenManuallyTwoFAPara = "Enter this code manually into the app";
  Key = "Key";
  BackupKey = this.Backup + " " + this.Key;
  BackupKeyPara = `Please save this key somewhere. This key shall be used to recover your Google Authentication in case you lose access to Google Authenticator App`;
  Enabled = "Enabled";
  IfEnabled = "If " + this.Enabled;
  SuccessfullyFormat = "{0} " + this.Successfully;
  Disabled = "Disabled";
  DepositInstruction1 = `Your deposit reference number is unique and must be added as a reference number on payments sent to us. Failure to provide correct reference number may result in delay of  your funds credited into your BitVelocity account`;
  DepositInstruction2 = `There will be deduction of our exchange fee on any deposits made, please see the fee table for exact charge on each deposit`;
  DepositInstruction3 = `External bank may incur additional charges, hence it is advised to pay all bank charges at your end  in additional to the amount that you would like your account to be funded with`;
  DepositInstruction4 = `As per the regulations you must deposit from the same account under which your account is registered at BitVelocity.  For Business users account title of sender must match your company name on BitVelocity account`;
  DepositInstruction5 = `If you are making an international payment, please give us 2 weeks (in exceptional cases upto 4 weeks)before your funds will be shown in your BitVelocity account`;
  CouldNotValidateDocumentStatus = "Could Not validate document(s) statuses";
  AccountVerificationIsRequiredBeforeThisTransaction =
    this.Account +
    " " +
    this.Verification +
    " is required before this transaction";
  MaximumAmountForFormat = this.Maximum + " " + this.Amount + " for {0} is {1}";
  MinimumAmountForFormat = this.Minimum + " " + this.Amount + " for {0} is {1}";
  BankAccountWithSameIBAN = this.BankAccount + " with same " + this.IBAN;
  CurrencyType = this.Currency + " " + this.Type;
  CryptoDepositNotAvailable =
    this.Crypto + " " + this.Deposit + " not available";
  CannotExceedsDailyWithdrawalLimit =
    "Can not exceeds daily " + this.Withdrawal + " limit";
  CannotExceedsMonthlyWithdrawalLimit =
    "Can not exceeds monthly " + this.Withdrawal + " limit";
  NoAmountSentForWithdrawalRequestVerification =
    "If no " +
    this.Amount +
    " is sent, then " +
    this.Withdrawal +
    " " +
    this.Request +
    " should be " +
    this.Rejected;
  Sent = "Sent";
  AmountSent = this.Amount + " " + this.Sent;
  AmountChargedShouldBeLessThanOrEqualToAmount =
    "Amount charged should be less than or equal to {0} because we've hold {1} from user's wallet";
  UnableToFundAdminWalletForFee = "Unable to fund admin wallet for fee";
  already = "already";
  enabled = "enabled";
  AuthenticatorAlreadyEnabledFormat =
    "{0} " + this.Authenticator + " " + this.already + " " + this.enabled;
  AmountToCharge = this.Amount + " to Charge";
  AmountDeductedFromUsersWallet = this.Amount + " deducted from user's wallet";
  IncludeBankCharges = "Include Bank Charges";
  UserGets = this.User + " gets";
  BankCode = this.Bank + " " + this.Code;
  BranchAddress = this.Branch + " " + this.Address;
  TotalAmountCharged = this.Total + " " + this.Amount + " charged";
  VerifiedOn = this.Verified + " On";
  CreatedUserId = this.Created + " " + this.UserId;
  Proofs = this.Proof + "(s)";
  DocumentId = this.Document + " " + this.Id;
  Field = "Field";
  Fields = this.Field + "(s)";
  Properties = "Properties";
  LastApproved = this.Last + " " + this.Approved;
  Attempt = "Attempt";
  CurrentAttempt = this.Current + " " + this.Attempt;
  Open = "Open";
  Tab = "Tab";
  NewTab = this.New + " " + this.Tab;
  OpenInNewTab = this.Open + " in " + this.NewTab;
  Requests = this.Request + "(s)";
  VerifiedBy = this.Verified + " by";
  Preference = "Preference";
  Preferences = this.Preference + "(s)";
  Save = "Save";
  Default = "Default";
  DefaultCurrency = this.Default + " " + this.Currency;
  DefaultCurrencyPair = this.Default + " " + this.CurrencyPair;
  When = "When";
  Fulfilled = "Fulfilled";
  OnSuccessfulDeposit = "On Successful Deposit";
  OnSuccessfulWithdrawal = "On Successful Withdrawal";
  WhenOrderFulfilled = this.When + " Order Fulfilled";
  OnDepositVerification = "On Deposit Verification";
  OnWithdrawalVerification = "On Withdrawal Verification";
  OnOrderFulfilled = "On Order Fulfilled";
  Defaults = this.Default + "(s)";
  Yes = "Yes";
  No = "No";
  OnOrderExecution = "On Order Execution";
  OnWithdrawal = "On Withdrawal";
  Notification = "Notification";
  Zone = "Zone";
  TimeZone = this.Time + " " + this.Zone;
  Preferred = "Preferred";
  PreferredTimeZone = this.Preferred + " " + this.TimeZone;
  PhoneNumber = this.Phone + " " + this.Number;
  Added = "Added";
  NotAdded = this.Not + " " + this.Added;
  EnterVerificationCodeForContactPara =
    "Please enter the {0} digit verification code we sent to {1}";
  DidNot = "Didn't";
  Receive = "Receive";
  SMS = "SMS";
  DidNotReceiveSMS = this.DidNot + " " + this.Receive + " the " + this.SMS;
  VerificationCodeResent = "Verification Code Resent";
  Sort = "Sort";
  SortCode = this.Sort + " " + this.Code;
  IncludeReferenceOnDepositPara =
    "Please ensure to include this as a reference for deposit. Otherwise, your funds may be delayed.";
  ChangePassword = this.Change + " " + this.Password;
  ChangePasswordBlockPara = "Change password frequently to secure your account";
}
