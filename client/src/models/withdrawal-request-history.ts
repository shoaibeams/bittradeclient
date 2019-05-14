import { mdWithdrawalRequest } from "./withdrawal-request";
import { mdBankAccount } from "./bank-account";

export class mdWithdrawalRequestHistory extends mdWithdrawalRequest {
  currency_name: string;
  icon: string;
  email: string;
  bankAccount: mdBankAccount;
}
