import { authorAdmin } from './../middlewares/auth';
import { validQueryID, validQueryInput } from '../middlewares/validate/FieldValidate';
import { validate } from '../middlewares/validate/FieldValidate';
import ProjectService from '../services/ProjectService';
import { BaseRouter } from './BaseRouter';

class ProjectRouter extends BaseRouter {
   private _service = ProjectService;
   constructor() {
      super();
      this.init();
   }

   protected init() {
      this.router.post('/Save', authorAdmin, this._service.createOrEdit);
      this.router.post('/Inactive', authorAdmin, validate(['id']), this._service.inactive);
      this.router.post('/Active', authorAdmin, validate(['id']), this._service.active);

      this.router.get('/getAll', authorAdmin, this._service.getAll);
      this.router.get('/Get', authorAdmin, validQueryInput, this._service.getById);
      this.router.get('/GetProjectsIncludingTasks', this._service.getProjectsIncludingTasks);

      this.router.delete('/Delete', validQueryID, this._service.deleteById);
   }
}

export = new ProjectRouter().router;
