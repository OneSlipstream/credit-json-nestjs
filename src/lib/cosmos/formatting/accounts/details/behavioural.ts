import {
  DetailsBehavioural,
  DetailsBehaviouralXML,
} from '../../../../dto/cosmos/account/details/behavioural';
import { undefValsToNull } from '../../../../../utils';

export const formatDetailsBehavioural = (
  { promotionalrate, minimumpayment, statementbalance }: DetailsBehaviouralXML,
  isInPence: boolean
): DetailsBehavioural => {
  const multiplier = isInPence ? 100 : 1;

  const isPromotional =
    promotionalrate !== undefined ? promotionalrate === 1 : null;
  const hasMinimumPayment =
    minimumpayment !== undefined ? minimumpayment === 1 : null;
  const statementBalance =
    statementbalance !== undefined ? statementbalance * multiplier : null;

  const formattedBehavioural: DetailsBehavioural = {
    isPromotional,
    hasMinimumPayment,
    statementBalance,
  };

  return undefValsToNull<DetailsBehavioural>(formattedBehavioural);
};
