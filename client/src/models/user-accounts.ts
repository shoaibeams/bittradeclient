import { Constants } from "../shared/constants";
import { RecordStatuses, Genders } from "../enums/general";

export class mdUserAccounts {
  public id: number;
  public user_id: number;
  public first_name: string;
  middle_name: string;
  public last_name: string;
  public dob: Date;
  gender: Genders;
  public record_status: RecordStatuses;
  public company_name: string;
  public account_type: number;
  public uuid: string;
  public country_name: string;
  public country_code: string;
  public default_currency_pair_id: number;
  default_currency_id: number;

  constructor(init?: boolean) {
    if (init === true) {
      this.id = null;
      this.user_id = null;
      this.first_name = "";
      this.middle_name = "";
      this.last_name = "";
      this.dob = null;
      this.gender = Genders.Male;
      this.record_status = RecordStatuses.active;
      this.company_name = "";
      this.account_type = null;
      this.uuid = "";
      this.country_name = "";
      this.country_code = "";
      this.default_currency_pair_id = null;
    }
  }
}

export class UserAccountsMetaData {
  public static first_nameMaxLength: number = 30;
  public static middle_nameMaxLength: number = 20;
  public static last_nameMaxLength: number = 30;
  public static company_nameMaxLength: number = 50;
  public static uuidMaxLength: number = 50;
}
