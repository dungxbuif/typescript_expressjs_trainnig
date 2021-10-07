import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';
export const error = (err, req: Request, res: Response, next: NextFunction) => {
   logger.error(err.message);
   res.status(500).json({
      error: {
         code: 0,
         message: err.message,
         details: 'Error from the server',
      },
   });
};
