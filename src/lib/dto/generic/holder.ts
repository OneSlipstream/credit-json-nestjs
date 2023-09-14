import Address from './address';
import AccountHolderStatus from './enums/accountHolderStatus';

export interface Holder {
  /// The account holder's firstname
  firstname?: string;
  /// The account holder's middle names or initials
  othernames?: string;
  /// The account holder's lastname
  lastname?: string;
  /// The account holder's date of birth
  dob?: Date;
  /// The account holder's address
  address?: Address;
  /// The status of the account holder
  status: AccountHolderStatus;
  /// The date when account holder first appeared on the account
  startedAt?: Date;
  /// The date when account holder left the account
  endedAt?: Date;
}
