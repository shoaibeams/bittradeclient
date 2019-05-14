import { mdWithdrawalRequest } from "./withdrawal-request";

export class mdWithdrawalRequestHistoryRequest extends mdWithdrawalRequest {
  amountFrom: number;
  amountTo: number;
  feeFrom: number;
  feeTo: number;
  timestampTo: Date;
  timestampFrom: Date;
  verification_timestampTo: Date;
  verification_timestampFrom: Date;
  last: number; //last id, we'll send id's greater than the last one
  rpp: number; //records per page
  order: string;
}
