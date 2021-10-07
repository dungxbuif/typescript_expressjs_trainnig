import { IMyTimesheetsRepository } from './../types/Repositories/IMyTimesheetsRepository';
import { BaseResDto } from '../dto/resDto/BaseResDto';
import { Request, NextFunction, Response } from 'express';
import logger from '../config/logger';
import { IRequest } from '../types/IRequest';
import MyTimessheetsRepository from '../repositories/MyTimessheetsRepository';

class TimesheetsService {
   private _repository: IMyTimesheetsRepository = MyTimessheetsRepository;

   public getAll = async (req: IRequest, res: Response, next: NextFunction) => {
      const startDate: string = String(req.query.startDate);
      const endDate: string = String(req.query.endDate);
      const status: number = Number(req.query.status);

      try {
         const result = await this._repository.filterAll(status, startDate, endDate);

         return res.status(200).json({
            ...BaseResDto,
            result,
         });
      } catch (error) {
         logger.error('getAll TimesheetsService error: ', error.message);
         next(error);
      }
   };

   public updateBase = (status: number) => {
      return async (req: Request, res: Response, next: NextFunction) => {
         const myTiemsheetsIdsArr = req.body;
         try {
            await this._repository.updateManyStatus(myTiemsheetsIdsArr, status);

            return res.status(200).json(BaseResDto);
         } catch (error) {
            logger.error('updateBase UserService error: ', error.message);
            next(error);
         }
      };
   };

   public approve = this.updateBase(2);
   public reject = this.updateBase(3);
}

export = new TimesheetsService();
