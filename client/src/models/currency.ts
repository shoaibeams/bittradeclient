import { RecordStatuses } from "../enums/general";
import { CurrencyTypes } from "../enums/currency";

export class mdCurrency {
  id: number;
  type: CurrencyTypes;
  name: string;
  description: string;
  kraken_asset_name: string;
  symbol: string;
  icon: string;
  depositable: boolean;
  withdrawable: boolean;
  record_status: RecordStatuses;
  scale: number;

  balance: number;
  hold_balance: number;
}
