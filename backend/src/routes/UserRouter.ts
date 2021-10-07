import { authorAdmin } from './../middlewares/auth';
import { storeAvatar } from './../middlewares/storeAvatar';
import { REQUIRED_FIELD_RESET_PASS, FAKE_MANAGERS } from './../constants/index';
import { validate } from './../middlewares/validate/FieldValidate';
import UserService from '../services/UserService';
import { BaseRouter } from './BaseRouter';
import { validCreate } from '../middlewares/validate/UserValidate';
import RoleService from '../services/RoleService';
import { validQueryID } from './../middlewares/validate/FieldValidate';
class UserRouter extends BaseRouter {
   private _userService = UserService;
   private _roleService = RoleService;
   constructor() {
      super();
      this.init();
   }

   protected init() {
      this.router.get('/GetRoles', authorAdmin, this._roleService.findAll);
      this.router.get('/GetUserNotPagging', authorAdmin, this._userService.getUserNotPagging);
      this.router.get('/Get', authorAdmin, validQueryID, this._userService.findById);
      this.router.get('/GetAllManager', authorAdmin, (req, res) => {
         res.status(200).json(FAKE_MANAGERS);
      });

      this.router.post('/UpdateYourOwnAvatar', storeAvatar, this._userService.updateImg);
      this.router.post('/UpdateAvatar', authorAdmin, storeAvatar, this._userService.updateImg);

      this.router.post('/Create', authorAdmin, validCreate, this._userService.create);
      this.router.post('/GetAllPagging', authorAdmin, this._userService.getAllPagging);
      this.router.post('/DeactiveUser', authorAdmin, this._userService.deactive);
      this.router.post('/ActiveUser', authorAdmin, this._userService.active);
      this.router.post(
         '/ResetPassword',
         authorAdmin,
         validate(REQUIRED_FIELD_RESET_PASS),
         this._userService.ResetPasword,
      );

      this.router.put('/Update', authorAdmin, this._userService.update);

      this.router.delete('/Delete', authorAdmin, validQueryID, this._userService.delete);
   }
}

export = new UserRouter().router;
