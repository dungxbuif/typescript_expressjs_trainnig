import { IFilterItems } from './AllPaggingDto';
import { Request } from 'express';

export interface ReqAllPageCus extends Request {
   body: {
      sort: string;
      sortDirection: number;
      filterItems: IFilterItems[];
      searchText: string;
      skipCount: number;
      maxResultCount: number;
   };
}
