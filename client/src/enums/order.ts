
    export enum OrderTypes {
        limit= 1,
        market= 2,
    }
    export enum OrderActions {
        buy = 1,
        sell = 2,
    }
    export enum OrderRecordStatuses {
        open = 1,
        cancelled = 2,
        partially_completed = 3,
        completed = 4,
    }
    export enum OrderExchangeOrigins {
        local = 1,
        kraken = 2,
    }
    export enum OrderTaskKeys{
        TaskExecuted = 1,
    }
    export enum CurrencyTypes{
        Base = "tc_name",
        Quote = "fc_name",
    }