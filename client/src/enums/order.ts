
export namespace Type{
    export function getString(numeric: number)
    {
        return Type[numeric];
    }
}
export namespace Action{
    export function getString(numeric: number)
    {
        return Action[numeric];
    }
}
export namespace RecordStatus{
    export function getString(numeric: number)
    {
        return RecordStatus[numeric];
    }
}
export namespace ExchangeOrigin{
    export function getString(numeric: number)
    {
        return ExchangeOrigin[numeric];
    }
}
export namespace TaskKeys{
    export function getString(numeric: number)
    {
        return TaskKeys[numeric];
    }
}
    export enum Type {
        limit= 1,
        market= 2,
    }
    export enum Action {
        buy = 1,
        sell = 2,
    }
    export enum RecordStatus {
        open = 1,
        cancelled = 2,
        partially_completed = 3,
        completed = 4,
    }
    export enum ExchangeOrigin {
        local = 1,
        kraken = 2,
    }
    export enum TaskKeys{
        TaskExecuted = 1,
    }