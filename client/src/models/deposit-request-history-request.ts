import * as EnumsDepositRequest from '../enums/deposit-requests'

export class mdDepositRequestHisotryRequest {
    id: number;
    currency_id: number;
    user_id: number;
    deposit_method_id: number;
    reference: string;
    record_status: EnumsDepositRequest.DepositRequestRecordStatuses;
    amountFrom: number;
    amountTo: number;
    depositDateFrom: Date;
    depositDateTo: Date;
    createdTimeStampTo: Date;
    createdTimeStampFrom: Date;
    last: number; //for pagination, last id.
    rpp: number; //records per page
    order: string;
}