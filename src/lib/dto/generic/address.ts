export default interface Address {
  /// The name or number of the abode
  abodeName: string;
  /// The building number
  buildingNumber: string;
  /// The building name
  buildingName: string;
  /// Address line 1 (e.g., street)
  street1: string;
  /// Address line 2 (e.g., apartment, suite, unit, or building)
  street2: string;
  /// The name of the neighborhood
  sublocality: string;
  /// The city or district
  locality: string;
  /// The town
  town: string;
  /// The postal code
  postalCode: string;
}
