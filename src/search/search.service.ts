import { Injectable } from '@nestjs/common';
import { CreateSearchDto } from './dto/create-search.dto';
import TransUnionBureauHelper from 'src/lib/helper/transunion';
import { GLOBAL_CONFIG } from 'src/lib/config';
import { SafeTry } from 'src/lib/helper/safe';
import { SearchPurpose } from 'src/lib/helper/bureau';
import CustomDelegateError from 'src/lib/errors/delegateError';

@Injectable()
export class SearchService {
  async create(createSearchDto: CreateSearchDto) {
    if (!Object.keys(SearchPurpose).includes(createSearchDto.purpose?.toUpperCase() as string)) {
      console.error('Invalid search purpose');
      throw CustomDelegateError.throw('search.create.failed');
    }

    const bureau = new TransUnionBureauHelper({
      username: GLOBAL_CONFIG.TU_USERNAME,
      password: GLOBAL_CONFIG.TU_PASSWORD,
    });

    const [creditSearch, searchError] = await SafeTry(
      bureau.createSearch({
        purpose: createSearchDto.purpose,
        consumer: {
          title: createSearchDto.title,
          firstname: createSearchDto.firstname,
          othername: createSearchDto.othernames,
          lastname: createSearchDto.lastname,
          dob: createSearchDto.dob,
        },
        address: createSearchDto.address,
      })
    );

    if (searchError || !creditSearch.success) {
      console.error(searchError);
      throw CustomDelegateError.throw('search.create.failed');
    }

    const [parsedSearch, parseError] = await SafeTry(
      bureau.parseSearch(creditSearch)
    );

    if (parseError || !parsedSearch.data) {
      console.error(parseError);
      throw CustomDelegateError.throw('search.parse.failed');
    }

    return parsedSearch.data;
  }
}
