export interface DefaultXML {
  defdate?: string;
  origdefbal: number;
  termbal: number;
  defsatdate?: string;
  repodate?: string;
}

export interface Default {
  /// The original default balance to the nearest unit e.g. 1000 = £1000
  originalAmount: number;
  /// The amount of the default balance at the time of termination to the nearest unit e.g. 1000 = £1000
  terminationAmount?: number;
  /// The date when the account defaulted
  defaultedAt?: Date;
  /// The date when the account was satisfied
  satisfiedAt?: Date;
  /// The date when the account was repossessed
  repossessedAt?: Date;
}