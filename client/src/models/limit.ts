import { CurrencyTypes } from "../enums/currency";
import { AccountTypes } from "../enums/auth-users";
import { RecordStatuses } from "../enums/general";
import { LimitTypes, LimitAppliedConditions } from "../enums/limits";

export class mdLimit {
  id: number;
  type: LimitTypes;
  currency_type: CurrencyTypes;
  currency_id: number;
  account_type: AccountTypes;
  applied_condition: LimitAppliedConditions;
  min: number;
  max: number;
  record_status: RecordStatuses;
}
