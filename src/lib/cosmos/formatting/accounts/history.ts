import PaymentStatus from '../../../dto/cosmos/account/enums/paymentStatus';
import AccountStatusReverse from '../../../dto/cosmos/account/enums/reverse/accountStatusReverse';
import { History, HistoryXML } from '../../../dto/cosmos/account/history';
import { undefValsToNull } from '../../../../utils';
import { getEnumKeyByEnumValue } from '../../../../utils';

// defaultBlock used because default is a reserved word
export const formatHistory = (
  history: HistoryXML[],
  isInPence: boolean
): History[] => {
  const multiplier = isInPence ? 100 : 1;

  const arrayHistory = Array.isArray(history) ? history : [history];

  const outputHistories = arrayHistory.map(({ ['@_']: historyItem }) => {
    let accountStatus;
    if (
      !historyItem?.acc ||
      !(accountStatus = AccountStatusReverse[historyItem?.acc?.toUpperCase()])
    ) {
      throw new Error(`Invalid AccountCode code: ${historyItem?.acc}`);
    }

    let paymentStatus;
    if (
      !historyItem?.pay ||
      !(paymentStatus = getEnumKeyByEnumValue(PaymentStatus, historyItem?.pay))
    ) {
      throw new Error(`Invalid PaymentStatus code: ${historyItem?.pay}`);
    }

    // this method of setting the date satisfies type checking, but is not ideal
    // in future we should probably have an ISOString type
    let recordedAt;
    if (historyItem.m) {
      recordedAt = new Date(historyItem.m).toISOString();
    }

    //parseint bal and check if is is a number, if so assign to amount var
    let balanceAmount;
    if (historyItem.bal && !isNaN(parseInt(historyItem.bal))) {
      balanceAmount = parseInt(historyItem.bal) * multiplier;
    }

    let limitAmount;
    if (historyItem.limit && !isNaN(parseInt(historyItem.limit))) {
      limitAmount = parseInt(historyItem.limit) * multiplier;
    }

    let statementAmount;
    if (historyItem.stmtbal && !isNaN(parseInt(historyItem.stmtbal))) {
      statementAmount = parseInt(historyItem.stmtbal) * multiplier;
    }

    let paymentAmount;
    if (historyItem.payamt && !isNaN(parseInt(historyItem.payamt))) {
      paymentAmount = parseInt(historyItem.payamt) * multiplier;
    }

    let count;
    if (
      historyItem.cashadvcount &&
      !isNaN(parseInt(historyItem.cashadvcount))
    ) {
      count = parseInt(historyItem.cashadvcount);
    }

    let cashAdvanceAmount;
    if (
      historyItem.cashadvtotal &&
      !isNaN(parseInt(historyItem.cashadvtotal))
    ) {
      cashAdvanceAmount = parseInt(historyItem.cashadvtotal) * multiplier;
    }

    const outputHistory: History = {
      amount: balanceAmount,
      limitAmount,
      statementAmount,
      paymentAmount,
      accountStatus: accountStatus.toLowerCase(),
      paymentStatus: paymentStatus.toLowerCase(),
      cashAdvance: {
        count,
        amount: cashAdvanceAmount,
      },
      recordedAt,
    };

    return undefValsToNull<History>(outputHistory);
  });

  return outputHistories;
};
