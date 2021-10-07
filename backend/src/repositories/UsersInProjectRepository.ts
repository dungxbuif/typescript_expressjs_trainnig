import { IUsers_in_projectModel } from './../types/Models/IUsers_in_projectModel';
import { IUsersInProjectRepository } from '../types/Repositories/IUsersInProjectRepository';
import db from '../models';
import logger from '../config/logger';

class UsersInProjectRepository implements IUsersInProjectRepository {
   private readonly _db = db.Users_in_project;

   async findByName(name: string) {
      try {
         return await await this._db.findOne({ name }).select('-_id');
      } catch (err) {
         logger.error('findByName UsersInProjectRepository error: ', err.message);
      }
   }

   async findProjectIds(userId: number) {
      try {
         const usersInProject = await this._db.find({ userId }).select('-_id');
         const idsArray: Array<number> = usersInProject.map((item) => item.projectId);
         return idsArray;
      } catch (err) {
         logger.error('findByName TasksInProjectRepository error: ', err.message);
      }
   }

   async createMany(usersInput: IUsers_in_projectModel[]): Promise<IUsers_in_projectModel[]> {
      try {
         return await this._db.insertMany(usersInput);
      } catch (error) {
         logger.error('create UsersInProjectRepository error: ', error.message);
      }
   }

   async findUsersInProject(projectId: number) {
      try {
         return await this._db.find({ projectId }).select('-_id');
      } catch (err) {
         logger.error('findTaskInProject TasksInProjectRepository error: ', err.message);
      }
   }

   async deleteMany(projectId) {
      try {
         return await this._db.deleteMany({ projectId });
      } catch (err) {
         logger.error('findTaskInProject TasksInProjectRepository error: ', err.message);
      }
   }

   async updateMany(usersInput, projectId) {
      try {
         return await this._db.updateMany({ projectId }, usersInput, {
            upsert: true,
            setDefaultsOnInsert: true,
         });
      } catch (error) {
         logger.error('updateMany TasksInProjectRepository error: ', error.message);
      }
   }
}

export = new UsersInProjectRepository();
