import { validate, validQueryID } from './../middlewares/validate/FieldValidate';
import { REQUIRED_FIELD_CREATE_ROLE } from './../constants/index';
import RoleService from '../services/RoleService';
import { BaseRouter } from './BaseRouter';

class RoleRouter extends BaseRouter {
   private _service = RoleService;
   constructor() {
      super();
      this.init();
   }

   protected init() {
      this.router.post('/Create', validate(REQUIRED_FIELD_CREATE_ROLE), this._service.create);
      this.router.get('/GetAll', this._service.filterAll);

      this.router.delete('/Delete', validQueryID, this._service.delete);
   }
}

export = new RoleRouter().router;
