import { IRequest } from './../types/IRequest';
import { IProjectReqDto } from './../dto/reqDto/IProjectReqDto';
import { IProjectRepository } from './../types/Repositories/IProjectRepository';
import { BaseResDto } from './../dto/resDto/BaseResDto';
import { NOT_EXIST_PROJECT, EXISTED_PROJECT } from './../dto/resDto/BaseErrorDto';
import { NextFunction, Request, Response } from 'express';
import ProjectRepository from '../repositories/ProjectRepository';
import logger from '../config/logger';
import generateID from '../utils/generateID';
import UsersInProjectRepository from '../repositories/UsersInProjectRepository';
import { IUsersInProjectRepository } from '../types/Repositories/IUsersInProjectRepository';

class ProjectService {
   private _repository: IProjectRepository = ProjectRepository;
   private _userInProjectRepository: IUsersInProjectRepository = UsersInProjectRepository;

   public getById = async (req: Request, res: Response, next: NextFunction) => {
      const id: number = Number(req.query.input);

      try {
         const result = await this._repository.findOne({ id });
         if (!result)
            return res.status(500).json({
               ...NOT_EXIST_PROJECT,
            });

         return res.status(200).json({
            ...BaseResDto,
            result: result[0],
         });
      } catch (error) {
         logger.error('getAll ProjectService error: ', error.message);
         next(error);
      }
   };

   public getProjectsIncludingTasks = async (req: IRequest, res: Response, next: NextFunction) => {
      // const userId: number = req.local.id;/
      const userId: number = 6;

      let result = [];
      try {
         const projectIds: Array<number> = await this._userInProjectRepository.findProjectIds(
            userId,
         );

         if (!projectIds.length)
            return res.status(200).json({
               ...BaseResDto,
               result,
            });

         result = await this._repository.findProjectsIncludingTasks(projectIds, userId);

         return res.status(200).json({
            ...BaseResDto,
            result,
         });
      } catch (error) {
         logger.error('getAll ProjectService error: ', error.message);
         next(error);
      }
   };

   public getAll = async (req: Request, res: Response, next: NextFunction) => {
      const status: number | null =
         req.query.status !== undefined ? Number(req.query.status) : null;
      const search: string = String(req.query.search);

      try {
         const result = await this._repository.filterAll(status, search);

         return res.status(200).json({
            ...BaseResDto,
            result,
         });
      } catch (error) {
         logger.error('getAll ProjectService error: ', error.message);
         next(error);
      }
   };

   public createOrEdit = async (req: Request, res: Response, next: NextFunction) => {
      const projectInput: IProjectReqDto = { ...req.body };

      try {
         // Check if email or username exist
         if (projectInput.id) {
            let result = await this._repository.updateWithUserAndTask(projectInput);
            return res.status(200).json({
               ...BaseResDto,
               result,
            });
         }

         const name: string = projectInput.name;
         const exitedName = await this._repository.findOne({ name });

         if (exitedName) return res.status(200).json(EXISTED_PROJECT);

         //Auto generate id
         const id = generateID('project');
         projectInput.id = id;

         let result = await this._repository.createOrUpdate(projectInput);

         return res.status(200).json({
            ...BaseResDto,
            result,
         });
      } catch (error) {
         logger.error('createproject projectService error: ', error.message);
         next(error);
      }
   };

   public UpdateBase = (updatefield?: Object) => {
      return async (req: Request, res: Response, next: NextFunction) => {
         try {
            const id: number = req.body.id;
            const data = await this._repository.findOne({ id });
            if (!data) return res.status(500).json(NOT_EXIST_PROJECT);

            await this._repository.update(req.body.id, updatefield ? updatefield : req.body);

            return res.status(200).json(BaseResDto);
         } catch (error) {
            logger.error('createUser UserService error: ', error.message);
            next(error);
         }
      };
   };

   public inactive = this.UpdateBase({ status: 1 });

   public active = this.UpdateBase({ status: 0 });

   public deleteById = async (req: Request, res: Response, next: NextFunction) => {
      const id: number = parseInt(req.query.Id as string);
      try {
         const data = await this._repository.findOne({ id });
         if (!data) return res.status(500).json(NOT_EXIST_PROJECT);

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

export = new ProjectService();
