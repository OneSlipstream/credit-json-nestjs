import { SummaryXML, Summary } from '../../../dto/cosmos/summary';
import { formatSummaryJudgments } from './judgments';
import { formatSearches } from './searches';
import { formatBais } from './bais';
import { formatNotices } from './notices';
import { formatLinks } from './links';
import { formatShare } from './share';
import { formatCIFAS } from './cifas';
import { formatInDebt } from './indebt';
import { formatThirdPartyData } from './thirdPartyData';
import { formatSummaryAddress } from './summaryAddress';

export const formatSummary = (
  summary: SummaryXML,
  isInPence: boolean
): Summary => {
  let summaryOutputObject: Summary = {
    notices: formatNotices(summary.notices),
    addressStatus: formatSummaryAddress(summary.summaryaddress),
  };

  if (summary.searches) {
    summaryOutputObject = {
      ...summaryOutputObject,
      searches: formatSearches(summary.searches),
    };
  }

  if (summary.judgments) {
    summaryOutputObject = {
      ...summaryOutputObject,
      judgements: formatSummaryJudgments(summary.judgments, isInPence),
    };
  }

  if (summary.bais) {
    summaryOutputObject = {
      ...summaryOutputObject,
      bankruptciesInsolvencies: formatBais(summary.bais),
    };
  }

  if (summary.links) {
    summaryOutputObject = {
      ...summaryOutputObject,
      links: formatLinks(summary.links),
    };
  }

  if (summary.cifas) {
    summaryOutputObject = {
      ...summaryOutputObject,
      cifas: formatCIFAS(summary.cifas),
    };
  }

  if (summary.share) {
    summaryOutputObject = {
      ...summaryOutputObject,
      computed: formatShare(summary.share),
    };
  }

  summaryOutputObject = {
    ...summaryOutputObject,
    indebt: formatInDebt(summary?.indebt, isInPence),
  };

  if (summary.tpd) {
    summaryOutputObject = {
      ...summaryOutputObject,
      thirdPartyData: formatThirdPartyData(summary.tpd),
    };
  }

  return summaryOutputObject;
};
