export interface DetailsPaymentXML {
  regpayment?: number;
  expectedpayment?: number;
  actualpayment?: number;
  lumppayment?: number;
  penintamt?: number;
  paystartdate?: string;
}

export interface DetailsPayment {
  /// The regular payment amount to the nearest pound e.g. 500 = £500
  regularAmount?: number;
  /// The expected payment amount to the nearest pound e.g. 500 = £500
  expectedAmount?: number;
  /// The actual payment amount to the nearest pound e.g. 500 = £500
  actualAmount?: number;
  /// The lump or balloon payment amount to the nearest pound e.g. 500 = £500
  lumpAmount?: number;
  /// The penalty interest amount to the nearest pound e.g. 500 = £500
  penaltyInterestAmount?: number;
  /// The date the payment started
  startedAt?: Date;
}