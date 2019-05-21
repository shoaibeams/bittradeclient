import { Constants } from "../shared/constants";
import { StaticHelper } from "../shared/static-helper";
import { AccountTypes } from "../enums/general";

export class mdSignUp {
  public first_name: string;
  public last_name: string;
  public email: string;
  public username: string;
  public password: string;
  public confirm_password: string;
  public company_name: string;
  public account_type: AccountTypes;
  public uuid: string;
  two_fa_code: string;

  constructor(init?: boolean) {
    if (init === true) {
      this.first_name = "";
      this.last_name = "";
      this.email = "";
      this.username = "";
      this.password = "";
      this.confirm_password = "";
      this.company_name = "";
      this.uuid = "";
      if (Constants.Instance.IsDev) {
        // this.first_name = "inaam";
        // this.last_name = "inaam";
        // this.email = "inaamiub@gmail.com";
        // this.username = this.email;
        // this.password = "pAssword1!"
        // this.confirm_password = this.password;
      }
    }
  }
}

export class SignUpMetaData {
  public static firstNameMaxLength: number = 30;
  public static lastNameMaxLength: number = 30;
  public static emailMaxLength: number = 50;
  public static userNameMaxLength: number = 32;
  public static userNameMinLength: number = 8;
  public static passwordMaxLength: number = 32;
  public static passwordMinLength: number = 8;
  public static companyNameMaxLength: number = 50;
  public static two_fa_codeMaxLength: number = 6;
  public static userNameRegex: string =
    Constants.Instance.Regex.MustStartWithSmallLetter +
    Constants.Instance.Regex.MustBeAlphaNumericSmallLetters +
    StaticHelper.formatString(
      Constants.Instance.Regex.RangeLength,
      SignUpMetaData.userNameMinLength,
      SignUpMetaData.userNameMaxLength
    );
  // `(?=^[a-z]+)(?=^[a-z0-9_]+$)(?=^.{${SignUpMetaData.userNameMinLength},${SignUpMetaData.userNameMaxLength}}$)`;
  public static passwordRegex: string =
    Constants.Instance.Regex.MustContainSmallLetter +
    Constants.Instance.Regex.MustContainCapitalLetter +
    Constants.Instance.Regex.MustContainNumber +
    Constants.Instance.Regex.MustContainSpecialChar +
    StaticHelper.formatString(
      Constants.Instance.Regex.RangeLength,
      SignUpMetaData.passwordMinLength,
      SignUpMetaData.passwordMaxLength
    );
  //`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=^.{${SignUpMetaData.passwordMinLength},${SignUpMetaData.passwordMaxLength}}$)(?=^\\S*$)`;
}
