import { IBaseRepository } from './base/IBaseRepository';
import { IFilterItems } from '../../dto/reqDto/AllPaggingDto';
import { IUserModel } from '../Models/IUserModel';
export interface IUserRepository extends IBaseRepository<IUserModel> {
   findByUserNameEmail(userName: string, emailAddress: string);
   generateToken(userName: string);
   comparePassword(userName: string, plainPass: string);
   findUserNotPagging();
   filterUserPagging(
      filterItems: IFilterItems[],
      maxResultCount: number,
      skipCount: number,
      searchText: string,
   );
   getAllMangagers();
   resetPassword(id: number, password: Object);
}
