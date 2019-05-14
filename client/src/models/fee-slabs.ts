import { RecordStatuses } from "../enums/general";
import { FeeSlabFeeApplyTypes, FeeSlabTypes } from "../enums/fee-slabs";

export class mdFeeSlabs {
  id: number;
  record_type: FeeSlabTypes;
  pk: string;
  from_volume: number;
  to_volume: number;
  fee: number;
  fee_percentage: number;
  fee_type: FeeSlabFeeApplyTypes;
  record_status: RecordStatuses;
  created_timestamp: Date;
}
