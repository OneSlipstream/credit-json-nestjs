export interface ShareXML {
  totalaccounts: number;
  totalactiveaccs?: number;
  totalsettledaccs?: number;
  totalopened6months: number;
  worsepaystatus12months?: string;
  worsepaystatus36months?: string;
  totaldelinqs12months?: number;
  totaldefaults12months: number;
  totaldefaults36months: number;
}

export interface Share {
  accounts: {
    total: number;
    active?: number;
    settled?: number;
    opened: {
      last6m: number;
    }
    worstPay: {
      last12m?: string;
      last36m?: string;
    }
    delinquencies: {
      last12m?: number;
    }
    defaults: {
      last12m: number;
      last36m: number;
    }
  }
}
