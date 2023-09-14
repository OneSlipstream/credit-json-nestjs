export interface PicklistXML {
  '@_': {
    maxaddressitems: string;
    maxnameitems: string;
    picklist: string;
    regenerated: string;
    xmlns: string;
  };
  applicant: {
    '@_': {
      id: string;
      reporttype: string;
    };
    address: {
      '@_': {
        addressid: string;
      };
      addressinput: {
        abodeno?: string;
        buildingno?: string;
        buildingname?: string;
        street1?: string;
        street2?: string;
        sublocality?: string;
        locality?: string;
        posttown?: string;
        postcode?: string;
      };
      fullmatches: {
        '@_': {
          reporttype: string;
          matchstatus: string;
        };
        fullmatch: {
          '@_': {
            selected: string;
          };
          addressmatch: {
            abodeno?: string;
            buildingno?: number;
            buildingname?: string;
            street1: string;
            street2?: string;
            sublocality?: string;
            locality?: string;
            posttown?: string;
            postcode: string;
            domicileid?: string;
          };
          name: {
            '@_': {
              nameid: string;
            };
            nameinput: {
              title?: string;
              forename?: string;
              othernames?: string;
              surname?: string;
            };
            namematches: {
              '@_': {
                reporttype: string;
                matchstatus: string;
              };
              namematch: {
                '@_': {
                  selected: string;
                };
                title?: string;
                forename?: string;
                othernames?: string;
                surname?: string;
                residenceid?: string;
                dob?: string;
              };
            };
          };
        };
      };
    };
  };
}

export interface PickList {
  title?: string;
  firstname?: string;
  othername?: string;
  lastname?: string;
  dob?: string;
  address: {
    buildingName?: string;
    buildingNumber?: number;
    subBuildingName?: string;
    subBuildingNumber?: number;
    line1: string;
    line2?: string;
    city?: string;
    state?: string;
    postcode: string;
    country: string;
  };
  reportType:
    | 'none'
    | 'address'
    | 'surname'
    | 'individual'
    | 'too_many'
    | 'non_dom';
}
