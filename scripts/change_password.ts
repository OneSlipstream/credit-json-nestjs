import * as convert from 'xml-js';
import axios from 'axios';

export interface TUChangePasswordParameters {
    username: string;
    existingPassword: string;
    newPassword: string;
}

const CALLREPORT_URL = 'https://www.callcreditsecure.co.uk/Services/BSB/CRBSB7.asmx'
const CALLREPORT_TEST_URL = 'https://ct.callcreditsecure.co.uk/Services/BSB/CRBSB7.asmx'

export const buildCallReportChangePasswordQuery = (dto: TUChangePasswordParameters): object => ({
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
          elements: [buildCallReportXMLSecurity(dto)],
        },
        {
          type: 'element',
          name: 'soap:Body',
          elements: [
            {
              type: 'element',
              name: 'ChangePassword07a',
              elements: [
                {
                    type: 'element',
                    name: 'newpwd',
                    elements: [
                        {
                            type: 'text',
                            text: dto.newPassword
                        }
                    ] 
                },
                {
                    type: 'element',
                    name: 'confirmpwd',
                    elements: [
                        {
                            type: 'text',
                            text: dto.newPassword
                        }
                    ]
                }
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

const buildCallReportXMLSecurity = (credentials: TUChangePasswordParameters) => ({
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
          text: credentials.existingPassword,
        },
      ],
    },
  ],
});

(async () => {
    if (process.argv.length < 5) {
        console.log('Missing arguments, expected: \'company\\username\' existingPassword newPassword');
        return;
    }

    const username = process.argv[2];
    const existingPassword = process.argv[3];
    const newPassword = process.argv[4];
  
    const dto: TUChangePasswordParameters = {
        username,
        existingPassword,
        newPassword
    };

    const changePasswordPayload = buildCallReportChangePasswordQuery(dto);

    const xmlPayload = convert.js2xml(changePasswordPayload);

    const isCTest = /CTest/.test(dto.username);

    const url = isCTest ? CALLREPORT_TEST_URL : CALLREPORT_URL;

    const response = await axios.post<string>(url, xmlPayload, {
        headers: {
            'Content-Type': 'text/xml',
            Host: new URL(url).host,
        },
        timeout: 15000,
    });

    console.log(response.data);

    if (response.status !== 200) {
        console.log('Failed to change password');
        return;
    }
})();