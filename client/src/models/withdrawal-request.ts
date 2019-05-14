import { WithdrawalRequestRecordStatuses } from "../enums/withdrawal";
import { mdBankAccount } from "./bank-account";

export class mdWithdrawalRequest {
  id: number;
  user_id: number;
  currency_id: number;
  bank_account_id: number;
  withdrawal_method_id: number;
  amount: number;
  fee: number;
  bank_charges: number;
  record_status: WithdrawalRequestRecordStatuses;
  timestamp: Date;
  amount_sent: number;
  remarks: string;
  verified_by: number;
  verification_timestamp: Date;

  bankAccount: mdBankAccount;
}

export class WithdrawalRequestMedataData {
  static RemarksMaxLength = 500;
}
