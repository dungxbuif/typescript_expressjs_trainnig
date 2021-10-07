import { IBaseRepository } from './base/IBaseRepository';
import { IMyTimesheetsModel } from '../Models/IMyTimesheetsModel';
export interface IMyTimesheetsRepository extends IBaseRepository<IMyTimesheetsModel> {
   filterByUserId(userId: number, startDate: string, endDate: string);
   filterAll(status: number, startDate: string, endDate: string);
   updateStatusByUserId(userId: number, startDate: string, endDate: string);
   updateManyStatus(myTimesheetIds: number[], status: number);
}
