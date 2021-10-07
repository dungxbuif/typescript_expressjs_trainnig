import { REQUIRED_FIELD_SAVE_CUSTOMER } from './../constants/index';
import { validate } from './../middlewares/validate/FieldValidate';
import { validQueryID } from './../middlewares/validate/FieldValidate';
import { BaseRouter } from './BaseRouter';
import CustomerService from '../services/CustomerService';

class CustomerRouter extends BaseRouter {
   private _service = CustomerService;
   constructor() {
      super();
      this.init();
   }

   protected init() {
      this.router.get('/GetAll', this._service.getAll);

      this.router.post('/Save', validate(REQUIRED_FIELD_SAVE_CUSTOMER), this._service.create);
      this.router.post('/GetAllPagging', this._service.getAllPagging);

      this.router.delete('/Delete', validQueryID, this._service.delete);
   }
}

export = new CustomerRouter().router;
