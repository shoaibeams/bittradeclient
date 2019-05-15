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
  RealEstatePaperHeading4 = "BitVelocity as Liquidity Provider";
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
  RealEstatePaperPara3 = `Blockchain based property offer Echosystem In
 both commercial and residential real estate market, there is a serious lack
 of transparency that ultimately defines the sold price. While both sellers
 and property agents claim that already have real offers higher than the
 offers made by sellers they get outpriced by artificial hype created by
 market players. By using blockchain technology, we will place all the real
 offers onto the blockchain, hence open to public for validation. Using the pattern 
 and trend recognition algo, we will spot and eliminate the bad players, resulting 
 a transparent and honest bidding system for property market making more stable and 
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
 reduce this cost to as low as 0.5%. Hence, making it more convenient and
 hassle free echo system at a fraction of a cost for business and Leisure
 travellers.`;
  TravelPaperPara3 = `After a successful launch of social crypto platform we intend
 to offer our crypto marketplace to travellers and tourists. Users like
 traders and investors will already benefit from the platform since holding
 BTC or XRP on the platform they can either pay direct in BTC or XRP. Eventually
 paying a little fraction of a cost to what a forex exchange would charge.
 Alternatively, on our platform they can convert their crypto to local
 currency and then spend, again paying very little of a cost to what a fiat
 currency would charge. Converting to fiat, they will be able to spend
 using our digital app as if they were using a debit cards. `;
  TravelPaperPara4 = `Future plan for
 travellers includes travel debit card, that will have debit cards
 with local currency (GBP, Euro, USD) hence eliminating the need to
 exchange to foreign currency completely.`;

  //////////////////////////////FAQ////////////////////////////////////////////
  Privacy = "Privacy";
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
  TradeQuestion3 = "What is the minimum amount for purchasing?";
  TradeAnswer1 = `First, you need to register on our site. Then, you need to get KYC verified. Once verification process is completed, your account is available for 
 funding fiat deposits`;
  TradeAnswer2 = `First, you need to register on our site. Then, you need to get KYC verified. Once verification process is completed, your account is available for 
 funding fiat deposits`;
  TradeAnswer3 = "The minimum trading limit is 10£.";

  FeesQuestion1 = "What is the deposit fee?";
  FeesQuestion2 = "What is the withdrawl fee while trading on BitVelocity?";
  FeesQuestion3 = "Are there any other charges?";
  FeesAnswer1 = "";
  FeesAnswer2 = "";
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
  TwoFactorAuthPara = `A security scheme to confirm users' identity via two methods.
  One through email verification and the other through sms
  verification.`;
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
  be launched in UK , then Europe and finally US and Asia).`;
  SaveMoney2 = ` As low as 0.49% on buy/sell spreads (for trades on internal
    exchange only)`;
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
  successful startups previously; has run 3 development studios in 3 different
  cities at a given time; an investor, a technology consultant and someone who
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
}
