import { IBaseRepository } from './base/IBaseRepository';
import { IRoleModel } from './../Models/IRoleModel';

export interface IRoleRepository extends IBaseRepository<IRoleModel> {
   filterAll(Keyword: string, SkipCount: number, MaxResultCount: number);
}
