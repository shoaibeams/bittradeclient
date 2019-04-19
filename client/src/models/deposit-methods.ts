import { RecordStatuses } from "../enums/general";

export class mdDepositMethods {
  id: number;
  title: string;
  currency_id: number;
  bank_account_id: number;
  minimum_deposit: number;
  record_status: RecordStatuses;
}
