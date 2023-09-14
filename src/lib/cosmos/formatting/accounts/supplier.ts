import SupplierCodeReverse from "../../../dto/cosmos/account/enums/reverse/supplierCodeReverse";
import { Supplier, SupplierXML } from "../../../dto/cosmos/account/supplier";
import { undefValsToNull } from "../../../../utils";

export const formatSupplier = (account: SupplierXML): Supplier => {
  if (!account?.suppliertypecode || !SupplierCodeReverse[account?.suppliertypecode?.toUpperCase()]) {
    throw new Error(`Invalid supplier code: ${account?.suppliertypecode}`);
  }

  const name = account.suppliername;
  const code = SupplierCodeReverse[account.suppliertypecode.toUpperCase()];

  const formattedSupplier: Supplier = {
    name,
    code
  };

  return undefValsToNull<Supplier>(formattedSupplier);
}