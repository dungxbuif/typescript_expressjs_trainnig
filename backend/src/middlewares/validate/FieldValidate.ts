import { INVALID_REQUEST } from './../../dto/resDto/BaseErrorDto';
import { Request, Response, NextFunction } from 'express';

export const validate = (requestFeild) => {
   return (req: Request, res: Response, next: NextFunction) => {
      const data = { ...req.body };
      const REQUIRED_FIELD = requestFeild;
      const INVALID_ERR = { ...INVALID_REQUEST };
      INVALID_ERR.error.validationErrors = [];

      // Check missing required field
      const invalidField = checkField(REQUIRED_FIELD);

      if (invalidField) return res.status(400).json(INVALID_ERR);

      next();

      function checkField(arr: Array<string>) {
         arr.forEach((item) => {
            if (data[item as string] === undefined) errorMess(item);
         });

         if (INVALID_ERR.error.validationErrors.length) return true;

         return false;
      }

      function errorMess(field: string, errmess: string = 'field is required') {
         let error = {
            message: `The ${upperFirstChar(field)} ${errmess}.`,
            members: [field],
         };
         // If invalidate. Create error messages and details
         INVALID_ERR.error.validationErrors.push(error);
         INVALID_ERR.error.details += `- ${error.message} .\r\n `;

         function upperFirstChar(text: string) {
            return text.charAt(0).toUpperCase() + text.slice(1);
         }
      }
   };
};

export const validQueryID = (req: Request, res: Response, next: NextFunction) => {
   if (!req.query.Id) return res.status(400).json(INVALID_REQUEST);

   next();
};

export const validQueryInput = (req: Request, res: Response, next: NextFunction) => {
   if (!req.query.input) return res.status(400).json(INVALID_REQUEST);

   next();
};
