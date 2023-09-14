import {
  DetailsInitialAmount,
  DetailsInitialAmountXML,
} from '../../../../dto/cosmos/account/details/initialAmount';

export const formatDetailsInitialAmount = (
  intialAmount: DetailsInitialAmountXML,
  isInPence: boolean
): DetailsInitialAmount => {
  const multiplier = isInPence ? 100 : 1;

  return intialAmount !== undefined ? intialAmount * multiplier : null;
};
