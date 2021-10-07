import { IBaseError } from '../../types/IBaseError';
import { BaseResDto } from './BaseResDto';

const BaseErrorDto = (message: string | null = null, details: string | null = null): IBaseError => {
   return {
      ...BaseResDto,
      error: {
         code: 0,
         message,
         details,
         validationErrors: null,
      },
      success: false,
   };
};

export const baseError = BaseErrorDto;
export const INVALID_TOKEN = BaseErrorDto('Your request is not valid!', 'Invalid token');
export const EXISTED_USER = BaseErrorDto('is already taken.');
export const EXISTED_PROJECT = BaseErrorDto('Project name is already taken.');
export const AUTHEN_ERR = BaseErrorDto('Current user did not login to the application!');
export const AUTHOR_ERR = BaseErrorDto(
   'Current user did not have permissions to access this feature!',
);
export const SERVER_ERROR = BaseErrorDto('An internal error occurred during your request!');
export const INVALID_REQUEST = BaseErrorDto(
   'Your request is not valid!',
   'The following errors were detected during validation.\r\n ',
);
export const LOGIN_FAILED = BaseErrorDto('Login failed!', 'Invalid user name or password');
export const WRONG_ADMIN_PASS = BaseErrorDto(
   `Your 'Admin Password' did not match the one on record.  Please try again.`,
);

export const NOT_EXIST_USER = BaseErrorDto('User not exist');
export const NOT_EXIST_CUSTOMERS = BaseErrorDto('Cutomers not exist');
export const NOT_EXIST_TASK = BaseErrorDto('Task not exist');
export const NOT_EXIST_ROLE = BaseErrorDto('Role not exist');
export const NOT_EXIST_PROJECT = BaseErrorDto('Project not exist');
