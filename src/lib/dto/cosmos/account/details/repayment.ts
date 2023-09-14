import { PaymentFrequency } from '../../../generic/paymentFrequency';

export interface DetailsRepaymentXML {
  repayperiod?: number;
  repayfreqcode?: string;
}

export interface DetailsRepayment {
  /// The regular payment amount to the nearest pound e.g. 500 = £500
  duration?: number;
  /// The expected payment amount to the nearest pound e.g. 500 = £500
  frequency: PaymentFrequency;
}
