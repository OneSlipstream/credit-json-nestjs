import AccountHolderStatusReverse from '../../../dto/generic/enums/reverse/accountHolderStatusReverse';
import { HolderXML } from '../../../dto/cosmos/account/holder';
import { undefValsToNull } from '../../../../utils';
import { Holder } from '../../../dto/generic/holder';

export const formatHolder = (holder: HolderXML): Holder => {
  if (
    !holder?.statuscode ||
    !AccountHolderStatusReverse[holder?.statuscode?.toUpperCase()]
  ) {
    throw new Error(`Invalid supplier code: ${holder?.statuscode}`);
  }

  // TODO: fix name parsing using picklist
  const [, firstname, ...othernames] =
    holder.name?.toLowerCase().split(' ') || [];

  const lastname = othernames.pop();

  const status = AccountHolderStatusReverse[holder.statuscode.toUpperCase()];

  let dob;
  if (holder.dob) {
    dob = new Date(holder.dob).toISOString();
  }

  let startedAt;
  if (holder.startdate) {
    startedAt = new Date(holder.startdate).toISOString();
  }

  let endedAt;
  if (holder.enddate) {
    endedAt = new Date(holder.enddate).toISOString();
  }

  const formattedHolder: Holder = {
    firstname,
    othernames: othernames.join(' '),
    lastname,
    dob,
    status,
    startedAt,
    endedAt,
  };

  return undefValsToNull<Holder>(formattedHolder);
};
