import {
  DetailsLimitAmount,
  DetailsLimitAmountXML,
} from '../../../../dto/cosmos/account/details/limitAmount';

export const formatDetailsLimitAmount = (
  limitAmount: DetailsLimitAmountXML,
  isInPence: boolean
): DetailsLimitAmount => {
  const multiplier = isInPence ? 100 : 1;

  return limitAmount !== undefined ? limitAmount * multiplier : null;
};
