import { IUsers_in_projectModel } from './../../types/Models/IUsers_in_projectModel';
import { ITasks_in_projectModel } from './../../types/Models/ITasks_in_projectModel';
import { IProjectModel } from './../../types/Models/IProjectModel';

export interface IProjectReqDto extends IProjectModel {
   tasks: ITasks_in_projectModel[];
   users: IUsers_in_projectModel[];
}
