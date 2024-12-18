/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryArgs } from '../../common/types';

export const DEFAULT_PAGE_SIZE: number = 50;

export const DefaultQueryArgs: QueryArgs<any, any> = {
  paginate: { page: 0, pageSize: DEFAULT_PAGE_SIZE },
  where: {},
};
