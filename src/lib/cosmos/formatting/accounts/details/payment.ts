import {
  DetailsPayment,
  DetailsPaymentXML,
} from '../../../../dto/cosmos/account/details/payment';
import { undefValsToNull } from '../../../../../utils';

export const formatDetailsPayment = (
  {
    paystartdate,
    regpayment,
    expectedpayment,
    actualpayment,
    lumppayment,
    penintamt,
  }: DetailsPaymentXML,
  isInPence: boolean
): DetailsPayment => {
  const multiplier = isInPence ? 100 : 1;

  let startedAt;
  if (paystartdate) {
    startedAt = new Date(paystartdate).toISOString();
  }

  const formattedDetailsPayment: DetailsPayment = {
    startedAt,
    regularAmount: regpayment ? regpayment * multiplier : undefined,
    expectedAmount: expectedpayment ? expectedpayment * multiplier : undefined,
    actualAmount: actualpayment ? actualpayment * multiplier : undefined,
    lumpAmount: lumppayment ? lumppayment * multiplier : undefined,
    penaltyInterestAmount: penintamt ? penintamt * multiplier : undefined,
  };

  return undefValsToNull<DetailsPayment>(formattedDetailsPayment);
};
