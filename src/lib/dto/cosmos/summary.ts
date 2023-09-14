import { Bais, BaisXML } from './bais';
import { CIFAS, CIFASXML } from './cifas';
import { InDebt, InDebtXML } from './indebt';
import { SummaryJudgments, SummaryJudgmentsXML } from './summaryJudgment';
import { Links, LinksXML } from './links';
import { Notices, NoticesXML } from './notices';
import { Searches, SearchesXML } from './search';
import { Share, ShareXML } from './share';
import { SummaryAddress, SummaryAddressXML } from './summaryAddress';
import { ThirdPartyData, ThirdPartyDataXML } from './thirdPartyData';

export interface SummaryXML {
  searches?: SearchesXML;
  judgments?: SummaryJudgmentsXML;
  bais?: BaisXML;
  notices: NoticesXML;
  links?: LinksXML;
  cifas?: CIFASXML;
  share?: ShareXML;
  indebt?: InDebtXML;
  tpd?: ThirdPartyDataXML;
  summaryaddress: SummaryAddressXML;
}

export interface Summary {
  searches?: Searches;
  judgements?: SummaryJudgments;
  bankruptciesInsolvencies?: Bais; // used to be bais
  notices: Notices;
  links?: Links;
  cifas?: CIFAS;
  computed?: Share;
  indebt?: InDebt;
  thirdPartyData?: ThirdPartyData;
  addressStatus: SummaryAddress;
}
