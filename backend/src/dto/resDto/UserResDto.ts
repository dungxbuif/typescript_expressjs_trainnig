import { IUserResDTO } from '../../types/IUserResDTO';
import { APP } from '../../constants/index';
import { BaseResDto } from './BaseResDto';

const VERSION = APP.VERSION;
const RELASE_DATE = APP.RELASE_DATE;

export const UserResDTO: IUserResDTO = {
   result: {
      application: {
         version: VERSION,
         releaseDate: RELASE_DATE,
         features: {},
      },
      user: null,
      tenant: null,
   },
   targetUrl: null,
   success: true,
   error: null,
   unAuthorizedRequest: false,
   __abp: true,
};
