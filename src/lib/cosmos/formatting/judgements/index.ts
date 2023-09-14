import { Judgment, JudgmentXML } from '../../../dto/cosmos/judgment';
import { undefValsToNull } from '../../../../utils';

export const formatJudgments = (
  judgments: JudgmentXML[],
  isInPence: boolean
): Judgment[] => {
  const multiplier = isInPence ? 100 : 1;

  const arrayJudgements = Array.isArray(judgments) ? judgments : [judgments];
  const formattedJudgements = arrayJudgements.map((judgment) => {
    const name = judgment.name;
    const address = judgment.address?.['#text'];
    const dob = judgment.dob ? new Date(judgment.dob).toISOString() : undefined;
    const courtName = judgment.courtname;
    const courtType = judgment.courttype;
    const caseNumber = judgment.casenumber;
    const status = judgment.status;
    const amount = judgment.amount * multiplier;

    return {
      name: name ? name.toLowerCase() : undefined,
      address: address ? address.toLowerCase() : undefined,
      dob,
      courtName: courtName.toLowerCase(),
      courtType,
      caseNumber,
      status,
      amount,
    };
  });

  return undefValsToNull<Judgment[]>(formattedJudgements);
};
