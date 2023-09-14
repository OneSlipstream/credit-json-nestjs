import {
  DetailsBalanceAmount,
  DetailsBalanceAmountXML,
} from '../../../../dto/cosmos/account/details/balanceAmount';

export const formatDetailsBalanceAmount = (
  balanceAmount: DetailsBalanceAmountXML,
  isInPence: boolean
): DetailsBalanceAmount => {
  const multiplier = isInPence ? 100 : 1;

  return balanceAmount !== undefined ? balanceAmount * multiplier : null;
};
