import { Notices, NoticesXML } from "../../../dto/cosmos/notices";

export const formatNotices = (notices: NoticesXML): Notices => {
  if (notices.nocflag === undefined) {
    throw new Error("nocflag is undefined");
  }
  
  if (notices.totaldisputes === undefined) {
    throw new Error("totalDisputes is undefined");
  }

  const nocFlag = notices.nocflag == 1;
  const totalDisputes = notices.totaldisputes;

  return {
    nocFlag,
    totalDisputes,
  };
}