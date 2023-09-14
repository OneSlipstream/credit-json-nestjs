import { undefValsToNull } from '../../../../utils';

import { PickList, PicklistXML } from '../../../dto/cosmos/picklist';

export const formatPicklist = (picklist: PicklistXML): PickList => {
  const applicant = picklist?.applicant;
  let reportType;

  switch (applicant?.['@_']?.reporttype) {
    case '0':
      reportType = 'none';
      break;
    case '1':
      reportType = 'address';
      break;
    case '2':
      reportType = 'surname';
      break;
    case '3':
      reportType = 'individual';
      break;
    case '4':
      reportType = 'too_many';
      break;
    case '5':
      reportType = 'non_dom';
      break;
    default:
      throw new Error('invalid report type');
  }

  const address = applicant?.address;
  const fullMatch = address?.fullmatches?.fullmatch;
  const addressMatch = fullMatch?.addressmatch;

  const nameMatch = fullMatch?.name?.namematches?.namematch;
  const {
    title,
    forename: firstname,
    othernames: othername,
    surname: lastname,
  } = nameMatch ?? {};

  const dob = nameMatch?.dob
    ? new Date(nameMatch?.dob).toISOString()
    : undefined;

  const {
    abodeno: abodeNumber,
    buildingno: buildingNumber,
    buildingname: buildingName,
    street1,
    street2,
    sublocality: subLocality,
    locality,
    posttown: town,
    postcode,
  } = addressMatch || {};

  const formattedPicklist = {
    title: title?.toLowerCase(),
    firstname: firstname?.toLowerCase(),
    othername: othername?.toLowerCase(),
    lastname: lastname?.toLowerCase(),
    dob,
    address: {
      buildingName: buildingName?.toLowerCase(),
      buildingNumber: buildingNumber,
      subBuildingName:
        abodeNumber && !`${abodeNumber}`.match(/^[0-9]+$/)
          ? abodeNumber
          : undefined,
      subBuildingNumber:
        abodeNumber && `${abodeNumber}`.match(/^[0-9]+$/)
          ? parseInt(abodeNumber)
          : undefined,
      line1: street1?.toLowerCase(),
      line2: street2?.toLowerCase(),
      city: town?.toLowerCase() ?? subLocality?.toLowerCase(),
      state: locality?.toLowerCase(),
      postcode: postcode?.toLowerCase(),
      country: 'gb',
    },
    reportType,
  };

  return undefValsToNull<PickList>(formattedPicklist);
};
