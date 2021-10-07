import { REQUIRED_FIELD_SAVE_TASK } from './../constants/index';
import { validate } from './../middlewares/validate/FieldValidate';
import { validQueryID } from './../middlewares/validate/FieldValidate';
import { BaseRouter } from './BaseRouter';
import TaskService from '../services/TaskService';

class TaskRouter extends BaseRouter {
   private _service = TaskService;
   constructor() {
      super();
      this.init();
   }

   protected init() {
      this.router.get('/GetAll', this._service.getAll);

      this.router.post('/Save', validate(REQUIRED_FIELD_SAVE_TASK), this._service.create);
      this.router.post('/DeArchive', this._service.deArchive);

      this.router.delete('/Archive', validQueryID, this._service.archive);
      this.router.delete('/Delete', validQueryID, this._service.delete);
   }
}

export = new TaskRouter().router;
