import { Constants } from "../shared/constants";
import { LanguageBase } from "./language";

export class LangDE implements LanguageBase {
    Name = "Naam";
    Email = "E-mail";
    ContactNo = "Contact nummer";
    Message = "Bericht";
    Submit = "voorleggen";
    InvalidEmail = "Ongeldig " + this.Email;
    MaxLengthFormat = "Maximum {0} karakter (len)";
    MaxLengthFormat2 = "{0} accepteer maximum {1} karakter (en)";
    RangeLengthFormat = "Minimaal {0} en Maximum {1} teken (s)";
    RangeLengthFormat2 = "{0} accepteer minimum {1} en Maximum {2} karakters";
    RequiredFormat = "{0} is verplicht";
    ErrorOccured = "Er is een fout opgetreden";
    ErrorOccuredWhileValidationFormat = "Er is een fout opgetreden bij het valideren van {0}";
    ErrorOccuredFormat = "Er is een fout opgetreden {0}";
    UUID = "UUID";
    UUIDNotProvided = this.UUID + " niet voorzien";
    AlreadyExistsFormat = "{0} bestaat al";
    SomethingWentWrongTryAgainLater = "Er is iets misgegaan. Probeer het later opnieuw";
    ContactUsInsertedResponseMessage = "Bedankt dat je contact met ons hebt opgenomen. We hebben uw bericht ontvangen en we nemen snel contact met u op.";
    UUIDAlreadyExists = "UUID bestaat al";
    First = "Eerste";
    Last = "Laatste";
    FirstName = this.First + " " + this.Name;
    LastName = this.Last + " " + this.Name;
    User = "Gebruiker";
    UserName = this.User + " " + this.Name;
    AlphaNumericFormat = "{0} moet alfanumeriek zijn";
    MustContainOneSpecialCharFormat = "{0} moet ten minste één speciaal teken bevatten";
    MustContainOneCapitalLetterFormat = "{0} moet ten minste één hoofdletter bevatten";
    MustContainOneSmallLetterFormat = "{0} moet minimaal één kleine letter bevatten";
    MustContainOneNumberFormat = "{0} moet ten minste één nummer bevatten";
    PasswordRequirement = [
        this.RangeLengthFormat2,
        this.MustContainOneCapitalLetterFormat,
        this.MustContainOneSmallLetterFormat,
        this.MustContainOneSpecialCharFormat,
        this.MustContainOneNumberFormat,
    ];
    Password = "Wachtwoord";
    Confirm = "Bevestigen";
    ConfirmPassword = this.Confirm + " " + this.Password;
    DidNotMatchFormat = "{0} en {1} kwamen niet overeen";
    CapitchaErrorMessage = "Help ons spam te voorkomen. Klik op het selectievakje";
    Company = "Bedrijf";
    CompanyName = this.Company + " " + this.Name;
    CannotStartWithNumberFormat = "{0} Kan niet beginnen met een cijfer";
    UserNameRequirement = [
        this.RangeLengthFormat2,
        this.AlphaNumericFormat,
        this.CannotStartWithNumberFormat,
    ];
    UserNameNotAavailable = this.UserName + " niet beschikbaar";
    EmailAlreadyRegistered = "Een account hiermee " + this.Email + " bestaat al. Klik op inloggen om door te gaan met dat account of voer een ander in " + this.Email;
    AccountType = "account type";
    InvalidValueFormat = "Ongeldige waarde voor {0}";
    VerificationEmailSent = "We hebben u een verificatie-e-mail gestuurd";
    VerificationEmailSentDetail =
        `Klik op de link in uw e-mail om uw account te verifiëren
Als u de e-mail niet hebt gevonden, controleer dan uw spammap of klik op de link
hieronder om opnieuw te verzenden`;
    Resend = "Opnieuw versturen";
    ResendEmail = this.Resend + " " + this.Email;
    CouldNotVerifyClient = "Kon client niet verifiëren";
    UnAuthorizedRequest = "Niet geautoriseerde aanvraag";
    SignUpVerificationNotPending = "Aanmeldingsverificatie is niet in behandeling voor de huidige gebruiker";
    Success = "Succes";
    CouldNotSendEmailNow = "Kan nu geen e-mail verzenden. Probeer het later opnieuw";
    UnableToCompleteYourRequest = "We kunnen deze keer uw verzoek niet voltooien. Probeer het later opnieuw. Als het probleem aanhoudt, laat het ons weten door contact met ons op te nemen";
    AccountCreatedLoginToContinue = "Je account is aangemaakt. Meld u aan om verder te gaan. U omleiden naar login ...";
    Again = "nog een keer";
    VerificationEmailSentAgain = this.VerificationEmailSent + " " + this.Again;
    Verifying = "Verifiëren ...";
    Forgot = "vergeten";
    ForgotPassword = this.Forgot + " " + this.Password;
    BitVelocity = "BitVelocity"
    NotJoinedBitvelocityYet = "Niet toegetreden " + this.BitVelocity + " yet?";
    Join = "toetreden";
    Now = "Now";
    JoinNow = this.Join + " " + this.Now;
    Login = "Log in";
    Credentials = "Geloofsbrieven";
    AlreadyHaveAnAccount = "Heb al een " + this.BitVelocity + " Account?";
    EmailVerificationRequired = "Email niet geverifieerd. Controleer uw mailbox. Als het zich niet in uw inbox bevindt, controleert u de map Spam, Ongewenst, Trash, Verwijderde items of Archief of klikt u op {0} om het opnieuw te verzenden.";
    Here = "hier";
    VerificationKey = "Verificatiesleutel";
    VerificationKeyExpired = this.VerificationKey + " is verlopen. EEN " + this.VerificationKey + " is verlopen wanneer een gebruiker al is geverifieerd of wanneer u een nieuwe verificatie-e-mail aanvraagt.";
    CouldNotVerifyUser = "Sorry! kon dit niet verifiëren " + this.User;
    UserAlreadyVerified = "Deze gebruiker is al geverifieerd";
    RedirectingYouToLogin = "Log alstublieft in op uw account om verder te gaan. Doorverwijzen naar inloggen";
    SuccessfullyVerifiedUser = "Verificatie voltooid met succes. " + this.RedirectingYouToLogin;
    NotExists = "Bestaat niet";
    NotExistsFormat = "{0} " + this.NotExists;
    Invalid = "Ongeldig";
    InvalidFormat = this.Invalid + " {0}";
    Home = "Huis";
    Blockchain = "block Chain";
    Travel = "Reizen";
    RealEstate = "Onroerend goed";
    Charts = "Grafieken";
    FAQ = "FAQ";
    AboutUs = "Over ons";
    ContactUs = "Neem contact met ons op";
    Help = "Helpen";
    SignUp = "Inschrijven";
    Wallet = "Portemonnee";
    Logout = "Uitloggen";
    CouldNotLoadConfig = "Kan Config niet laden";
    Limit = "Begrenzing";
    Sell = "Verkopen";
    Buy = "Kopen";
    Price = "Prijs";
    Amount = "Bedrag";
    Total = "Totaal";
    Action = "Actie";
    Currency = "Valuta";
    Pair = "Paar";
    CurrencyPair = this.Currency + " " + this.Pair;
    Market = "Markt";
    AvailableBalance = "beschikbaar saldo";
    Gross = "Bruto";
    GrossTotal = this.Gross + " " + this.Total;
    Fee = "honorarium";
    Date = "Datum";
    Type = "Type";
    NonVerifiedUserCannotPlaceOrder = "Niet-geverifieerde gebruiker kan de bestelling niet plaatsen";
    ThisUserCannotPlaceOrder = "Deze gebruiker kan de bestelling niet plaatsen";
    NotFound = "niet gevonden";
    NotFoundFormat = "{0} niet gevonden";
    Min = "Minimum";
    Order = "Bestellen";
    MinTotalOrderAmountFormat = this.Min + " " + this.Total + " " + this.Order + " " + this.Amount + " is {0} {1}";
    NotSupportFormat = "{0} wordt niet ondersteund";
    NotEnoughBalance = "Niet genoeg saldo beschikbaar";
    MinTierRequriedForTransaction = "Minimumlaag {0} is vereist voor een transactie";
    NoRecordFound = "Geen record gevonden";
    OrderPlacedSuccessfully = "Bestelling succesvol geplaatst";
    LangKey = Constants.Instance.LanguageKey.ENUS;
    CouldNotBeginTransaction = "Kan transactie niet beginnen";
    CouldNotCompleteTransaction = "Kan transactie niet voltooien";
    CouldNotExecuteQuery = "Kon verzoek niet uitvoeren";
    OrderCompleted = "Bestelling voltooid";
    UserWalletNotFoundForOneOfThePairCurrencies = "Gebruikersportefeuille voor een van de paren is niet gevonden";
    CouldNotGetResponseFromKraken = "Kon geen antwoord krijgen van Kraken";
    PairKrakenMinOrderVolumeNotDefined = "Kraken minimum bestelvolume niet gedefinieerd voor dit paar";
    OrderLessThanMinKrakenOrderVolume = "Bestelbedrag is minder dan Kraken minimale bestelvolume";
    PairMappingWithKraken = "pair mapping met kraken";
    UnableToVerifyFormat = "Kon {0} niet verifiëren";
    Request = "Verzoek";
    OrderStatusMustBeOpenOrPartiallyCompleted = "De status van de bestelling moet open zijn of gedeeltelijk zijn voltooid";
    Status = "staat";
    Trade = "Handel";
    UnableToCreateQueueTaskForUpdatingExchangeOrigin = "Kan wachtrijtaak niet maken van het bijwerken van de uitwisselingsoorsprong";
    TaskId = "Taak-ID";
    UnableToUpdateExchangeOrigin = "Kon de uitwisselingsoorsprong niet bijwerken naar {0}";
    OrderPostedOnKrakenWithoutTxId = "Bestel gepost op kraken zonder txid";
    OrderPostedOnThirdParty = "Bestelling gepost op {0} met succes";
    OrderPostedOnThirdPartyButCouldNotItsTxid = this.OrderPostedOnThirdParty + " maar kon zijn TXID niet redden";
    OrderAlreadyPostedOnFormat = "Bestel al op {0}";
    ExternalOrderIdNotFound = "Order-ID voor {0} niet gevonden";
    ChangeExchangeManually = "Wijzig de oorsprong van de bestelling aub handmatig";
    CaptchaNotVerified = "Captcha niet geverifieerd. Voer het formulier opnieuw in";
    FieldRequired = "Dit veld is verplicht";
    Skype = "Skype";
    Id = "ID kaart";
    SkypeId = this.Skype + " " + this.Id;
    Budget = "Begroting";
    Consulting = "Overleg plegen";
    Cost = "Kosten";
    You = "U";
    Get = "Krijgen";
    YouGet = this.You + " " + this.Get;
    NotAnAdminUser = "Geen beheerder";
    OrderCancellationResponseFromThirdParty = "Annulering van bestelling annuleren van {0} is {1}";
    UnableToSaveFormat = "Kon {0} niet opslaan";
    Session = "Sessie";
    Volume = "Volume";
    LastPrice = this.Last + ' ' + this.Price;
    Change = "Verandering";
    High = "hoog";
    Low = "Laag";
    Page = "Pagina";
    Back = "Terug";
    BackToHome = this.Back + " to " + this.Home;
    Deposit = "Storting";
    Withdraw = "terugtrekken";
    Withdrawl = "withdrawl";
    SelectCurrencyTodeposit = "kiezen " + this.Currency + " to " + this.Deposit;
    Balance = "Balans";
    TotalBalance = this.Total + " " + this.Balance;
    OnHold = "In de wacht";
    Account = "Account";
    AccountName = this.Account + " " + this.Name;
    Number = "Aantal";
    AccountNumber = this.Account + " " + this.Number;
    Bank = "Bank";
    BankName = this.Bank + " " + this.Name;
    Branch = "Tak";
    IBAN = "ze waren";
    Address = "Adres";
    Minimum = "Minimum";
    WhichEverHigherFormat = "{0} of {1} (wat ooit hoger is)";
    Reference = "Referentie";
    Sr = "Sr.";
    DepositRequest = this.Deposit + " " + this.Request;
    DepositDate = this.Deposit + " " + this.Date;
    New = "nieuwe";
    NoCurrencySelected = "No " + this.Currency + " gekozen";
    Cancel = "annuleren";
    CreatedSuccessfullyFormat = "{0} succesvol gemaakt";
    Select = "kiezen";
    File = "het dossier";
    SelectFile = this.Select + " " + this.File;
    Clear = "Duidelijk";
    Size = "Grootte";
    SizeLimit = this.Size + " " + this.Limit;
    Exceeds = "overschrijdt";
    SizeLimitExceeds = this.SizeLimit + " " + this.Exceeds;
    AllowFileTypesAreFormat = "Toegestane bestandstypen zijn {0}";
    filesSelectedFormat = '{0} bestanden geselecteerd';
    Funding = "Funding";
    Free = "Gratis";
    to = "naar";
    Individual = "individu";
    Business = "Bedrijf";
    Create = "creëren";
    CreateAccount = this.Create + " " + this.Account;
    Receipt = "Bon";
    DepositReceipt = this.Deposit + " " + this.Receipt;
    InterestedIn = "Geïnteresseerd in";
    Duration = "Looptijd";
    FreeInitialConsultation = "Gratis eerste raadpleging";
    AreYouLookingForAReliable = "Bent u op zoek naar een betrouwbare, ervaren";
    SolutionProviderThatCanDeliverInTime = "oplossingsprovider die uw project op tijd kan leveren?";
    Transparency = "Transparantie";
    Quality = "Kwaliteit";
    Deliverables = "deliverables";
    QualityDeliverables = this.Quality + " " + this.Deliverables;
    Flexible = "Flexibele";
    Engagement = "Verloving";
    Models = "modellen";
    FlexibleEngagementModels = this.Flexible + " " + this.Engagement + " " + this.Models;
    Skilled = "geschoold";
    Team = "Team";
    SkilledTeam = this.Skilled + " " + this.Team;
    Talk = "Praten";
    Our = "Onze";
    Experts = "Experts";
    TalkToOurExperts = this.Talk + " to " + this.Our + " " + this.Experts;
    Meet = "Ontmoeten";
    Founder = "Oprichter";
    CEO = "Directeur";
    MeetFounderAndCEO = this.Meet + " " + this.Founder + " en " + this.CEO;
    SerialEnterpreneurPara = "Seriële ondernemer en technologische evangelist gespecialiseerd in real-time toepassingen,";
    CPP = "C ++";
    Linux = "Linux";
    NodeJS = "NodeJS";
    InnovateSolutionsPara = "Innoveer oplossingen met behulp van technologie die echte wereldproblemen voor mensen kan oplossen";
    Years = "Jaar (s)";
    Highly = "highy";
    Experienced = "Ervaren";
    HiglyExperienced = this.Highly + " " + this.Experienced;
    Reliable = "Betrouwbaar";
    Trustable = "Betrouwbare";
    ReiableAndTrustable = this.Reliable + " & " + this.Trustable;
    Successfull = "succesvolle";
    Cooperation = "Samenwerking";
    SuccessfullCooperation = this.Successfull + " " + this.Cooperation;
    HowItWorks = "Hoe het werkt";
    TalkToOneofOurPara = "Praat met een van onze";
    IndusteryExpertsPara = "experts uit de industrie";
    AVelocityDirectorPara  = "A Velocity directeur van engineering zal";
    AVelocityDirectorPara2 = "dan asses de workload en selecteer";
    AVelocityDirectorPara3 = "geschikte bron voor het project.";
    AllocateSuitableResource = "Geschikte middelen toewijzen";
    WeWillThenAssessTheWorkLoadPara  = "Vervolgens beoordelen we de werkbelasting en selecteren we geschikte bronnen voor het project.";
    EnsuringPromptDelivery = "Zorgen voor snelle levering";
    EnsuringPromptDeliveryPara1 = "Ontwikkeling begint onder interne Scrum";
    EnsuringPromptDeliveryPara2 = "Master en partners worden wekelijks bijgewerkt";
    EnsuringPromptDeliveryPara3 = "over de voortgang";
    ServicesWeDeliver = "Services die we leveren";
    ServicesWeDeliverPara = `Bij Velocity oplossingen zijn we gepassioneerd over het bouwen van nieuwe generatie applicaties
     gebruik van technologie. Omdat we oplossingen bouwen die real-world zullen oplossen
     probleem. we zouden graag deel uitmaken van een organisatie die in dezelfde bedrijfstak werkt.`;
    TechnicalConsulting = "Technisch advies";
    TechnicalConsultingPara= `Onze interne kwaliteitscontroleanalisten zorgen ervoor dat het product alleen live wordt
     in
     productie zodra het alle stress-testtechnieken passeert, waarbij het laatste wordt geminimaliseerd
     minimale productieoplossingen`;
    ProductDevelopment= "Product ontwikkeling";
    ProductDevelopmentPara= `We hebben onze klanten geholpen hun bestaande product te verbeteren
     betrouwbaarheid en capaciteit.`;
    UIAndUX= "Hui X";
    UIAndUXPara = `Onze interne kwaliteitscontroleanalisten zorgen ervoor dat het product alleen live wordt
     in
     productie zodra het alle stress-testtechnieken passeert, waarbij het laatste wordt geminimaliseerd
     minimale productie-fixes`;
    DevOps= "Dev Ops";
    DevOpsPara= `Onze interne kwaliteitscontroleanalisten zorgen ervoor dat het product alleen live wordt
     in
     productie zodra het alle stress-testtechnieken passeert, waarbij het laatste wordt geminimaliseerd
     minimale productie-fixes`;
    TechnologiesPara = "Dit zijn de technologieën waarin we ons specialiseren en onze";
    TechnologiesPara2 = "expert zal binnen 3 werkdagen contact met u opnemen";
    Experience = "Ervaring";
    Project = "project";
    Launched = "gelanceerd";
    ProjectLaunched = this.Project + " " + this.Launched;
    Support = "Ondersteuning";
    Satisfied = "Tevreden";
    Customers = "Klanten";
    SatisfiedCustomers = this.Satisfied + " " + this.Customers;
    OurSoftwareDevelopmentIndustries = "Onze software-ontwikkelingsindustrieën";
    OurSoftwareDevelopmentIndustriesPara = "We hebben met succes oplossingen geleverd in de volgende industrieën";
    BlockchainPara = `Wij zijn van mening dat blockchain-technologie de volgende versie van internet is, waar ze vertrouwenloos is
    gedecentraliseerd ecosysteem zal veel problemen op moderne leeftijd oplossen. Gebaseerd op
    dit geloven we ook onze eigen producten aan het ontwikkelen zijn die zullen oplossen
    hoge kostenuitwisseling uitdaging die reizigers moeten hebben.
    Evenzo gebruiken we blockchain om een ??onroerend goed transactie op te lossen
    problemen door alle gegevens van een onroerendgoedtransactie op te geven
    blockchain. Bovendien kunnen gebruikers van dit platform kopen / verkopen
    onroerend goed met behulp van digitale middelen en ons uitwisselingssysteem zal fungeren als een
    liquiditeitsverschaffer om ervoor te zorgen dat conversie op aanvraag wordt gedaan door de
    gedoe van partijen die betrokken zijn bij de transactie.
    Weer is het gebaseerd op Ethereum blockchain, Solidity, privé of openbaar
    blockchain, Hyperledger, Als je een project bent dat een echte wereld oplost
    probleem met behulp van blockchain-technologie waar we heel veel belangstelling voor zouden hebben
    samenwerken om een ??betrouwbare en schaalbare oplossing te leveren.`;
    Healthcare = "Gezondheidszorg";
    HealthcarePara = `Onze ontwikkelaars hebben verschillende projecten in de sector gezondheidszorg ondergedoken;
    variërend van benoemings- en boekingssystemen voor artsen en klanten tot medicijnen
    verificatiescanners. Als u op zoek bent naar een mobiele app-ontwikkeling
    bedrijf
    voor je volgende grote app in de gezondheidszorg, voel je vrij om je te bespreken
    project bij ons. Onze ontwikkelaars hebben in verschillende projecten gedoken
    gezondheidszorgsector; variërend van artsen-cliëntboekingssystemen tot medicijnen
    verificatiescanners. Onze ontwikkelaars hebben in verschillende projecten gedoken
    de
    Sector gezondheidszorg; variërend van afspraken over afspraken en reserveringen voor artsen
    naar
    medicatie verificatie scanners. Als u op zoek bent naar een mobiele app
    ontwikkeling
    bedrijf voor je volgende grote app in de gezondheidszorg, voel je vrij om te doen
    bespreken
    jouw project bij ons.`;
    BankingAndFinance = "Banking & Finance";
    BankingAndFinancePara = `Onze ontwikkelaars hebben verschillende projecten in de sector gezondheidszorg ondergedoken;
    variërend van benoemings- en boekingssystemen voor artsen en klanten tot medicijnen
    verificatiescanners. Als u op zoek bent naar een mobiele app-ontwikkeling
    bedrijf
    voor je volgende grote app in de gezondheidszorg, voel je vrij om je te bespreken
    project bij ons. Onze ontwikkelaars hebben in verschillende projecten gedoken
    gezondheidszorgsector; variërend van artsen-cliëntboekingssystemen tot medicijnen
    verificatiescanners. Onze ontwikkelaars hebben in verschillende projecten gedoken
    de
    Sector gezondheidszorg; variërend van afspraken over afspraken en reserveringen voor artsen
    naar
    medicatie verificatie scanners. Als u op zoek bent naar een mobiele app
    ontwikkeling
    bedrijf voor je volgende grote app in de gezondheidszorg, voel je vrij om te doen
    bespreken
    jouw project bij ons.`;
    RealTimeTradingApps1 = "Realtime";
    RealTimeTradingApps2 = "Trading apps";
    RealTimeTradingAppsPara = `Onze ontwikkelaars hebben verschillende projecten in de gezondheidszorgsector ondergedoken;
    variërend van benoemings- en boekingssystemen voor artsen en klanten tot medicijnen
    verificatiescanners. Als u op zoek bent naar een mobiele app-ontwikkeling
    bedrijf
    voor je volgende grote app in de gezondheidszorg, voel je vrij om je te bespreken
    project bij ons. Onze ontwikkelaars hebben in verschillende projecten gedoken
    gezondheidszorgsector; variërend van artsen-cliëntboekingssystemen tot medicijnen
    verificatiescanners. Onze ontwikkelaars hebben in verschillende projecten gedoken
    de
    Sector gezondheidszorg; variërend van afspraken over afspraken en reserveringen voor artsen
    naar
    medicatie verificatie scanners. Als u op zoek bent naar een mobiele app
    ontwikkeling
    bedrijf voor je volgende grote app in de gezondheidszorg, voel je vrij om te doen
    bespreken
    jouw project bij ons.`;
    Education = "Opleiding";
    EducationAndELearning1 = this.Education + " &";
    ELearning = "E-learning";
    EducationAndELearningPara = `Onze ontwikkelaars hebben verschillende projecten in de sector gezondheidszorg ondergedoken;
     variërend van benoemings- en boekingssystemen voor artsen en klanten tot medicijnen
     verificatiescanners. Als u op zoek bent naar een mobiele app-ontwikkeling
     bedrijf
     voor je volgende grote app in de gezondheidszorg, voel je vrij om je te bespreken
     project bij ons. Onze ontwikkelaars hebben in verschillende projecten gedoken
     gezondheidszorgsector; variërend van artsen-cliëntboekingssystemen tot medicijnen
     verificatiescanners. Onze ontwikkelaars hebben in verschillende projecten gedoken
     de
     Sector gezondheidszorg; variërend van afspraken over afspraken en reserveringen voor artsen
     naar
     medicatie verificatie scanners. Als u op zoek bent naar een mobiele app
     ontwikkeling
     bedrijf voor je volgende grote app in de gezondheidszorg, voel je vrij om te doen
     bespreken
     jouw project bij ons.`;
    Cloud = "Wolk";
    Technologies = "Technologies";
    CloudTechnologiesPara = `Onze ontwikkelaars hebben verschillende projecten in de sector gezondheidszorg ondergedoken;
     variërend van benoemings- en boekingssystemen voor artsen en klanten tot medicijnen
     verificatiescanners. Als u op zoek bent naar een mobiele app-ontwikkeling
     bedrijf
     voor je volgende grote app in de gezondheidszorg, voel je vrij om je te bespreken
     project bij ons. Onze ontwikkelaars hebben in verschillende projecten gedoken
     gezondheidszorgsector; variërend van artsen-cliëntboekingssystemen tot medicijnen
     verificatiescanners. Onze ontwikkelaars hebben in verschillende projecten gedoken
     de
     Sector gezondheidszorg; variërend van afspraken over afspraken en reserveringen voor artsen
     naar
     medicatie verificatie scanners. Als u op zoek bent naar een mobiele app
     ontwikkeling
     bedrijf voor je volgende grote app in de gezondheidszorg, voel je vrij om te doen
     bespreken
     jouw project bij ons.`;
    Automotive = "Automotive";
    AutomotivePara = `Onze ontwikkelaars hebben verschillende projecten in de sector gezondheidszorg ondergedoken;
     variërend van benoemings- en boekingssystemen voor artsen en klanten tot medicijnen
     verificatiescanners. Als u op zoek bent naar een mobiele app-ontwikkeling
     bedrijf
     voor je volgende grote app in de gezondheidszorg, voel je vrij om je te bespreken
     project bij ons. Onze ontwikkelaars hebben in verschillende projecten gedoken
     gezondheidszorgsector; variërend van artsen-cliëntboekingssystemen tot medicijnen
     verificatiescanners. Onze ontwikkelaars hebben in verschillende projecten gedoken
     de
     Sector gezondheidszorg; variërend van afspraken over afspraken en reserveringen voor artsen
     naar
     medicatie verificatie scanners. Als u op zoek bent naar een mobiele app
     ontwikkeling
     bedrijf voor je volgende grote app in de gezondheidszorg, voel je vrij om te doen
     bespreken
     jouw project bij ons.`;
    Tourism = "Toerisme";
    TravelAndTourism = this.Travel + " & " + this.Tourism;
    TravelAndTourismPara = `Onze ontwikkelaars hebben verschillende projecten in de sector gezondheidszorg ondergedoken;
     variërend van benoemings- en boekingssystemen voor artsen en klanten tot medicijnen
     verificatiescanners. Als u op zoek bent naar een mobiele app-ontwikkeling
     bedrijf
     voor je volgende grote app in de gezondheidszorg, voel je vrij om je te bespreken
     project bij ons. Onze ontwikkelaars hebben in verschillende projecten gedoken
     gezondheidszorgsector; variërend van artsen-cliëntboekingssystemen tot medicijnen
     verificatiescanners. Onze ontwikkelaars hebben in verschillende projecten gedoken
     de
     Sector gezondheidszorg; variërend van afspraken over afspraken en reserveringen voor artsen
     naar
     medicatie verificatie scanners. Als u op zoek bent naar een mobiele app
     ontwikkeling
     bedrijf voor je volgende grote app in de gezondheidszorg, voel je vrij om te doen
     bespreken
     jouw project bij ons.`;
    Manufacturing = "Manufacturing";
    ManufacturingPara = `Ouw ontwikkelaars hebben verschillende projecten in de sector gezondheidszorg ondergedoken;
     variërend van benoemings- en boekingssystemen voor artsen en klanten tot medicijnen
     verificatiescanners. Als u op zoek bent naar een mobiele app-ontwikkeling
     bedrijf
     voor je volgende grote app in de gezondheidszorg, voel je vrij om je te bespreken
     project bij ons. Onze ontwikkelaars hebben in verschillende projecten gedoken
     gezondheidszorgsector; variërend van artsen-cliëntboekingssystemen tot medicijnen
     verificatiescanners. Onze ontwikkelaars hebben in verschillende projecten gedoken
     de
     Sector gezondheidszorg; variërend van afspraken over afspraken en reserveringen voor artsen
     naar
     medicatie verificatie scanners. Als u op zoek bent naar een mobiele app
     ontwikkeling
     bedrijf voor je volgende grote app in de gezondheidszorg, voel je vrij om te doen
     bespreken
     jouw project bij ons.`;
    Intellectual = "intellectueel";
    Property = "Eigendom";
    Products = "producten";
    PropertyProducts = this.Property + " " + this.Products;
    IntellectualPropertyProductsPara = `Onze ontwikkelaars hebben verschillende projecten in de sector gezondheidszorg ondergedoken;
     variërend van benoemings- en boekingssystemen voor artsen en klanten tot medicijnen
     verificatiescanners. Als u op zoek bent naar een mobiele app-ontwikkeling
     bedrijf
     voor je volgende grote app in de gezondheidszorg, voel je vrij om je te bespreken
     project bij ons. Onze ontwikkelaars hebben in verschillende projecten gedoken
     gezondheidszorgsector; variërend van artsen-cliëntboekingssystemen tot medicijnen
     verificatiescanners. Onze ontwikkelaars hebben in verschillende projecten gedoken
     de
     Sector gezondheidszorg; variërend van afspraken over afspraken en reserveringen voor artsen
     naar
     medicatie verificatie scanners. Als u op zoek bent naar een mobiele app
     ontwikkeling
     bedrijf voor je volgende grote app in de gezondheidszorg, voel je vrij om te doen
     bespreken
     jouw project bij ons.`;
    Gaming = "gaming";
    GamingPara = `Onze ontwikkelaars hebben verschillende projecten in de sector gezondheidszorg ondergedoken;
     variërend van benoemings- en boekingssystemen voor artsen en klanten tot medicijnen
     verificatiescanners. Als u op zoek bent naar een mobiele app-ontwikkeling
     bedrijf
     voor je volgende grote app in de gezondheidszorg, voel je vrij om je te bespreken
     project bij ons. Onze ontwikkelaars hebben in verschillende projecten gedoken
     gezondheidszorgsector; variërend van artsen-cliëntboekingssystemen tot medicijnen
     verificatiescanners. Onze ontwikkelaars hebben in verschillende projecten gedoken
     de
     Sector gezondheidszorg; variërend van afspraken over afspraken en reserveringen voor artsen
     naar
     medicatie verificatie scanners. Als u op zoek bent naar een mobiele app
     ontwikkeling
     bedrijf voor je volgende grote app in de gezondheidszorg, voel je vrij om te doen
     bespreken
     jouw project bij ons.`;
    Media = "Media";
    MediaAnd = this.Media + " &";
    Entertainment = "vermaak";
    MediaAndEntertainmentPara = `Onze ontwikkelaars hebben verschillende projecten in de sector gezondheidszorg ondergedoken;
     variërend van benoemings- en boekingssystemen voor artsen en klanten tot medicijnen
     verificatiescanners. Als u op zoek bent naar een mobiele app-ontwikkeling
     bedrijf
     voor je volgende grote app in de gezondheidszorg, voel je vrij om je te bespreken
     project bij ons. Onze ontwikkelaars hebben in verschillende projecten gedoken
     gezondheidszorgsector; variërend van artsen-cliëntboekingssystemen tot medicijnen
     verificatiescanners. Onze ontwikkelaars hebben in verschillende projecten gedoken
     de
     Sector gezondheidszorg; variërend van afspraken over afspraken en reserveringen voor artsen
     naar
     medicatie verificatie scanners. Als u op zoek bent naar een mobiele app
     ontwikkeling
     bedrijf voor je volgende grote app in de gezondheidszorg, voel je vrij om te doen
     bespreken
     jouw project bij ons.`;
    ProjectsSuccessfullyDelivery1 = "Projecten met succes afgeleverd";
    ProjectsSuccessfullyDelivery2 = "voor deze klanten";
    DepartureControlSystem1 = "Vertrekcontrolesysteem en";
    DepartureControlSystem2 = "Vluchtbeheersysteem";
    RealtimeRemoteControl1 = "Realtime afstandsbediening";
    RealtimeRemoteControl2 = "toepassing";
    LondonUndergroundRailSimulation1 = "Londense metro";
    LondonUndergroundRailSimulation2 = "simulatie";
    CloudGaming = this.Cloud + " " + this.Gaming;
    Virtualization = "virtualisatie";
    CloudVirtualization = this.Cloud + " " + this.Virtualization;
    Lets = "Laten we";
    ContactUs1 = "Wij geloven in het oplossen van problemen met";
    ContactUs2 = "Vaardigheid, passie, kwaliteit en betrouwbaarheid";
    ContactUs3 = "dat zou kunnen resulteren in het opbouwen van langdurige relaties.";
    ContactUs4 = "Dus als u op zoek bent naar een ontwikkelaar in deze gebieden";
    ContactUs5 = "vul ons onderstaande formulier in en ons team zal binnen enkele dagen contact met u opnemen.";
    ThankYouForContactingUs = "Bedankt dat je contact met ons hebt opgenomen.";
    WeHaveReceivedYourMessage = "We hebben je bericht ontvangen.";
    OurExpertWillBeInTouchWithYou = "Onze expert neemt binnen 3 werkdagen contact met u op";
    FahadSheikh = "Fahad Sheikh";
    AngularJS = "angularjs";
    MeanStack = "Gemiddelde stapel";
    ReactNative = "Reageer Native";
    BlockchainForTravel = this.Blockchain + " voor " + this.Travel;
    BlockchainForRealEstate = this.Blockchain + " voor " + this.RealEstate;
    HTML5 = "HTML5";
    CSS = "CSS";
    ReactJS = "ReactJS";
    FullStackDevelopment = "Volledige stapelontwikkeling";
    MobileDevelopment = "Mobiele ontwikkeling";
    ServerDevelopment = "Server ontwikkeling";
    AWS = "AWS";
    EC2Console = "EC2-console";
    ERC20Tokens = "ERC20 Tokens";
    DecentralisedApps = "Gedecentraliseerde apps";
    XenServer = "Xen-server";
    RealTime = "Echte tijd";
    Applications = "toepassingen";
    RealTimeApplications = this.RealTime + " " + this.Applications;
    Java = "Java";
    ApacheTomcat = "Apache Tomcat";
    Copyrights = "copyrights";
    CopyrightsWithYear = this.Copyrights + "@ 2019";
    AllRightsReserved = "Alle rechten voorbehouden";
    VelocitySolutions = "Velocity Solutions";
    OperatingUnderVelocitySolutions = "Werken onder " + this.VelocitySolutions;
    CompanyNo = "Bedrijf Nee";
    Method = "Methode";
    DepositMethod = this.Deposit + " " + this.Method
    Params = "params";
    MinimumAmountFormat = this.Minimum + " " + this.Amount + " is {0}";
    NotSaved = "Niet opgeslagen";

}