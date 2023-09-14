import {
  BureauHelperProtocol,
  BureauSearchData,
  BureauSearchInput,
  BureauSearchResponse,
  SearchPurpose,
} from './bureau';
import { GLOBAL_CONFIG } from '../config';
import { CosmosSearchCredentials, CosmosSearchPurpose } from '../cosmos/search';
import axios from 'axios';
import * as convert from 'xml-js';
import { buildCallReportQuery } from '../cosmos/callReportQuery';
import {
  CosmosSearchParameters,
  buildCosmosXMLQuery,
} from '../cosmos/cosmosQuery';
import { cosmosResponseToObject } from '../cosmos/formatting';
// import LoggerHelper from '../logger.helper';
import { SafeTry } from './safe';

class TransUnionBureauHelper implements BureauHelperProtocol {
  credentials: CosmosSearchCredentials;

  constructor(
    // private logger: LoggerHelper,
    credentials: CosmosSearchCredentials
  ) {
    this.credentials = credentials;
  }

  async createSearch({
    consumer,
    address,
    purpose,
  }: BureauSearchInput): Promise<BureauSearchData> {
    const searchParams: CosmosSearchParameters = {
      query: {
        searchPurpose: this.getPurpose(SearchPurpose[purpose]),
        title: consumer.title,
        firstname: consumer.firstname,
        othernames: consumer.othername ?? undefined,
        lastname: consumer.lastname,
        dob: consumer.dob,
        address: {
          abodenumber: address.subBuildingNumber ?? undefined,
          abodename: address.subBuildingName ?? undefined,
          buildingnumber: address.buildingNumber ?? undefined,
          buildingname: address.buildingName ?? undefined,
          street1: address.line1,
          street2: address.line2 ?? undefined,
          sublocality: undefined,
          locality: address.city,
          town: address.city,
          postcode: address.postcode,
        },
      },
      credentials: {
        username: this.credentials.username,
        password: this.credentials.password,
      },
    };

    const payload = this.buildQuery(searchParams);
    // this.logger.info(
    //   `Sending ${this.product} search request to TransUnion (${this.stage})`
    // );

    const request = axios.post<string>(this.url, payload, {
      headers: {
        'Content-Type':
          this.product === 'callreport'
            ? 'text/xml'
            : 'application/soap+xml;charset=UTF-8;action="http://www.callcredit.co.uk/SingleAccessPointService/ISingleAccessPointService/1.0/ISingleAccessPointService/Search"',
        Host: new URL(this.url).host,
      },
      timeout: 15000,
    });

    const [response, error] = await SafeTry(request);

    if (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status &&
        error.response?.status < 599
      ) {
        return {
          success: false,
          payload,
          file: error.response.data ?? error.message,
        };
      }
      throw error;
    }

    return {
      success: true,
      payload,
      file: response.data,
    };
  }

  async parseSearch({
    file,
  }: Pick<BureauSearchData, 'file'>): Promise<BureauSearchResponse> {
    return {
      data: cosmosResponseToObject(file),
    };
  }

  get product(): 'callreport' | 'cosmos' {
    const isCallReport = /^.+CR( CTest)?\\.+CR API (CTest|Live)?$/.test(
      this.credentials.username
    );

    return isCallReport ? 'callreport' : 'cosmos';
  }

  get stage(): 'stg' | 'prd' {
    const isCTest = /CTest/.test(this.credentials.username);
    return isCTest ? 'stg' : 'prd';
  }

  private get url(): string {
    return this.product === 'callreport'
      ? this.stage === 'stg'
        ? GLOBAL_CONFIG.callReport.stg_url
        : GLOBAL_CONFIG.callReport.prd_url
      : this.stage === 'stg'
      ? GLOBAL_CONFIG.cosmos.stg_url
      : GLOBAL_CONFIG.cosmos.prd_url;
  }

  private getPurpose(purpose: SearchPurpose): CosmosSearchPurpose {
    switch (purpose) {
      case SearchPurpose.QUOTATION:
        return 'QS';
    }
  }

  private buildQuery(data: CosmosSearchParameters): string {
    switch (this.product) {
      case 'callreport':
        return convert.js2xml(buildCallReportQuery(data));
      case 'cosmos':
        return convert.js2xml(buildCosmosXMLQuery(data));
    }
  }
}

export default TransUnionBureauHelper;
