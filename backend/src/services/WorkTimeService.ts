import { Request, Response, NextFunction } from 'express';
import { WORKING_TIME } from '../constants';
import { UserResDTO } from '../dto/resDto/UserResDto';

class WorkTimeService {
   public worktime = async (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json({ ...UserResDTO, result: WORKING_TIME });
   };
}

export = new WorkTimeService();
