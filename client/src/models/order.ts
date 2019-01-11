export class mdOrder{
    public type: number;
    public action: number;
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