import { SearchPurpose } from "../helper/bureau";

export interface CosmosSearchCredentials {
  username: string;
  password: string;
}

export type CosmosSearchPurpose = 'QS'; // use a union for other search purposes eg. 'QS' | 'my_other_purpose' | 'my_other_purpose_2'

export interface CosmosSearchQuery {
  searchPurpose: CosmosSearchPurpose;
  title?: string;
  firstname: string;
  othernames?: string;
  lastname: string;
  dob: string;
  address: {
    abodenumber?: string;
    abodename?: string;
    buildingnumber?: string;
    buildingname?: string;
    street1: string;
    street2?: string;
    sublocality?: string;
    locality: string;
    town: string;
    postcode: string;
  };
}
