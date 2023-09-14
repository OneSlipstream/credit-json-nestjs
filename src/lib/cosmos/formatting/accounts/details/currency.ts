import { DetailsCurrency, DetailsCurrencyXML } from "../../../../dto/cosmos/account/details/currency";
import { Currency } from "../../../../dto/cosmos/currency";

export const formatDetailsCurrency = (currency: DetailsCurrencyXML): DetailsCurrency => {
  let currencyOutput;
  if (!currency || !(currencyOutput = Currency[currency?.toUpperCase()])) {
    throw new Error(`Invalid currency code: ${currency}`);
  }

  return currencyOutput;
}