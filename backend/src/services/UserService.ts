import { IUserModel } from './../types/Models/IUserModel';
import { ReqUserNotPagging } from './../dto/resDto/ReqUserNotPagging';
import { BaseResDto } from './../dto/resDto/BaseResDto';
import { UserResDTO } from './../dto/resDto/UserResDto';
import { ADMIN_PASSWORD } from './../constants/index';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { IUserRepository } from '../types/Repositories/IUserRepository';
import UserRepository from '../repositories/UserRepository';
import logger from '../config/logger';
import {
   baseError,
   INVALID_TOKEN,
   NOT_EXIST_USER,
   WRONG_ADMIN_PASS,
} from '../dto/resDto/BaseErrorDto';
import genarateID from '../utils/generateID';
import { IUserDecodeToken } from '../types/IUserDecodeToken';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_KEY = process.env.JWT_KEY;
const saltRounds = 10;

class UserService {
   private _repository: IUserRepository = UserRepository;

   public create = async (req: Request, res: Response, next: NextFunction) => {
      const userInput = { ...req.body };
      const { userName, emailAddress } = userInput;

      try {
         //Check if userName or email existed
         const exitstedUser = await this._repository.findByUserNameEmail(userName, emailAddress);
         if (exitstedUser) {
            let message = 'is already taken.';
            const ERR_RES = baseError();
            if (Object.keys(exitstedUser)[0] === 'userName')
               message = `User name '${exitstedUser.userName}' ` + message;
            else message = `Email address '${exitstedUser.emailAddress}' ` + message;

            ERR_RES.error.message = message;

            return res.status(500).json(ERR_RES);
         }

         //Hash pass and auto generate id
         const hashPass = await bcrypt.hashSync(userInput.password, saltRounds);
         const id = genarateID('user');
         userInput.password = hashPass;
         userInput.id = id;

         const result: IUserModel = await this._repository.create(userInput);
         if (result) throw new Error('Create user failed');

         delete result['password'];
         delete result['_id'];

         return res.status(200).json({
            ...BaseResDto,
            result,
         });
      } catch (error) {
         logger.error('createUser UserService error: ', error.message);
         next(error);
      }
   };

   public findById = async (req: Request, res: Response, next: NextFunction) => {
      const id: number = parseInt(req.query.Id as string);

      try {
         const result: IUserModel = await this._repository.findOne({ id });
         if (!result) return res.status(400).json(NOT_EXIST_USER);

         delete result['password'];

         return res.status(200).json({
            ...UserResDTO,
            result,
         });
      } catch (error) {
         logger.error('getUserLoginInfo UserService error: ', error.message);
         next(error);
      }
   };

   public getUserLoginInfo = async (req: Request, res: Response, next: NextFunction) => {
      if (req.headers['authorization'] === undefined)
         return res.status(200).json({ ...UserResDTO });

      const token = req.headers['authorization'].split(' ')[1];
      try {
         const { id }: IUserDecodeToken = await jwt.verify(token, JWT_KEY);

         const user: IUserModel = await this._repository.findOne({ id });
         if (!user) return res.status(400).json(INVALID_TOKEN);

         delete user['password'];

         return res.status(200).json({
            ...UserResDTO,
            result: {
               ...UserResDTO.result,
               user,
            },
         });
      } catch (error) {
         logger.error('getUserLoginInfo UserService error: ', error.message);
         next(error);
      }
   };

   public getUserNotPagging = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const result: ReqUserNotPagging[] = await this._repository.findUserNotPagging();
         return res.status(200).json({
            ...BaseResDto,
            result,
         });
      } catch (error) {
         logger.error('getUserNotPagging UserService error: ', error.message);
         next(error);
      }
   };

   public getAllPagging = async (req: Request, res: Response, next: NextFunction) => {
      const { filterItems, maxResultCount, skipCount, searchText } = req.body;

      try {
         const result = await this._repository.filterUserPagging(
            filterItems,
            maxResultCount,
            skipCount,
            searchText,
         );

         return res.status(200).json({
            ...BaseResDto,
            result,
         });
      } catch (error) {
         logger.error('getAllPagging UserService error: ', error.message);
         next(error);
      }
   };

   public findAllMangagers = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const result = await this._repository.getAllMangagers();
         return res.status(200).json({
            ...BaseResDto,
            result,
         });
      } catch (error) {
         logger.error('findAllMangagers UserService error: ', error.message);
         next(error);
      }
   };

   public delete = async (req: Request, res: Response, next: NextFunction) => {
      const id: number = parseInt(req.query.Id as string);
      try {
         const data = await this._repository.findOne({ id });
         if (!data) return res.status(500).json(NOT_EXIST_USER);

         await this._repository.delete(id);
         return res.status(200).json({
            ...UserResDTO,
            result: { message: 'Delete user successfully!' },
         });
      } catch (error) {
         logger.error('delete UserService error: ', error.message);
         next(error);
      }
   };

   public updateBase = (updatefield?: Object) => {
      return async (req: Request, res: Response, next: NextFunction) => {
         try {
            const id: number = req.body.id;
            const data: IUserModel = await this._repository.findOne({ id });
            if (!data) return res.status(500).json(NOT_EXIST_USER);

            const result = await this._repository.update(
               req.body.id,
               updatefield ? updatefield : req.body,
            );

            return res.status(200).json({
               ...BaseResDto,
               result,
            });
         } catch (error) {
            logger.error('update UserService error: ', error.message);
            next(error);
         }
      };
   };

   public update = this.updateBase();

   public updateImg = async (req, res: Response, next: NextFunction) => {
      let userId: number = 0;
      if (req.body.userId) {
         userId = Number(JSON.parse(JSON.stringify(req.body)).userId);
      } else {
         userId = req.local.id;
      }
      try {
         const avatarPath = '/avartar/' + req.files[0].filename;
         const data = await this._repository.findOne({ id: userId });
         if (!data) return res.status(500).json(NOT_EXIST_USER);
         await this._repository.update(userId as number, { avatarPath });
         return res.status(200).json({
            ...BaseResDto,
            result: avatarPath,
         });
      } catch (error) {
         logger.error('updateImg UserService error: ', error.message);
         next(error);
      }
   };

   public deactive = this.updateBase({ isActive: false });

   public active = this.updateBase({ isActive: true });

   public ResetPasword = async (req: Request, res: Response, next: NextFunction) => {
      const { adminPassword, newPassword, userId } = req.body;

      try {
         if (adminPassword !== ADMIN_PASSWORD) return res.status(400).json(WRONG_ADMIN_PASS);

         const user = await this._repository.findOne({ id: userId });
         if (!user) return res.status(500).json(NOT_EXIST_USER);

         const hashedPass = await bcrypt.hashSync(newPassword, saltRounds);

         await this._repository.resetPassword(userId, { password: hashedPass });

         return res.status(200).json({
            ...UserResDTO,
         });
      } catch (error) {
         logger.error('getUserLoginInfo UserService error: ', error.message);
         next(error);
      }
   };
}

export = new UserService();
