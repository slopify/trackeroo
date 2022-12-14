import { FilterQuery } from 'mongoose';

interface PaginateOptions {
    select?: Object | string | undefined;
    sort?: Object | string | undefined;
    populate?:
      | Array<Object>
      | Array<string>
      | Object
      | string
      | any | undefined;
    lean?: boolean | undefined;
    leanWithId?: boolean | undefined;
    offset?: number | undefined;
    page?: number | undefined;
    limit?: number | undefined;
  }

interface PaginateResult<T> {
    docs: Array<T>;
    total: number;
    limit: number;
    page?: number | undefined;
    pages?: number | undefined;
    offset?: number | undefined;
  }

export type PaginateFn<T> = (
  query?: FilterQuery<T>,
  options?: PaginateOptions,
  callback?: (err: any, result: PaginateResult<T>) => void,
) => Promise<PaginateResult<T>>;
