import { IBaseRepository } from './base/IBaseRepository';
import { ResAllPageCus } from '../../dto/resDto/ResAllPageCus';
import { IFilterItems } from './../../dto/reqDto/AllPaggingDto';
import { ICustomerModel } from './../Models/ICustomerModel';
export interface ICustomerRepository<ICustomerModel> extends IBaseRepository<ICustomerModel> {
   filterUserPagging(
      filterItems: IFilterItems[],
      maxResultCount: number,
      skipCount: number,
      searchText: string,
   ): Promise<ResAllPageCus>;
}
