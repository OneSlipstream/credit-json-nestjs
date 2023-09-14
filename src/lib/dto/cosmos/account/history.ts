import AccountStatus from './enums/accountStatus';
import PaymentStatus from './enums/paymentStatus';

export interface HistoryXML {
  // all of these are presented as attributes in the XML
  '@_': {
    m: string;
    bal: string;
    limit?: string;
    acc: string;
    pay: string;
    //these 4 are only for orgs receiving APACS data
    stmtbal?: string;
    payamt?: string;
    cashadvcount?: string;
    cashadvtotal?: string;
  };
}

export interface History {
  /// The balance amount to the nearest pound e.g. 500 = £500
  amount?: number;
  /// The credit limit to the nearest pound e.g. 1500 = £1,500
  limitAmount?: number;
  /// The statement balance amount to the nearest pound e.g. 500 = £500
  statementAmount?: number;
  /// The payment amount to the nearest pound e.g. 1000 = £1,000
  paymentAmount?: number;
  /// The status code for the account
  accountStatus: AccountStatus;
  /// The payment status code for the account
  paymentStatus: PaymentStatus;
  cashAdvance: {
    /// The number of cash advances for account
    count?: number;
    /// The total amount of cash advances for account to the nearest pound e.g. 1000 = £1,000
    amount?: number;
  };
  /// The year and month of the history record
  recordedAt: Date;
}
