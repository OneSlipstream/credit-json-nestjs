import { Bais, BaisXML } from "../../../dto/cosmos/bais";
import { undefValsToNull } from "../../../../utils";

export const formatBais = (bais: BaisXML): Bais => {
  const totalDischarged = bais.totaldischarged;

  const currentlyInsolvent = bais.currentlyInsolvent == 1;
  const restricted = bais?.restricted !== undefined ? bais.restricted == 1 : undefined;

  const formattedBais = {
    totalDischarged,
    currentlyInsolvent,
    restricted,
  };

  return undefValsToNull<Bais>(formattedBais);
}