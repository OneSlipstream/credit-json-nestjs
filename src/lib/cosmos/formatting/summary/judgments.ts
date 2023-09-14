import {
  SummaryJudgments,
  SummaryJudgmentsXML,
} from '../../../dto/cosmos/summaryJudgment';
import { undefValsToNull } from '../../../../utils';

export const formatSummaryJudgments = (
  judgments: SummaryJudgmentsXML,
  isInPence: boolean
): SummaryJudgments => {
  const multiplier = isInPence ? 100 : 1;

  const last36m = judgments.total36m;
  const total = judgments.total;
  const active = judgments.totalactive;
  const satisfied = judgments.totalsatisfied;
  const activeAmount = judgments.totalactiveamount
    ? judgments.totalactiveamount * multiplier
    : undefined;
  const satisfiedAmount = judgments.totalsatisfiedamount
    ? judgments.totalsatisfiedamount * multiplier
    : undefined;

  const formattedJudgements: SummaryJudgments = {
    last36m,
    total,
    active,
    satisfied,
    activeAmount,
    satisfiedAmount,
  };

  return undefValsToNull<SummaryJudgments>(formattedJudgements);
};
