import { IBaseResDto } from './IBaseResDto';

export interface IBaseError extends IBaseResDto {
   error: {
      code: Number;
      message: string;
      details: string | null;
      validationErrors: Array<Object> | null;
   };
}
