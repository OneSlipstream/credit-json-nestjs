import { ThirdPartyData, ThirdPartyDataXML } from "../../../dto/cosmos/thirdPartyData";
import { undefValsToNull } from "../../../../utils";

export const formatThirdPartyData = (thirdPartyData: ThirdPartyDataXML): ThirdPartyData => {
  const alertDecision = thirdPartyData.alertdecision;
  const alertReview = thirdPartyData.alertreview;
  const householdOverride = thirdPartyData.hho;

  const formattedThirdPartyData = {
    alertDecision,
    alertReview,
    householdOverride,
  };

  return undefValsToNull<ThirdPartyData>(formattedThirdPartyData);
}