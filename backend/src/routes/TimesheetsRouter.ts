import TimesheetsService from '../services/TimesheetsService';
import { BaseRouter } from './BaseRouter';

class TimesheetsRouter extends BaseRouter {
   private _service = TimesheetsService;
   constructor() {
      super();
      this.init();
   }

   protected init() {
      this.router.get('/GetAll', this._service.getAll);

      this.router.post('/ApproveTimesheets', this._service.approve);
      this.router.post('/RejectTimesheets', this._service.reject);
   }
}

export = new TimesheetsRouter().router;
