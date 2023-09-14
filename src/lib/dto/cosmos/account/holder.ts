import Address from '../../generic/address';
import AccountHolderStatus from '../../generic/enums/accountHolderStatus';

export interface HolderXML {
  name?: string;
  address?: string;
  dob?: string;
  statuscode: string;
  startdate?: string;
  enddate?: string;
}
