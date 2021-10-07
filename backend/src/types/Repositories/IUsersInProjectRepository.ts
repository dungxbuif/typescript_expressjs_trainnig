import { IUsers_in_projectModel } from './../Models/IUsers_in_projectModel';
import { IProjectModel } from '../Models/IProjectModel';
export interface IUsersInProjectRepository {
   findByName(name: string);
   findUsersInProject(projectId: number);
   findProjectIds(userId: number);
   createMany(usersInput: IUsers_in_projectModel[]);
   deleteMany(projectId: number);
}
