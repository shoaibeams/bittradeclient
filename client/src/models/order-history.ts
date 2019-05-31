import {
  OrderRecordStatuses,
  OrderTypes,
  OrderActions,
  ExchangeOrigins
} from "../enums/order";

export class mdOrderHistory {
  id: number;
  user_id: number;
  username: string;
  type: OrderTypes;
  action: OrderActions;
  quote_currency: string;
  base_currency: string;
  price: number;
  amount: number;
  total_amount: number;
  remaining_amount: number;
  fee_percentage: number;
  fee: number;
  fee_currency: string;
  record_status: OrderRecordStatuses;
  created_timestamp: Date;
  updated_timestamp: Date;
  cancelled_timestamp: Date;
  exchange_origin: ExchangeOrigins;
  external_order_id: string;
  constructor() {}
}
