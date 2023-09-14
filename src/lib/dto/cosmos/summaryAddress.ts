export interface SummaryAddressXML {
  pafvalid: number;
  rollingroll?: number;
  messagecode: number;
}

export interface SummaryAddress {
  inPostalAddressFile: boolean;
  isRollingElectoralRoll?: boolean;
  messageCode: number;
}
