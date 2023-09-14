import { CIFAS, CIFASXML } from "../../../dto/cosmos/cifas";
import { undefValsToNull } from "../../../../utils";

export const formatCIFAS = (cifas: CIFASXML): CIFAS => {
  const totalRecords = cifas.totalcifas;

  const formattedCIFAS = {
    totalRecords,
  };

  return undefValsToNull<CIFAS>(formattedCIFAS);
}