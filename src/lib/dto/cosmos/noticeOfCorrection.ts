export interface NoticeOfCorrectionXML {
  type?: string;
  refnum: string;
  dateraised: string;
  text?: string;
  name?: string;
  address?: string;
}

export interface NoticeOfCorrection {
  reference: string;
  dateRaised: string;
  text?: string;
  name?: string;
  address?: string;
}
