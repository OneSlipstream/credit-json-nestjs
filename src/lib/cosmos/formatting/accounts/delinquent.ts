import {
  Delinquent,
  DelinquentXML,
} from '../../../dto/cosmos/account/delinquent';
import { undefValsToNull } from '../../../../utils';

// defaultBlock used because default is a reserved word
export const formatDelinquent = (
  delinquent: DelinquentXML,
  isInPence: boolean
): Delinquent => {
  const multiplier = isInPence ? 100 : 1;

  // this method of setting the date satisfies type checking, but is not ideal
  // in future we should probably have an ISOString type
  // also relevant to Holder
  let delinquentAt;
  if (delinquent.delinqdate) {
    delinquentAt = new Date(delinquent.delinqdate).toISOString();
  }

  const balance = delinquent.delinqbal * multiplier;

  const formattedDelinquent: Delinquent = {
    balance,
    delinquentAt,
  };

  return undefValsToNull<Delinquent>(formattedDelinquent);
};
