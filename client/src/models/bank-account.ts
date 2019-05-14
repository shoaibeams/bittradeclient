import { RecordStatuses } from "../enums/general";

export class mdBankAccount {
  id: number;
  bank_name: string;
  bank_code: string;
  account_name: string;
  address: string;
  account_no: string;
  iban: string;
  branch_address: string;
  branch_code: string;
  record_status: RecordStatuses;
  user_id: number;
}

export class BankAccountMetaData {
  static bank_nameMaxLength = 50;
  static bank_codeMaxLength = 20;
  static account_nameMaxLength = 50;
  static addressMaxLength = 100;
  static account_noMaxLength = 20;
  static ibanMaxLength = 20;
  static branch_addressMaxLength = 100;
  static branch_codeMaxLength = 20;
}
