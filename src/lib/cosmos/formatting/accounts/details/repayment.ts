import { DetailsRepayment, DetailsRepaymentXML } from "../../../../dto/cosmos/account/details/repayment";
import FrequencyCodeReverse from "../../../../dto/cosmos/account/enums/reverse/frequencyCodeReverse";
import { undefValsToNull } from "../../../../../utils";

export const formatDetailsRepayment = ({ repayperiod, repayfreqcode }: DetailsRepaymentXML): DetailsRepayment => {
  let frequency;
  if (!repayfreqcode || !(frequency = FrequencyCodeReverse[repayfreqcode?.toUpperCase()])) {
    throw new Error(`Invalid FrequencyCode code: ${repayfreqcode}`);
  }

  const formattedRepayment: DetailsRepayment = {
    frequency,
    duration: repayperiod,
  }

  return undefValsToNull<DetailsRepayment>(formattedRepayment);
}