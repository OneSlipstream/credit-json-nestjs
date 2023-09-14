import PaymentStatus from '../../../dto/cosmos/account/enums/paymentStatus';
import { Share, ShareXML } from '../../../dto/cosmos/share';
import { getEnumKeyByEnumValue, undefValsToNull } from '../../../../utils';

export const formatShare = (share: ShareXML): Share => {
  //map from sharexml interface to share interface
  const total = share.totalaccounts;
  const active = share.totalactiveaccs;
  const settled = share.totalsettledaccs;
  const opened6Months = share.totalopened6months;
  const delinquencies12Months = share.totaldelinqs12months;
  const defaults12Months = share.totaldefaults12months;
  const defaults36Months = share.totaldefaults36months;

  let worsePayStatus12Months;
  if (
    share?.worsepaystatus12months !== undefined &&
    !(worsePayStatus12Months = getEnumKeyByEnumValue(
      PaymentStatus,
      String(share?.worsepaystatus12months)
    ))
  ) {
    throw new Error(
      `Invalid PaymentStatus code: ${share?.worsepaystatus12months}`
    );
  } else if (share?.worsepaystatus12months === undefined) {
    worsePayStatus12Months = undefined;
  }

  let worsePayStatus36Months;
  if (
    share?.worsepaystatus12months !== undefined &&
    !(worsePayStatus36Months = getEnumKeyByEnumValue(
      PaymentStatus,
      String(share?.worsepaystatus36months)
    ))
  ) {
    throw new Error(
      `Invalid PaymentStatus code: ${share?.worsepaystatus36months}`
    );
  } else if (share?.worsepaystatus36months === undefined) {
    worsePayStatus36Months = undefined;
  }

  const formattedShare: Share = {
    accounts: {
      total,
      active,
      settled,
      opened: {
        last6m: opened6Months,
      },
      worstPay: {
        last12m: worsePayStatus12Months
          ? worsePayStatus12Months.toLowerCase()
          : undefined,
        last36m: worsePayStatus36Months
          ? worsePayStatus36Months.toLowerCase()
          : undefined,
      },
      delinquencies: {
        last12m: delinquencies12Months,
      },
      defaults: {
        last12m: defaults12Months,
        last36m: defaults36Months,
      },
    },
  };

  return undefValsToNull<Share>(formattedShare);
};
