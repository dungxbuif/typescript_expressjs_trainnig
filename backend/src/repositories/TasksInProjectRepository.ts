import { ITasks_in_projectModel } from './../types/Models/ITasks_in_projectModel';
import db from '../models';
import logger from '../config/logger';
import { BaseRepository } from './base/BaseRepository';

class TasksInProjectRepository extends BaseRepository<ITasks_in_projectModel> {
   constructor() {
      super(db.Tasks_in_project, 'TasksInProjectRepository');
   }

   async createMany(tasksInput: ITasks_in_projectModel[]): Promise<ITasks_in_projectModel[]> {
      try {
         return await this._db.insertMany(tasksInput);
      } catch (error) {
         logger.error('create TasksInProjectRepository error: ', error.message);
      }
   }

   async findTasksInProject(projectId: number) {
      try {
         return await this._db.find({ projectId }).select('-_id');
      } catch (err) {
         logger.error('findTaskInProject TasksInProjectRepository error: ', err.message);
      }
   }

   async deleteMany(projectId: number) {
      try {
         return await this._db.deleteMany({ projectId });
      } catch (err) {
         logger.error('findTaskInProject TasksInProjectRepository error: ', err.message);
      }
   }

   async updateMany(tasksInput, projectId) {
      try {
         return await this._db.updateMany({ projectId }, tasksInput, {
            upsert: true,
            setDefaultsOnInsert: true,
         });
      } catch (error) {
         logger.error('create TasksInProjectRepository error: ', error.message);
      }
   }
}

export = new TasksInProjectRepository();
