export const API_AUTH_KEY: string = process.env.API_AUTH_KEY;

export const GLOBAL_CONFIG = {
    API_AUTH_KEY: process.env.API_AUTH_KEY,
    TU_USERNAME: process.env.TU_USERNAME,
    TU_PASSWORD: process.env.TU_PASSWORD,
    cosmos: {
        stg_url: 'https://ct.callcreditsecure.co.uk/SingleAccessPoint/Api/v1.0',
        prd_url: 'https://www.callcreditsecure.co.uk/SingleAccessPoint/Api/v1.0',
    },
    callReport: {
        stg_url: 'https://ct.callcreditsecure.co.uk/Services/BSB/CRBSB7.asmx',
        prd_url: 'https://www.callcreditsecure.co.uk/Services/BSB/CRBSB7.asmx',
    },
};
