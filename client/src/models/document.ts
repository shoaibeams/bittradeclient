import {
  ProofTypes,
  DocumentTypes,
  DocumentRecordStatuses
} from "../enums/kyc";
import { AccountTypes } from "../enums/general";
import { mdDigitalEvidence } from "./digital-evidence";
import { mdUserAccounts } from "./user-accounts";
import { mdAuthUsers } from "./auth-users";

export class mdDocument {
  id: number;
  user_id: number;
  proof_type: ProofTypes;
  account_type: AccountTypes;
  type: DocumentTypes;
  record_status: DocumentRecordStatuses;
  remarks: string;
  timestamp: Date;
  verified_by: number;
  verification_timestamp: number;

  requirements: any[];
  userAccounts: mdUserAccounts;
  docDetails: mdUserAccounts;
  constructor() {
    this.requirements = [];
    this.userAccounts = new mdUserAccounts();
  }
}

export class mdDocumentHistoryRequest extends mdDocument {
  timestampFrom: Date;
  timestampTo: Date;
  verification_timestampFrom: Date;
  verification_timestampTo: Date;
  page: number;
  rpp: number;
}
