import { DetailsAccountSuffix, DetailsAccountSuffixXML } from "../../../../dto/cosmos/account/details/accountSuffix";

export const formatDetailsAccountSuffix = (accountSuffix: DetailsAccountSuffixXML): DetailsAccountSuffix => {
  // check if accountSuffix is a number, if not, return null
  let accountSuffixOutput;
  if (accountSuffix && !isNaN(parseInt(accountSuffix))) {
    accountSuffixOutput = parseInt(accountSuffix);
  }

  return accountSuffixOutput;
}