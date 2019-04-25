export enum ProofTypes {
  Identity = "identity",
  Address = "address",
  income = "income"
}
export enum DocumentTypes {
  NIC = "nic",
  Passport = "passport",
  DrivingLicense = "driving_license",
  BankStatement = "bank_statement",
  UtilityBill = "utility_bill",
  WagesSlip = "wages_slip",
  ResidentPermit = "resident_permit",
  BusinessIncorporationCertificate = "business_incorporation_certificate",
  MemorandumOfAssociation = "memorandum_of_association",
  Tax = "tax"
}

export enum DocumentRecordStatuses {
  NotSubmitted = "not_submitted",
  Submitted = "submitted",
  Approved = "approved",
  Rejected = "rejected"
}

export class DocumentTypesWithNames {
  private static pictureExtensions = [".png", ".jpg", ".jpeg", ".pdf"];
  static NIC = {
    value: DocumentTypes.NIC,
    title: global.lang.NationalIdentityCard,
    icon: "/assets/images/id-card128x128.png",
    requirements: [
      {
        title: global.lang.FrontPicture,
        types: DocumentTypesWithNames.pictureExtensions,
        noOfFiles: 1
      },
      {
        title: global.lang.BackPicture,
        types: DocumentTypesWithNames.pictureExtensions,
        noOfFiles: 1
      }
    ]
  };
  static Passport = {
    value: DocumentTypes.Passport,
    title: global.lang.Passport,
    icon: "/assets/images/passport128x128.png",
    requirements: [
      {
        title: global.lang.Picture,
        types: DocumentTypesWithNames.pictureExtensions,
        noOfFiles: 1
      }
    ]
  };
  static DrivingLicense = {
    value: DocumentTypes.DrivingLicense,
    title: global.lang.DrivingLicense,
    icon: "/assets/images/driving-license128x128.png",
    requirements: [
      {
        title: global.lang.Attachment,
        types: DocumentTypesWithNames.pictureExtensions,
        noOfFiles: 1
      }
    ]
  };
  static BankStatement = {
    value: DocumentTypes.BankStatement,
    title: global.lang.BankStatement,
    icon: "/assets/images/receipt128x128.png",
    requirements: [
      {
        title: global.lang.Attachment,
        types: DocumentTypesWithNames.pictureExtensions,
        noOfFiles: 1
      }
    ]
  };
  static UtilityBill = {
    value: DocumentTypes.UtilityBill,
    title: global.lang.UtilityBill,
    icon: "/assets/images/invoice128x128.png",
    requirements: [
      {
        title: global.lang.Attachment,
        types: DocumentTypesWithNames.pictureExtensions,
        noOfFiles: 1
      }
    ]
  };
  static WagesSlip = {
    value: DocumentTypes.WagesSlip,
    title: global.lang.WagesSlip,
    icon: "/assets/images/wage128x128.png",
    requirements: [
      {
        title: global.lang.Attachment,
        types: DocumentTypesWithNames.pictureExtensions,
        noOfFiles: 1
      }
    ]
  };
  static ResidentPermit = {
    value: DocumentTypes.ResidentPermit,
    title: global.lang.ResidentPermit,
    icon: "/assets/images/house128x128.png",
    requirements: [
      {
        title: global.lang.FrontPicture,
        types: DocumentTypesWithNames.pictureExtensions,
        noOfFiles: 1
      },
      {
        title: global.lang.BackPicture,
        types: DocumentTypesWithNames.pictureExtensions,
        noOfFiles: 1
      }
    ]
  };
  static BusinessIncorporationCertificate = {
    value: DocumentTypes.BusinessIncorporationCertificate,
    title: global.lang.BusinessIncorporationCertificate,
    icon: "/assets/images/resume128x128.png",
    requirements: [
      {
        title: global.lang.Attachment,
        types: DocumentTypesWithNames.pictureExtensions,
        noOfFiles: 2
      }
    ]
  };
  static MemorandumOfAssociation = {
    value: DocumentTypes.MemorandumOfAssociation,
    title: global.lang.MemorandumOfAssociation,
    icon: "/assets/images/memo128x128.png",
    requirements: [
      {
        title: global.lang.Attachment,
        types: DocumentTypesWithNames.pictureExtensions,
        noOfFiles: 2
      }
    ]
  };
  static Tax = {
    value: DocumentTypes.Tax,
    title: global.lang.TaxDocument,
    icon: "/assets/images/tax128x128.png",
    requirements: [
      {
        title: global.lang.Attachment,
        types: DocumentTypesWithNames.pictureExtensions,
        noOfFiles: 2
      }
    ]
  };
}
