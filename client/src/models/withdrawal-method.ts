import { RecordStatuses } from "../enums/general";

export class mdWithdrawalMethod {
  id: number;
  title: string;
  currency_id: number;
  minimum_withdrawal: number;
  fee: number;
  record_status: RecordStatuses;
}
