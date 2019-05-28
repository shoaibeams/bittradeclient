import { UserPhoneNumberStatuses } from "../enums/general";

export class mdUserPhoneNumber {
  id: number;
  user_id: number;
  country_id: number;
  calling_code: string;
  phone_number: string;
  timestamp: number;
  record_status: UserPhoneNumberStatuses;
  verification_code: string;
  verification_timestamp: number;

  code: string;
}
