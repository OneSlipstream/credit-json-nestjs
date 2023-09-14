import { Searches, SearchesXML } from "../../../dto/cosmos/search";

export const formatSearches = (searches: SearchesXML): Searches => {
  const last3m = searches.totalsearches3months;
  const last3mHome = searches.totalhomecreditsearches3months;
  const last12m = searches.totalsearches12months;

  return {
    last3m,
    last3mHome,
    last12m,
  };
}