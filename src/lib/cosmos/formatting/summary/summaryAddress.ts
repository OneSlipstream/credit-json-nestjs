import {
  SummaryAddress,
  SummaryAddressXML,
} from '../../../dto/cosmos/summaryAddress';
import { undefValsToNull } from '../../../../utils';

export const formatSummaryAddress = (
  summaryAddress: SummaryAddressXML
): SummaryAddress => {
  const pafValid = summaryAddress.pafvalid == 1;
  const rollingRoll =
    summaryAddress?.rollingroll !== undefined
      ? summaryAddress.rollingroll == 1
      : undefined;
  const messageCode = summaryAddress.messagecode;

  const formattedSummaryAddress: SummaryAddress = {
    inPostalAddressFile: pafValid,
    isRollingElectoralRoll: rollingRoll,
    messageCode,
  };

  return undefValsToNull<SummaryAddress>(formattedSummaryAddress);
};
