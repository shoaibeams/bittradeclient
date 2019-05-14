import { Constants } from "../shared/constants";
import { StaticHelper } from "../shared/static-helper";
import { UserTypes, UserRecordStatuses } from "../enums/auth-users";
import { mdUserAccounts } from "./user-accounts";

export class mdAuthUsers {
  public id: number;
  public username: string;
  public password: string;
  public user_type: UserTypes;
  public record_status: UserRecordStatuses;
  public email: string;
  public timestamp: Date;

  first_name: string;
  last_name: string;
  userAccount: mdUserAccounts;

  constructor(init?: boolean) {
    this.userAccount = new mdUserAccounts();
    if (init === true) {
      this.id = null;
      this.username = "";
      this.password = "";
      this.user_type = UserTypes.public; //public user
      this.record_status = UserRecordStatuses.active; //active
      this.email = "";
      this.timestamp = new Date();
    }
  }
}

export class AuthUsersMetaData {
  public static userNameMaxLength: number = 32;
  public static userNameMinLength: number = 8;
  public static userNameRegex: string = `(?=^[a-z]+)(?=^[a-z0-9_]+$)(?=^.{${
    AuthUsersMetaData.userNameMinLength
  },${AuthUsersMetaData.userNameMaxLength}}$)`;

  public static passwordMaxLength: number = 32;
  public static passwordMinLength: number = 8;
  public static passwordRegex: string = `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=^.{${
    AuthUsersMetaData.passwordMinLength
  },${AuthUsersMetaData.passwordMaxLength}}$)(?=^\\S*$)`;

  public static emailMaxLength: number = 32;
}
