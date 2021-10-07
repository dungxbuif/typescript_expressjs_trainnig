import { Request } from 'express';

export interface IRequest extends Request {
   local: {
      id: number;
      roleNames: Array<string>;
   };
}
