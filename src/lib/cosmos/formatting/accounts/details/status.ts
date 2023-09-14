import { DetailsAccountStatus, DetailsAccountStatusXML } from "../../../../dto/cosmos/account/details/status";
import ShareAccountStatusReverse from "../../../../dto/cosmos/account/enums/reverse/shareAccountStatusReverse";

export const formatDetailsAccountStatus = (accountStatus: DetailsAccountStatusXML): DetailsAccountStatus => {
  let accountStatusOutput;
  if (!accountStatus || !(accountStatusOutput = ShareAccountStatusReverse[accountStatus?.toUpperCase()])) {
    throw new Error(`Invalid accountStatus code: ${accountStatus}`);
  }

  return accountStatusOutput;
}