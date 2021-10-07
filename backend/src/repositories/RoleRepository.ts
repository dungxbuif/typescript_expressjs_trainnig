import { IRoleModel } from './../types/Models/IRoleModel';
import { searchTextFieldOpt } from './../utils/index';
import { REQUIRED_FIELD_CREATE_ROLE } from './../constants/index';
import db from '../models';
import logger from '../config/logger';
import { BaseRepository } from './base/BaseRepository';

class RoleRepository extends BaseRepository<IRoleModel> {
   constructor() {
      super(db.Role, 'RoleRepository');
   }
   async filterAll(Keyword: string, SkipCount: number, MaxResultCount: number) {
      //Search with name | username ... text
      let filterOpt: any = {};
      if (Keyword && Keyword !== '') {
         let orOpt = searchTextFieldOpt(Keyword, REQUIRED_FIELD_CREATE_ROLE);
         if (orOpt.length) filterOpt.$or = orOpt;
      }
      try {
         const items = await this._db
            .find(filterOpt)
            .skip(SkipCount)
            .limit(MaxResultCount)
            .select('-_id');
         return {
            totalCount: items.length,
            items,
         };
      } catch (error) {
         logger.error('filterAll UserRepository error: ', error.message);
      }
   }
}

export = new RoleRepository();
