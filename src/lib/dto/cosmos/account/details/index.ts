import { DetailsAccount } from './account';
import { DetailsAccountSuffix, DetailsAccountSuffixXML } from './accountSuffix';
import { DetailsArrangement } from './arrangement';
import { DetailsBalanceAmount, DetailsBalanceAmountXML } from './balanceAmount';
import { DetailsBehavioural } from './behavioural';
import { DetailsCurrency, DetailsCurrencyXML } from './currency';
import { DetailsInitialAmount, DetailsInitialAmountXML } from './initialAmount';
import { DetailsJoint, DetailsJointXML } from './joint';
import { DetailsLimitAmount, DetailsLimitAmountXML } from './limitAmount';
import { DetailsPayment } from './payment';
import { DetailsRepayment } from './repayment';
import { DetailsAccountStatus, DetailsAccountStatusXML } from './status';

// ref page 154 callreport spec
export interface DetailsXML {
  accno?: string;
  accsuffix?: DetailsAccountSuffixXML;
  joint?: DetailsJointXML;
  status: DetailsAccountStatusXML;
  currencycode: DetailsCurrencyXML;
  balance?: DetailsBalanceAmountXML;
  openbalance?: DetailsInitialAmountXML;
  limit?: DetailsLimitAmountXML;
  dateupdated?: string;

  // arrangement
  arrstartdate?: string;
  arrenddate?: string;

  // payment
  regpayment?: number;
  expectedpayment?: number;
  actualpayment?: number;
  lumppayment?: number;
  penintamt?: number;
  paystartdate?: string;

  // account
  acctypecode?: string;
  accgroupid?: number;
  accstartdate?: string;
  accenddate?: string;

  // repayment
  repayperiod?: number;
  repayfreqcode?: string;

  // behavioural
  promotionalrate?: number;
  minimumpayment?: number;
  statementbalance?: number;
}
