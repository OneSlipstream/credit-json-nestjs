export interface DetailsBehaviouralXML {
  promotionalrate?: number;
  minimumpayment?: number;
  statementbalance?: number;
}

export interface DetailsBehavioural {
  /// Whether a promotional rate applies
  isPromotional: boolean | null;
  /// Whether a minimum payment has been made within accepted tolerances
  hasMinimumPayment: boolean | null;
  /// The balance at the statement date
  statementBalance: number | null;
}