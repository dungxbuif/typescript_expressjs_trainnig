import { IRequest } from '../types/IRequest';
import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import logger from '../config/logger';
import dotenv from 'dotenv';
import { AUTHOR_ERR, AUTHEN_ERR, INVALID_TOKEN } from '../dto/resDto/BaseErrorDto';

dotenv.config();

const JWT_KEY = process.env.JWT_KEY;

export const authen = async (req: IRequest, res: Response, next: NextFunction) => {
   if (!req.headers['authorization']) return res.status(200).json(AUTHEN_ERR);
   const token = req.headers['authorization'].split(' ')[1];

   try {
      const decoded = await jwt.verify(token, JWT_KEY);

      req.local = decoded;
      next();
   } catch (ex) {
      logger.error('Authentication middleware false: ', ex.message);
      res.status(400).json(INVALID_TOKEN);
   }
};

const author = (ROLE_TYPE) => {
   return async (req: IRequest, res: Response, next: NextFunction) => {
      const { roleNames } = req.local;

      try {
         if (!roleNames.includes(ROLE_TYPE)) return res.status(403).json(AUTHOR_ERR);

         next();
      } catch (ex) {
         logger.error('Authorization middleware false: ', ex.message);
         res.status(400).json(INVALID_TOKEN);
      }
   };
};

export const authorAdmin = author('ADMIN');
