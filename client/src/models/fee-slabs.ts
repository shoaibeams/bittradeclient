import * as EnumsFeeSlabs from "../enums/fee-slabs";
import * as Enums from "../enums/general";

export class mdFeeSlabs {
  id: number;
  record_type: EnumsFeeSlabs.RecordType;
  pk: string;
  from_volume: number;
  to_volume: number;
  fee: number;
  fee_percentage: number;
  fee_type: EnumsFeeSlabs.FeeType;
  record_status: Enums.RecordStatuses;
  created_timestamp: Date;
}
