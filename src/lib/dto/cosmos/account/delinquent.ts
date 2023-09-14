export interface DelinquentXML {
  delinqdate?: string;
  delinqbal: number;
}

export interface Delinquent {
  /// The delinquency balance to the nearest unit e.g. 500 = £500
  balance: number;
  /// The date when the account became delinquent
  delinquentAt?: Date;
}