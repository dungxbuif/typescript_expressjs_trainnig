import { IBaseResDto } from './IBaseResDto';
export interface IUserResDTO extends IBaseResDto {
   result: {
      application: {
         version: string;
         releaseDate: string;
         features: Object;
      };
      user: Object | null;
      tenant: null;
   };
   targetUrl: string | null;
   success: boolean;
   error: Object | null;
   unAuthorizedRequest: boolean;
   __abp: boolean;
}
