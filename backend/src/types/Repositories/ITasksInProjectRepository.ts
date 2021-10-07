import { ITasks_in_projectModel } from './../Models/ITasks_in_projectModel';
import { IProjectModel } from '../Models/IProjectModel';
export interface ITasksInProjectRepository {
   findById(id: number);
   findByName(name: string);
   createMany(tasksInput: ITasks_in_projectModel[]);
   findTasksInProject(projectId: number);
   deleteMany(projectId: number);
   updateMany(tasksInput, projectId);
}
