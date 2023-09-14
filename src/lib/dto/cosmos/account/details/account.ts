import AccountCodeReverse from "../enums/reverse/accountCodeReverse";

export interface DetailsAccountXML {
  acctypecode?: string;
  accgroupid?: number;
  accstartdate?: string;
  accenddate?: string;
}

export interface DetailsAccount {
  /// The regular payment amount to the nearest pound e.g. 500 = £500
  code?: AccountCodeReverse;
  /// The expected payment amount to the nearest pound e.g. 500 = £500
  groupCode?: string;
  /// The date the payment started
  startedAt?: Date;
  /// The date the payment ended
  endedAt?: Date;
}