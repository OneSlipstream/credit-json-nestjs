import { SearchPurpose } from "src/lib/helper/bureau";

export class CreateSearchDto {
    purpose: SearchPurpose;
    title?: string;
    firstname: string;
    othernames?: string;
    lastname: string;
    dob: string;
    address: {
      buildingName?: string | null;
      buildingNumber?: string | null;
      subBuildingName?: string | null;
      subBuildingNumber?: string | null;
      line1: string;
      line2?: string | null;
      city: string;
      state?: string | null;
      postcode: string;
      country: 'GBR';
    };
}
