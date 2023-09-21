import { dateToDob } from '../../utils';
import { CosmosSearchParameters } from './cosmosQuery';
import { CosmosSearchCredentials } from './search';

export const buildCallReportQuery = (dto: CosmosSearchParameters): object => ({
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
          elements: [buildCallReportXMLSecurity(dto.credentials)],
        },
        {
          type: 'element',
          name: 'soap:Body',
          elements: [
            {
              type: 'element',
              name: 'Search07a',
              elements: [
                {
                  type: 'element',
                  name: 'SearchDefinition',
                  elements: [
                    {
                      type: 'element',
                      name: 'creditrequest',
                      elements: [
                        {
                          type: 'element',
                          name: 'applicant',
                          elements: [
                            {
                              type: 'element',
                              name: 'address',
                              elements: [
                                {
                                  type: 'element',
                                  name: 'abodeno',
                                  elements: [
                                    {
                                      type: 'text',
                                      text:
                                        dto.query.address.subBuildingNumber ||
                                        dto?.query?.address?.subBuildingName?.substring(
                                          0,
                                          30
                                        ),
                                    },
                                  ],
                                },
                                {
                                  type: 'element',
                                  name: 'buildingno',
                                  elements: [
                                    {
                                      type: 'text',
                                      text: dto.query.address.buildingNumber,
                                    },
                                  ],
                                },
                                {
                                  type: 'element',
                                  name: 'buildingname',
                                  elements: [
                                    {
                                      type: 'text',
                                      text: dto.query.address.buildingName,
                                    },
                                  ],
                                },
                                {
                                  type: 'element',
                                  name: 'street1',
                                  elements: [
                                    {
                                      type: 'text',
                                      text: dto.query.address.line1,
                                    },
                                  ],
                                },
                                {
                                  type: 'element',
                                  name: 'street2',
                                  elements: [
                                    {
                                      type: 'text',
                                      text: dto.query.address.line2,
                                    },
                                  ],
                                },
                                {
                                  type: 'element',
                                  name: 'locality',
                                  elements: [],
                                },
                                {
                                  type: 'element',
                                  name: 'posttown',
                                  elements: [
                                    {
                                      type: 'text',
                                      text: dto.query.address.city,
                                    },
                                  ],
                                },
                                {
                                  type: 'element',
                                  name: 'postcode',
                                  elements: [
                                    {
                                      type: 'text',
                                      text: dto.query.address.postcode,
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              type: 'element',
                              name: 'name',
                              elements: [
                                {
                                  type: 'element',
                                  name: 'title',
                                  elements: [
                                    { type: 'text', text: dto.query.title },
                                  ],
                                },
                                {
                                  type: 'element',
                                  name: 'forename',
                                  elements: [
                                    { type: 'text', text: dto.query.firstname },
                                  ],
                                },
                                {
                                  type: 'element',
                                  name: 'othernames',
                                  elements: [],
                                },
                                {
                                  type: 'element',
                                  name: 'surname',
                                  elements: [
                                    { type: 'text', text: dto.query.lastname },
                                  ],
                                },
                              ],
                            },
                            {
                              type: 'element',
                              name: 'dob',
                              elements: [
                                {
                                  type: 'text',
                                  text: dateToDob(dto.query.dob),
                                },
                              ],
                            },
                            {
                              type: 'element',
                              name: 'applicantdemographics',
                              elements: [
                                {
                                  type: 'element',
                                  name: 'employment',
                                  elements: [],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          type: 'element',
                          name: 'score',
                          elements: [{ type: 'text', text: '1' }],
                        },
                        {
                          type: 'element',
                          name: 'purpose',
                          elements: [{ type: 'text', text: 'QS' }],
                        },
                        {
                          type: 'element',
                          name: 'autosearch',
                          elements: [{ type: 'text', text: '1' }],
                        },
                        {
                          type: 'element',
                          name: 'autosearchmaximum',
                          elements: [{ type: 'text', text: '10' }],
                        },
                      ],
                      attributes: { schemaversion: '7.3', datasets: '511' },
                    },
                  ],
                },
              ],
              attributes: {
                xmlns: 'urn:callcredit.co.uk/soap:bsbandcreditreport7',
              },
            },
          ],
        },
      ],
    },
  ],
});

const buildCallReportXMLSecurity = (credentials: CosmosSearchCredentials) => ({
  type: 'element',
  name: 'callcreditheaders',
  attributes: {
    xmlns: 'urn:callcredit.co.uk/soap:bsbandcreditreport7',
  },
  elements: [
    {
      type: 'element',
      name: 'company',
      elements: [
        {
          type: 'text',
          text: credentials.username.split('\\')[0],
        },
      ],
    },
    {
      type: 'element',
      name: 'username',
      elements: [
        {
          type: 'text',
          text: credentials.username.split('\\')[1],
        },
      ],
    },
    {
      type: 'element',
      name: 'password',
      elements: [
        {
          type: 'text',
          text: credentials.password,
        },
      ],
    },
  ],
});
