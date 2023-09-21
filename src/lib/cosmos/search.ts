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
    subBuildingNumber?: string;
    subBuildingName?: string;
    buildingNumber?: string;
    buildingName?: string;
    line1: string;
    line2?: string;
    sublocality?: string;
    locality: string;
    city: string;
    postcode: string;
  };
}
