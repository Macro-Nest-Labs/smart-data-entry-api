import isNumber from 'lodash/isNumber';

import { CountResponse, ObjectCountResponse, PaginatedResponse, QueryArgs } from '../../common/types';
import { DefaultQueryArgs } from './constants';
import { parsePagination } from './parsePagination';

export const withPageInfo = <K, V>(
  args: QueryArgs<K, V> = DefaultQueryArgs,
  response: Array<K>,
  countResponse: CountResponse,
): PaginatedResponse<K> => {
  const { page, pageSize } = parsePagination(args.paginate);

  let pageCount: number = 0;
  let itemCount: number = 0;

  if (isNumber(countResponse)) {
    pageCount = Math.ceil(((countResponse as number) / pageSize) as number);
    itemCount = countResponse;
  } else {
    const count = (countResponse as ObjectCountResponse)?.count;
    if (isNumber(count)) {
      pageCount = Math.ceil(count / pageSize);
      itemCount = count;
    }
  }
  const startItemNumber = page === 0 ? 0 : page * pageSize;
  const endItemNumber = startItemNumber + pageSize;
  const finalResponse: PaginatedResponse<K> = {
    results: response.slice(startItemNumber, endItemNumber),
    pageInfo: {
      currentPage: page,
      perPage: pageSize,
      itemCount: itemCount,
      pageItemCount: Math.min(response.length, pageSize),
      pageCount: pageCount,
      hasPreviousPage: page > 0,
      hasNextPage: page < pageCount - 1,
    },
  };
  return finalResponse;
};
