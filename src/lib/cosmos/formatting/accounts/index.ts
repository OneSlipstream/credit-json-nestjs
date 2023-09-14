import { AccountXML, Account } from '../../../dto/cosmos/account';
import { formatDefault } from './default';
import { formatDelinquent } from './delinquent';
import { formatDetails } from './details';
import { formatHistory } from './history';
import { formatHolder } from './holder';
import { formatSupplier } from './supplier';

export const formatAccounts = (
  accounts: AccountXML | AccountXML[],
  isInPence: boolean
): Account[] => {
  const arrayAccounts = Array.isArray(accounts) ? accounts : [accounts];

  const formattedAccounts = arrayAccounts.map((account) => {
    const outputAccount: Account = {
      supplier: formatSupplier(account.supplierdetails),
      holder: formatHolder(account.accholderdetails),
      history: formatHistory(account.acchistory.ah, isInPence),
      details: formatDetails(account.accdetails, isInPence),
    };

    if (account.default) {
      outputAccount.default = formatDefault(account.default, isInPence);
    }

    if (account.delinquent) {
      outputAccount.delinquent = formatDelinquent(
        account.delinquent,
        isInPence
      );
    }

    return outputAccount;
  });

  return formattedAccounts;
};
