import { DetailsXML } from '../../../../dto/cosmos/account/details';
import { undefValsToNull } from '../../../../../utils';
import { formatDetailsAccount } from './account';
import { formatDetailsAccountSuffix } from './accountSuffix';
import { formatDetailsArrangement } from './arrangement';
import { formatDetailsBalanceAmount } from './balanceAmount';
import { formatDetailsCurrency } from './currency';
import { formatDetailsInitialAmount } from './intialAmount';
import { formatDetailsJoint } from './joint';
import { formatDetailsLimitAmount } from './limitAmount';
import { formatDetailsPayment } from './payment';
import { formatDetailsAccountStatus } from './status';
import { formatDetailsRepayment } from './repayment';
import { formatDetailsBehavioural } from './behavioural';
import { Details } from '../../../../dto/generic/details';

export const formatDetails = (
  details: DetailsXML,
  isInPence: boolean
): Details => {
  let updatedAt;
  if (details.dateupdated) {
    updatedAt = new Date(details.dateupdated).toISOString();
  }

  const outputDetails: Details = {
    accountNumber: details.accno,
    accountSuffix: formatDetailsAccountSuffix(details.accsuffix),
    isJoint: formatDetailsJoint(details.joint),
    status: formatDetailsAccountStatus(details.status),
    currency: formatDetailsCurrency(details.currencycode),
    balanceAmount: formatDetailsBalanceAmount(details.balance, isInPence),
    initialAmount: formatDetailsInitialAmount(details.openbalance, isInPence),
    limitAmount: formatDetailsLimitAmount(details.limit, isInPence),
    arrangement: formatDetailsArrangement(details),
    payment: formatDetailsPayment(details, isInPence),
    account: formatDetailsAccount(details),
    repayment: formatDetailsRepayment(details),
    behavioural: formatDetailsBehavioural(details, isInPence),
    updatedAt,
  };

  return undefValsToNull<Details>(outputDetails);
};
