import {
  NoticeOfCorrection,
  NoticeOfCorrectionXML,
} from '../../../dto/cosmos/noticeOfCorrection';
import { undefValsToNull } from '../../../../utils';

export const formatNoticesOfCorrection = (
  nocs: NoticeOfCorrectionXML[]
): NoticeOfCorrection[] => {
  const arrayNocs = Array.isArray(nocs) ? nocs : [nocs];

  const formattedNoticesOfCorrection = arrayNocs.map((noc) => {
    const reference = noc.refnum;
    const dateRaised = noc.dateraised;
    const text = noc.text;
    const name = noc.name;
    const address = noc.address?.['#text'];

    return {
      reference,
      dateRaised,
      text,
      name,
      address,
    };
  });

  return undefValsToNull<NoticeOfCorrection[]>(formattedNoticesOfCorrection);
};
