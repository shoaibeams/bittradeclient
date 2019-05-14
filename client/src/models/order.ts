import { OrderActions, OrderTypes } from "../enums/order";

export class mdOrder {
  public type: OrderTypes;
  public action: OrderActions;
  public currencyPair: number;
  public price: number;
  public amount: number;
  constructor(init?: boolean) {
    if (init === true) {
      this.price = 0;
      this.amount = 0;
    }
  }
}
