import { RecordStatuses } from "../enums/general";

export class mdDigitalEvidence {
  id: number;
  title: string;
  name: string;
  path: string;
  user_id: number;
  table_name: string;
  pk: string;
  record_status: RecordStatuses;
  created_timestamp: Date;
}

export class DigitalEvidenceMetadata {
  static nameLength: number = 100;
}
