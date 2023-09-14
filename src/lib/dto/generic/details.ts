import { DetailsAccount } from '../cosmos/account/details/account';
import { DetailsAccountSuffix } from '../cosmos/account/details/accountSuffix';
import { DetailsArrangement } from '../cosmos/account/details/arrangement';
import { DetailsBalanceAmount } from '../cosmos/account/details/balanceAmount';
import { DetailsBehavioural } from '../cosmos/account/details/behavioural';
import { DetailsCurrency } from '../cosmos/account/details/currency';
import { DetailsInitialAmount } from '../cosmos/account/details/initialAmount';
import { DetailsJoint } from '../cosmos/account/details/joint';
import { DetailsLimitAmount } from '../cosmos/account/details/limitAmount';
import { DetailsPayment } from '../cosmos/account/details/payment';
import { DetailsRepayment } from '../cosmos/account/details/repayment';
import { DetailsAccountStatus } from '../cosmos/account/details/status';

export interface Details {
  /// The account number
  accountNumber?: string;
  /// The account suffix
  accountSuffix?: DetailsAccountSuffix;
  isJoint?: DetailsJoint;
  /// The status code for the share account
  status: DetailsAccountStatus;
  /// The iso currency code
  currency: DetailsCurrency;
  /// The balance amount to the nearest pound e.g. 500 = £500
  balanceAmount?: DetailsBalanceAmount;
  /// The intial balance amount to the nearest pound e.g. 2500 = £2,500. This could be opening balance or the first seen current balance reported
  initialAmount?: DetailsInitialAmount;
  /// The limit amount to the nearest pound e.g. 1500 = £1,500
  limitAmount?: DetailsLimitAmount;
  arrangement?: DetailsArrangement;
  payment: DetailsPayment;
  account?: DetailsAccount;
  repayment: DetailsRepayment;
  behavioural?: DetailsBehavioural;
  /// The date the account was last updated
  updatedAt?: Date;
}
