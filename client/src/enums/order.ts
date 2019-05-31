export enum OrderTypes {
  limit = "limit",
  market = "market"
}
export enum OrderActions {
  buy = "buy",
  sell = "sell"
}
export enum OrderRecordStatuses {
  open = "open",
  cancelled = "cancelled",
  partially_completed = "partially_completed",
  completed = "completed"
}
export enum ExchangeOrigins {
  local = "local",
  kraken = "kraken"
}
export enum OrderCurrencyTypes {
  Base = "tc_name",
  Quote = "fc_name"
}
