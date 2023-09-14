import { dateToDob } from '../../utils';

import { CosmosSearchCredentials, CosmosSearchQuery } from './search';

export interface CosmosSearchParameters {
  query: CosmosSearchQuery;
  credentials: CosmosSearchCredentials;
}

export const buildCosmosXMLQuery = (dto: CosmosSearchParameters): object => ({
  elements: [
    {
      type: 'element',
      name: 'soap:Envelope',
      attributes: {
        'xmlns:ns':
          'http://www.callcredit.co.uk/SingleAccessPointService/ISingleAccessPointService/1.0',
        'xmlns:soap': 'http://www.w3.org/2003/05/soap-envelope',
      },
      elements: [
        {
          type: 'element',
          name: 'soap:Header',
          elements: [buildCosmosXMLSecurity(dto.credentials)],
        },
        {
          type: 'element',
          name: 'soap:Body',
          elements: [
            {
              type: 'element',
              name: 'ns:Search',
              elements: [
                {
                  type: 'element',
                  name: 'ns:request',
                  elements: [
                    {
                      type: 'element',
                      name: 'ns:Individuals',
                      elements: [
                        {
                          type: 'element',
                          name: 'ns:Individual',
                          elements: [
                            {
                              type: 'element',
                              name: 'ns:DateOfBirth',
                              elements: [
                                {
                                  type: 'text',
                                  text: `${dateToDob(dto.query.dob)}`,
                                },
                              ],
                            },
                            {
                              type: 'element',
                              name: 'ns:Names',
                              elements: [
                                {
                                  type: 'element',
                                  name: 'ns:Name',
                                  elements: [
                                    {
                                      type: 'element',
                                      name: 'ns:Title',
                                      elements: [
                                        {
                                          type: 'text',
                                          text: dto.query.title,
                                        },
                                      ],
                                    },
                                    {
                                      type: 'element',
                                      name: 'ns:GivenName',
                                      elements: [
                                        {
                                          type: 'text',
                                          text: dto.query.firstname,
                                        },
                                      ],
                                    },
                                    {
                                      type: 'element',
                                      name: 'ns:OtherNames',
                                      elements: dto.query.othernames ? [
                                          {
                                          type: 'text',
                                          text: dto.query.othernames,
                                        }
                                      ] : [],
                                    },
                                    {
                                      type: 'element',
                                      name: 'ns:FamilyName1',
                                      elements: [
                                        {
                                          type: 'text',
                                          text: dto.query.lastname,
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              type: 'element',
                              name: 'ns:Addresses',
                              elements: [
                                {
                                  type: 'element',
                                  name: 'ns:Address',
                                  elements: [
                                    {
                                      type: 'element',
                                      name: 'ns:Line2',
                                      elements: [
                                        {
                                          type: 'text',
                                          text: dto.query.address
                                            .buildingnumber,
                                        },
                                      ],
                                    },
                                    {
                                      type: 'element',
                                      name: 'ns:Line4',
                                      elements: [
                                        {
                                          type: 'text',
                                          text: dto.query.address.street1,
                                        },
                                      ],
                                    },
                                    {
                                      type: 'element',
                                      name: 'ns:Line8',
                                      elements: [
                                        {
                                          type: 'text',
                                          text: dto.query.address.town,
                                        },
                                      ],
                                    },
                                    {
                                      type: 'element',
                                      name: 'ns:Line10',
                                      elements: [
                                        {
                                          type: 'text',
                                          text: dto.query.address.postcode,
                                        },
                                      ],
                                    },
                                    {
                                      type: 'element',
                                      name: 'ns:CountryCode',
                                      elements: [
                                        {
                                          type: 'text',
                                          text: 'GBR', // always GBR
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              type: 'element',
                              name: 'ns:ApplicationSettings',
                              elements: [
                                {
                                  type: 'element',
                                  name: 'ns:HouseholdSearchEnabled',
                                  elements: [
                                    {
                                      type: 'text',
                                      text: 'false',
                                    },
                                  ],
                                },
                                {
                                  type: 'element',
                                  name: 'ns:ThirdPartyOptOut',
                                  elements: [
                                    {
                                      type: 'text',
                                      text: 'false',
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      type: 'element',
                      name: 'ns:ProductsToCall',
                      elements: [
                        {
                          type: 'element',
                          name: 'ns:BSBAndCreditReport7',
                          attributes: {
                            DataSets: '511',
                          },
                          elements: [
                            {
                              type: 'element',
                              name: 'ns:Score',
                              elements: [
                                {
                                  type: 'text',
                                  text: '0',
                                },
                              ],
                            },
                            {
                              type: 'element',
                              name: 'ns:Purpose',
                              elements: [
                                {
                                  type: 'text',
                                  text: dto.query.searchPurpose,
                                },
                              ],
                            },
                            {
                              type: 'element',
                              name: 'ns:AutoSearch',
                              elements: [
                                {
                                  type: 'text',
                                  text: '1',
                                },
                              ],
                            },
                            {
                              type: 'element',
                              name: 'ns:AutoSearchMaximum',
                              elements: [
                                {
                                  type: 'text',
                                  text: '10',
                                },
                              ],
                            },
                          ],
                        },
                        {
                          type: 'element',
                          name: 'ns:TrueVision',
                          attributes: {
                            DataSets: '511',
                          },
                          elements: [
                            {
                              type: 'element',
                              name: 'ns:Score',
                              elements: [
                                {
                                  type: 'text',
                                  text: '1',
                                },
                              ],
                            },
                            {
                              type: 'element',
                              name: 'ns:Purpose',
                              elements: [
                                {
                                  type: 'text',
                                  text: 'QS',
                                },
                              ],
                            },
                            {
                              type: 'element',
                              name: 'ns:AutoSearch',
                              elements: [
                                {
                                  type: 'text',
                                  text: '0',
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});

const buildCosmosXMLSecurity = (credentials: CosmosSearchCredentials) => ({
  type: 'element',
  name: 'Security',
  attributes: {
    xmlns:
      'http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd',
  },
  elements: [
    {
      type: 'element',
      name: 'UsernameToken',
      elements: [
        {
          type: 'element',
          name: 'Username',
          elements: [
            {
              type: 'text',
              text: credentials.username,
            },
          ],
        },
        {
          type: 'element',
          name: 'Password',
          elements: [
            {
              type: 'text',
              text: credentials.password,
            },
          ],
        },
      ],
    },
  ],
});
