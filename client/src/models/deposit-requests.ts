export class mdDepositRequests
{
    id: number;
    user_id: number;
    currency_id: number;
    deposit_method_id: number;
    amount: number;
    deposit_date: Date;
    description: string;
    record_status: string;
    created_timestamp: Date;
    reference: string;

    de:number[];

    constructor(init?:boolean)
    {
        this.amount = 0;
        this.deposit_date = new Date();
    }
}