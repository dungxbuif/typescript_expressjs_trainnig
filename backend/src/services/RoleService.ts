import { BaseResDto } from './../dto/resDto/BaseResDto';
import { baseError, NOT_EXIST_TASK, NOT_EXIST_ROLE } from './../dto/resDto/BaseErrorDto';
import { IRoleModel } from '../types/Models/IRoleModel';
import { NextFunction, Request, Response } from 'express';
import { IRoleRepository } from '../types/Repositories/IRoleRepository';
import RoleRepository from '../repositories/RoleRepository';
import logger from '../config/logger';
import generateID from '../utils/generateID';

class RoleService {
   private _repository: IRoleRepository = RoleRepository;

   public findAll = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const result: IRoleModel[] = await this._repository.findAll();

         return res.status(200).json({ ...BaseResDto, result });
      } catch (error) {
         logger.error('getRoles RoleService error: ', error.message);
         next(error);
      }
   };

   public create = async (req: Request, res: Response, next: NextFunction) => {
      const roleInput: IRoleModel = { ...req.body };

      try {
         //Check if task name exist
         const name: string = roleInput.name;
         const exitstedTask: IRoleModel = await this._repository.findOne({ name });

         if (exitstedTask)
            return res.status(500).json(baseError(`Role ${exitstedTask.name} already existed`));

         //Auto generate id and normalizedName
         const id: number = generateID('role');
         roleInput.id = id;
         roleInput.normalizedName = roleInput.name.toUpperCase();

         const result: IRoleModel = await this._repository.create(roleInput);

         return res.status(200).json({
            ...BaseResDto,
            result,
         });
      } catch (error) {
         logger.error('createRole RoleService error: ', error.message);
         next(error);
      }
   };

   public filterAll = async (req: Request, res: Response, next: NextFunction) => {
      const Keyword: string = String(req.query.Keyword);
      const SkipCount = Number(req.query.SkipCount);
      const MaxResultCount = Number(req.query.MaxResultCount);

      try {
         const result = await this._repository.filterAll(Keyword, SkipCount, MaxResultCount);

         return res.status(200).json({
            ...BaseResDto,
            result,
         });
      } catch (error) {
         logger.error('getAll RoleService error: ', error.message);
         next(error);
      }
   };

   public delete = async (req: Request, res: Response, next: NextFunction) => {
      const id: number = parseInt(req.query.Id as string);
      try {
         const data = await this._repository.findOne({ id });
         if (!data) return res.status(500).json(NOT_EXIST_ROLE);

         await this._repository.delete(id);

         return res.status(200).json({
            ...BaseResDto,
         });
      } catch (error) {
         logger.error('createUser UserService error: ', error.message);
         next(error);
      }
   };
}

export = new RoleService();
