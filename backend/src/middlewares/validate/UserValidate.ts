import { Request, Response, NextFunction } from 'express';
import { INVALID_REQUEST } from '../../dto/resDto/BaseErrorDto';

const REQUIRED_FIELD = ['name', 'surname', 'userName', 'emailAddress'];

export const validCreate = (req: Request, res: Response, next: NextFunction) => {
   const data = { ...req.body };
   const { emailAddress } = data;
   let RESPONSE_JSON = { ...INVALID_REQUEST };
   RESPONSE_JSON.error.validationErrors = [];

   // Check missing required field
   const invalidField = checkField(REQUIRED_FIELD);
   if (invalidField) return res.status(400).json(RESPONSE_JSON);

   const invalidEmail = checkFormatEmail(emailAddress);
   if (invalidEmail) return res.status(400).json(RESPONSE_JSON);

   next();

   function checkField(arr: Array<string>) {
      arr.forEach((item) => {
         if (!data[item as string]) errorMess(item);
      });

      if (RESPONSE_JSON.error.validationErrors.length) return true;

      return false;
   }

   function checkFormatEmail(emailAddress) {
      if (!emailAddress.includes('@')) {
         errorMess('emailAddress', 'field is not a valid e-mail address');
         return true;
      }

      return false;
   }

   function errorMess(field: string, errmess: string = 'field is required') {
      let error = {
         message: `The ${upperFirstChar(field)} ${errmess}.`,
         members: [field],
      };

      // If invalidate. Create error messages and details
      RESPONSE_JSON.error.validationErrors.push(error);
      RESPONSE_JSON.error.details += `- ${error.message} .\r\n `;

      function upperFirstChar(text: string) {
         return text.charAt(0).toUpperCase() + text.slice(1);
      }
   }
};
