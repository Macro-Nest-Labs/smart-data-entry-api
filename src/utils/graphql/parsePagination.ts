import { PageOffsetLimit } from '../../common/types';
import { DEFAULT_PAGE_SIZE, DefaultQueryArgs } from './constants';

export const parsePagination = (pagination: Partial<PageOffsetLimit>): PageOffsetLimit => {
  const p = pagination ?? DefaultQueryArgs.paginate;
  const page = (p.page ?? DEFAULT_PAGE_SIZE) as number;
  const pageSize = (p.pageSize ?? 0) as number;

  const offset: number = page * pageSize;
  const limit: number = pageSize + 1;

  return { offset, limit, page, pageSize };
};
