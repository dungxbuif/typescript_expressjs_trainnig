import { ResAllPageCus } from './../dto/resDto/ResAllPageCus';
import { searchTextFieldOpt } from './../utils/index';
import { REQUIRED_FIELD_SAVE_CUSTOMER } from './../constants/index';
import { IFilterItems, IFilterOpt } from './../dto/reqDto/AllPaggingDto';
import db from '../models';
import { ICustomerModel } from '../types/Models/ICustomerModel';
import logger from '../config/logger';
import { BaseRepository } from './base/BaseRepository';
class CustomerRepository extends BaseRepository<ICustomerModel> {
   constructor() {
      super(db.Customer, 'CustomerRepository');
   }

   async filterUserPagging(
      filterItems: IFilterItems[],
      maxResultCount: number,
      skipCount: number,
      searchText: string,
   ): Promise<ResAllPageCus> {
      // Option must have in search
      let filterOpt: IFilterOpt[] = filterItems.length
         ? filterItems.map((item) => ({
              [item.propertyName]: item.value,
           }))
         : [];

      //Search with name | username ... text
      if (searchText && searchText !== '') {
         let orOpt = searchTextFieldOpt(searchText, REQUIRED_FIELD_SAVE_CUSTOMER);
         if (orOpt.length) filterOpt.push({ $or: orOpt });
      }
      try {
         const findOpt = filterOpt.length ? { $and: filterOpt } : {};

         const items: any = await this._db.find(findOpt).skip(skipCount).limit(maxResultCount);
         return {
            totalCount: items.length,
            items,
         };
      } catch (error) {
         logger.error(`findUserPagging ${this._repoName} error: `, error.message);
      }
   }
}

export = new CustomerRepository();
