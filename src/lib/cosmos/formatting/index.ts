import { XMLParser } from 'fast-xml-parser';
import { Summary } from '../../dto/cosmos/summary';
import { formatSummary } from './summary';
import { formatAccounts } from './accounts';
import { Account } from '../../dto/cosmos/account';
import { formatJudgments } from './judgements';
import { Judgment } from '../../dto/cosmos/judgment';
import { NoticeOfCorrection } from '../../dto/cosmos/noticeOfCorrection';
import { formatNoticesOfCorrection } from './nocs';
import { formatPicklist } from './picklist';
import { PickList } from '../../dto/cosmos/picklist';
import CustomDelegateError from 'src/lib/errors/delegateError';

export interface CosmosOutputObject {
  summary?: Summary;
  accounts?: Account[];
  judgements?: Judgment[];
  noticesOfCorrection?: NoticeOfCorrection[];
  match?: PickList;
  scores?: {
    callReportClass10?: number;
    trueVision?: number;
  };
}

export const cosmosResponseToObject = (
  response: string
): CosmosOutputObject => {
  const isInPence = true;

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributesGroupName: '@_',
    attributeNamePrefix: '',
  });

  const parsed = parser.parse(response);

  const body =
    parsed?.['soap:Envelope']?.['soap:Body'] ||
    parsed?.['s:Envelope']?.['s:Body'];

  const fault = body?.['s:Fault'];

  if (fault) {
    const faultCode = fault?.['s:Code']?.['s:Subcode']?.['s:Value']?.['#text'];
    const faultReason = fault?.['s:Reason']?.['s:Text']?.['#text'];

    // check if fault code is a:FailedAuthentication and throw an error 'IPs not whitelisted' if it is
    if (faultCode === 'a:FailedAuthentication') {
      throw CustomDelegateError.throw('search.create.blocked');
    }

    if (faultReason == 'Unknown Username or Incorrect Password') {
      throw CustomDelegateError.throw('search.create.unauthorised');
    }
  }

  const searchResult =
    body?.Search07aResponse?.SearchResult ||
    body?.SearchResponse?.SearchResult?.ProductResponses?.BSBAndCreditReport7
      ?.BSBAndCreditReport7Response?.Response;

  const error = searchResult?.Error;
  const success = error?.Success;
  if (success === false) {
    throw new Error('Bureau Error');
  }

  const trueVisionResponse =
    body?.SearchResponse?.SearchResult?.ProductResponses?.TrueVision
      ?.TrueVisionResponse?.Response;

  const picklist = searchResult?.picklist;
  const creditReport = searchResult?.creditreport;

  let outputObject: CosmosOutputObject;

  outputObject = {};

  if (picklist) {
    if (Array.isArray(picklist?.applicant?.address?.fullmatches?.fullmatch)) {
      throw CustomDelegateError.throw('search.create.overlap');
    }

    outputObject = {
      ...outputObject,
      match: formatPicklist(picklist),
    };
  }

  if (creditReport?.applicant?.summary) {
    outputObject = {
      ...outputObject,
      summary: formatSummary(creditReport?.applicant?.summary, isInPence),
    };
  }

  if (creditReport?.applicant?.accs) {
    outputObject = {
      ...outputObject,
      accounts: formatAccounts(creditReport?.applicant?.accs.acc, isInPence),
    };
  }

  if (creditReport?.applicant?.judgments) {
    outputObject = {
      ...outputObject,
      judgements: formatJudgments(
        creditReport?.applicant?.judgments?.judgment,
        isInPence
      ),
    };
  }

  if (creditReport?.applicant?.nocs) {
    outputObject = {
      ...outputObject,
      noticesOfCorrection: formatNoticesOfCorrection(
        creditReport?.applicant?.nocs?.noc
      ),
    };
  }

  let callReportClass10;
  if (creditReport?.applicant?.creditscores) {
    const scoresBlock = creditReport?.applicant?.creditscores;
    const arrayScores = Array.isArray(scoresBlock?.creditscore)
      ? scoresBlock?.creditscore
      : [scoresBlock?.creditscore];

    for (const creditscore of arrayScores) {
      if (creditscore?.score?.['@_']?.class === '10') {
        callReportClass10 = creditscore?.score?.['#text'];
      }
    }
  }

  let trueVision;
  if (trueVisionResponse?.trendeddata?.applicant) {
    const applicant = trueVisionResponse?.trendeddata?.applicant;
    for (const characteristicsSet of Array.isArray(
      applicant?.characteristicSets.characteristicsSet
    )
      ? applicant?.characteristicSets.characteristicsSet
      : [applicant?.characteristicSets.characteristicsSet]) {
      if (characteristicsSet?.['@_']?.setName === 'score') {
        for (const characteristic of Array.isArray(
          characteristicsSet?.characteristic
        )
          ? characteristicsSet?.characteristic
          : [characteristicsSet?.characteristic]) {
          if (characteristic?.featureName === 'AOSCORE') {
            trueVision = characteristic?.value;
          }
        }
      }
    }
  }

  outputObject = {
    ...outputObject,
    scores: {
      callReportClass10,
      trueVision,
    },
  };

  return outputObject;
};
