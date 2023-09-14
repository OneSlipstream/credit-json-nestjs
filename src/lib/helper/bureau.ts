import { CosmosOutputObject } from "../cosmos/formatting";
import { CosmosSearchCredentials, CosmosSearchPurpose } from "../cosmos/search";

export enum SearchPurpose {
    QUOTATION = 'QS',
}

export type Address = {
    buildingName?: string | null
    buildingNumber?: string | null
    subBuildingName?: string | null
    subBuildingNumber?: string | null
    line1: string
    line2?: string | null
    city: string
    state?: string | null
    postcode: string
    country: 'GBR'
}

export const PersonTitle = {
    MR: 'MR',
    MRS: 'MRS',
    MISS: 'MISS',
    MS: 'MS',
    DR: 'DR',
    PROF: 'PROF',
    SIR: 'SIR'
  };
  
  export type PersonTitle = (typeof PersonTitle)[keyof typeof PersonTitle]

export type Consumer = {
    title: PersonTitle
    firstname: string
    othername: string | null
    lastname: string
    dob: string
}

export type BureauSearchInput = {
    consumer: Consumer;
    address: Address;
    purpose: CosmosSearchPurpose;
  };
  
  export type BureauSearchData = {
    success: boolean;
    payload: string;
    file: string;
  };
  
  export type BureauSearchResponse = {
    reference?: string;
    data: CosmosOutputObject;
  };
  
  export interface BureauHelperProtocol {
    credentials: CosmosSearchCredentials;
  
    createSearch(input: BureauSearchInput): Promise<BureauSearchData>;
    parseSearch(data: BureauSearchData): Promise<BureauSearchResponse>;
  }