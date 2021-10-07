import { IBaseRepository } from './base/IBaseRepository';
import { IFilterItems } from './../../dto/reqDto/AllPaggingDto';
import { ITaskModel } from './../Models/ITaskModel';
export interface ITaskRepository extends IBaseRepository<ITaskModel> {
   filterUserPagging(
      filterItems: IFilterItems[],
      maxResultCount: number,
      skipCount: number,
      searchText: string,
   );
}
