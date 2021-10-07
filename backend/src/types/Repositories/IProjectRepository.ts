import { IBaseRepository } from './base/IBaseRepository';
import { IProjectReqDto } from '../../dto/reqDto/IProjectReqDto';
import { IProjectModel } from '../Models/IProjectModel';
export interface IProjectRepository extends IBaseRepository<IProjectModel> {
   findProjectsIncludingTasks(projectIds: number[], userId: number);
   createOrUpdate(ProjectInput: IProjectReqDto);
   filterAll(status: number | null, search: string);
   updateWithUserAndTask(ProjectInput: IProjectReqDto);
}
