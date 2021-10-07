import { ICustomerModel } from './../types/Models/ICustomerModel';
import { ResAllPageCus } from './../dto/resDto/ResAllPageCus';
import { ICustomerRepository } from '../types/Repositories/ICustomerRepository';
import { CustomerDto } from './../dto/resDto/CustomerDto';
import { BaseResDto } from '../dto/resDto/BaseResDto';
import { NextFunction, Request, Response } from 'express';
import logger from '../config/logger';
import { baseError, NOT_EXIST_CUSTOMERS } from '../dto/resDto/BaseErrorDto';
import genarateID from '../utils/generateID';
import CustomerRepository from '../repositories/CustomerRepository';
import { ReqAllPageCus } from '../dto/reqDto/ReqAllPageCus';

class CustomerService {
   private _repository: ICustomerRepository<ICustomerModel> = CustomerRepository;

   public getAll = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const result = await this._repository.findAll();

         return res.status(200).json({ ...BaseResDto, result });
      } catch (error) {
         logger.error('createCustomer CustomerService error: ', error.message);
         next(error);
      }
   };

   public create = async (req: Request, res: Response, next: NextFunction) => {
      const customerInfo: CustomerDto = req.body;
      try {
         // If exist then update
         if (customerInfo.id !== undefined) {
            //find customer by name
            const name: string = customerInfo.name;
            const exitstedCustomer = await this._repository.findOne({ name });

            // Check if existed customer had the name
            if (exitstedCustomer && exitstedCustomer.id !== customerInfo.id) {
               return res
                  .status(500)
                  .json(baseError(`Customer name ${exitstedCustomer.name} already existed`));
            }

            const result = await this._repository.update(customerInfo.id, customerInfo);
            return res.status(200).json({ ...BaseResDto, result });
         }

         //find customer by name
         const name: string = customerInfo.name;
         const exitstedCustomer: ICustomerModel = await this._repository.findOne({ name });

         // Check if existed customer had the name
         if (exitstedCustomer && exitstedCustomer.id !== customerInfo.id) {
            return res
               .status(500)
               .json(baseError(`Customer name ${exitstedCustomer.name} already existed`));
         }

         // Fake id
         const id: number = genarateID('customer');
         customerInfo.id = id;

         const result: ICustomerModel = await this._repository.create(customerInfo);

         return res.status(200).json({ ...BaseResDto, result });
      } catch (error) {
         logger.error('createCustomer CustomerService error: ', error.message);
         next(error);
      }
   };

   public getAllPagging = async (req: ReqAllPageCus, res: Response, next: NextFunction) => {
      const { filterItems, maxResultCount, skipCount, searchText } = req.body;

      try {
         const result: ResAllPageCus = await this._repository.filterUserPagging(
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

   public delete = async (req: Request, res: Response, next: NextFunction) => {
      const id: number = parseInt(req.query.Id as string);
      try {
         const data = await this._repository.findOne({ id });
         if (!data) return res.status(500).json(NOT_EXIST_CUSTOMERS);

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

export = new CustomerService();
