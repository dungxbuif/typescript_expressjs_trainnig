import { IDelete } from './../../types/Repositories/base/IDelete';
import { IWrite } from '../../types/Repositories/base/IWrite';
import { IRead } from '../../types/Repositories/base/IRead';
import { Model, FilterQuery } from 'mongoose';
import db from '../../config/db';
import logger from '../../config/logger';

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T>, IDelete<T> {
   public readonly _db;
   public readonly _repoName;

   constructor(db: Model<T>, repoName: string) {
      this._db = db;
      this._repoName = repoName;
   }

   async findAll(): Promise<T[]> {
      try {
         return await this._db.find({}).select('-_id');
      } catch (error) {
         logger.error(`findAll ${this._repoName} error: `, error.message);
      }
   }

   async findOne(field: object): Promise<T> {
      try {
         return await this._db.findOne(field).select('-_id');
      } catch (error) {
         logger.error(`findOne ${this._repoName} error: `, error.message);
      }
   }

   async update(id: number, updateFeild: Object): Promise<T> {
      try {
         return await this._db.findOneAndUpdate({ id }, updateFeild);
      } catch (error) {
         logger.error(`update ${this._repoName} error: `, error.message);
      }
   }

   async create(model: T): Promise<T> {
      try {
         return await this._db.create(model);
      } catch (error) {
         logger.error(`create ${this._repoName} error: `, error.message);
      }
   }

   async delete(id: number): Promise<void> {
      try {
         await this._db.deleteOne({ id });
      } catch (error) {
         logger.error(`delete ${this._repoName} error: `, error.message);
      }
   }
}
