import { FAKE_MYDETAILS } from './../constants/index';
import { BaseRouter } from './BaseRouter';

class TimekeepingRouter extends BaseRouter {
   constructor() {
      super();
      this.init();
   }

   protected init() {
      this.router.get('/GetMyDetails', (req, res) => {
         return res.status(200).json(FAKE_MYDETAILS);
      });
   }
}

export = new TimekeepingRouter().router;
