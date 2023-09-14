import { DetailsArrangement, DetailsArrangementXML } from "../../../../dto/cosmos/account/details/arrangement";
import { undefValsToNull } from "../../../../../utils";

export const formatDetailsArrangement = ({ arrstartdate, arrenddate }: DetailsArrangementXML): DetailsArrangement => {
  let startedAt;
  if (arrstartdate) {
    startedAt = new Date(arrstartdate).toISOString();
  }

  let endedAt;
  if (arrenddate) {
    endedAt = new Date(arrenddate).toISOString();
  }
  

  const formattedDetailsArrangement: DetailsArrangement = {
    startedAt,
    endedAt,
  };

  return undefValsToNull<DetailsArrangement>(formattedDetailsArrangement);
}