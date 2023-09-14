import SupplierCode from './enums/supplierCode';

export interface SupplierXML {
  suppliertypecode?: string;
  suppliername?: string;
}

export interface Supplier {
  // The supplier name for the account
  name?: string;
  // The supplier code for the account
  code?: SupplierCode;
}
