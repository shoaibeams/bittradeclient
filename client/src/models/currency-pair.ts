export class mdCurrencyPair{
    public id: number;
    public from_currency_id: number;
    public to_currency_id: number;
    public from_currency_scale: number;
    public to_currency_scale: number;
    public scale_match: number;
    public min_buy_amount: number;
    public min_sell_amount: number;
    public kraken_min_order_volume: number;
    public record_status: number;

    fc_name: string;
    tc_name: string;
    buy_fee: number;
    sell_fee: number;
    fcd_scale: number;
    tcd_scale: number;
    fc_symbol: string;
    tc_symbol: string;
    fc_icon: string;
    tc_icon: string;
    name: string;//kraken asset pair name
}