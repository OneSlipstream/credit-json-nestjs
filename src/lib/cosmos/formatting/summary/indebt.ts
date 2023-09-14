import { InDebt, InDebtXML } from '../../../dto/cosmos/indebt';
import { undefValsToNull } from '../../../../utils';

export const formatInDebt = (
  indebt: InDebtXML | undefined,
  isInPence: boolean
): InDebt => {
  const multiplier = isInPence ? 100 : 1;

  const totalBalancesActive = indebt?.totalbalancesactive
    ? indebt.totalbalancesactive * multiplier
    : undefined;
  const totalBalancesRevolve = indebt?.totalbalancesrevolve
    ? indebt.totalbalancesrevolve * multiplier
    : undefined;
  const balanceLimitRatioRevolve = indebt?.balancelimitratiorevolve;
  const totalLimitsRevolve = indebt?.totallimitsrevolve
    ? indebt.totallimitsrevolve * multiplier
    : undefined;
  const totalBalancesLoans = indebt?.totalbalancesloans
    ? indebt.totalbalancesloans * multiplier
    : undefined;
  const totalBalancesMortgages = indebt?.totalbalancesmortgages
    ? indebt.totalbalancesmortgages * multiplier
    : undefined;

  const formattedInDebt: InDebt = {
    totalBalancesActive,
    totalBalancesRevolve,
    balanceLimitRatioRevolve,
    totalLimitsRevolve,
    totalBalancesLoans,
    totalBalancesMortgages,
  };

  return undefValsToNull<InDebt>(formattedInDebt);
};
