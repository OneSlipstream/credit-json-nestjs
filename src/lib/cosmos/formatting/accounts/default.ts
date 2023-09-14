import { Default, DefaultXML } from '../../../dto/cosmos/account/default';
import { undefValsToNull } from '../../../../utils';

// defaultBlock used because default is a reserved word
export const formatDefault = (
  defaultBlock: DefaultXML,
  isInPence: boolean
): Default => {
  const multiplier = isInPence ? 100 : 1;

  // this method of setting the date satisfies type checking, but is not ideal
  // in future we should probably have an ISOString type
  // also relevant to Holder
  let defaultedAt;
  if (defaultBlock.defdate) {
    defaultedAt = new Date(defaultBlock.defdate).toISOString();
  }

  const originalAmount = defaultBlock.origdefbal * multiplier;
  const terminationAmount = defaultBlock.termbal * multiplier;

  let satisfiedAt;
  if (defaultBlock.defsatdate) {
    satisfiedAt = new Date(defaultBlock.defsatdate).toISOString();
  }

  let repossessedAt;
  if (defaultBlock.repodate) {
    repossessedAt = new Date(defaultBlock.repodate).toISOString();
  }

  const formattedDefault: Default = {
    defaultedAt,
    originalAmount,
    terminationAmount,
    satisfiedAt,
    repossessedAt,
  };

  return undefValsToNull<Default>(formattedDefault);
};
