import {
   REQUIRED_FIELD_CREATE_MYTIMSHEETS,
   REQUIRED_FIELD_SUBMIT_MYTIMSHEETS,
} from './../constants/index';
import { validate } from '../middlewares/validate/FieldValidate';
import MyTimesheetsService from '../services/MyTimesheetsService';
import { BaseRouter } from './BaseRouter';

class MyTimesheetsRouter extends BaseRouter {
   private _service = MyTimesheetsService;
   constructor() {
      super();
      this.init();
   }

   protected init() {
      this.router.post(
         '/SubmitToPending',
         validate(REQUIRED_FIELD_SUBMIT_MYTIMSHEETS),
         this._service.submit,
      );
      this.router.post(
         '/Create',
         validate(REQUIRED_FIELD_CREATE_MYTIMSHEETS),
         this._service.create,
      );

      this.router.get('/GetAllTimeSheetOfUser', this._service.getAllOfUser);
   }
}

export = new MyTimesheetsRouter().router;
