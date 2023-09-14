import { Details } from '../../generic/details';
import { Holder } from '../../generic/holder';
import { Default, DefaultXML } from './default';
import { Delinquent, DelinquentXML } from './delinquent';
import { History, HistoryXML } from './history';

import { HolderXML } from './holder';
import { Supplier, SupplierXML } from './supplier';

// ref page 147 callreport spec
export interface AccountXML {
  supplierdetails: SupplierXML;
  accholderdetails: HolderXML;
  default?: DefaultXML;
  delinquent?: DelinquentXML;
  acchistory: {
    ah: HistoryXML[];
  };
  accdetails: any;
  notice?: any;
}

export interface Account {
  supplier: Supplier;
  holder: Holder;
  default?: Default;
  delinquent?: Delinquent;
  history: History[];
  details: Details;
}
