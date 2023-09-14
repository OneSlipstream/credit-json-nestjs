import { Links, LinksXML } from "../../../dto/cosmos/links";
import { undefValsToNull } from "../../../../utils";

export const formatLinks = (links: LinksXML): Links => {
  const undeclaredAddresses = links.totalundecaddresses;
  const undeclaredAddressesSearched = links.totalundecaddressessearched;
  const undeclaredAddressesUnsearched = links.totalundecaddressesunsearched;
  const undeclaredAliases = links.totalundecaliases;
  const undeclaredAssociates = links.totalundecassociates;

  const formattedLinks = {
    undeclaredAddresses,
    undeclaredAddressesSearched,
    undeclaredAddressesUnsearched,
    undeclaredAliases,
    undeclaredAssociates,
  };

  return undefValsToNull<Links>(formattedLinks);
}