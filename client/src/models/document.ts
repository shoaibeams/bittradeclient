import {
  ProofTypes,
  DocumentTypes,
  DocumentRecordStatuses
} from "../enums/kyc";
import { AccountTypes } from "../enums/general";
import { mdDigitalEvidence } from "./digital-evidence";
import { mdUserAccounts } from "./user-accounts";

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
  constructor() {
    this.requirements = [];
  }
}
