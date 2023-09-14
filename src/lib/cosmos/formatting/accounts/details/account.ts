import { DetailsAccount, DetailsAccountXML } from "../../../../dto/cosmos/account/details/account";
import AccountGroupCode from "../../../../dto/cosmos/account/enums/groupCode";
import AccountCodeReverse from "../../../../dto/cosmos/account/enums/reverse/accountCodeReverse";
import { undefValsToNull } from "../../../../../utils";

export const formatDetailsAccount = ({ acctypecode, accgroupid, accstartdate, accenddate }: DetailsAccountXML): DetailsAccount => {
  let code;
  if (!acctypecode || !(code = AccountCodeReverse[acctypecode?.toUpperCase()])) {
    throw new Error(`Invalid accountType code: ${acctypecode}`);
  }

  let groupCode;
  if (!accgroupid || !(groupCode = AccountGroupCode[accgroupid])) {
    throw new Error(`Invalid AccountGroupCode code: ${accgroupid}`);
  }

  if (groupCode !== undefined) {
    groupCode = groupCode.toLowerCase();
  }

  let startedAt;
  if (accstartdate) {
    startedAt = new Date(accstartdate).toISOString();
  }

  let endedAt;
  if (accenddate) {
    endedAt = new Date(accenddate).toISOString();
  }

  const accountOutput: DetailsAccount = {
    code,
    groupCode,
    startedAt,
    endedAt,
  }

  return undefValsToNull<DetailsAccount>(accountOutput);
}