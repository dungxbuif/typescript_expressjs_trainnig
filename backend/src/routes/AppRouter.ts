import { authorAdmin } from './../middlewares/auth';
import UserRouter = require('./UserRouter');
import { BaseRouter } from './BaseRouter';
import WorkTimeService = require('../services/WorkTimeService');
import CustomerRouter = require('./CustomerRouter');
import TaskRouter = require('./TaskRouter');
import RoleRouter = require('./RoleRouter');
import ProjectRouter = require('./ProjectRouter');
import MyTimesheetsRouter = require('./MyTimesheetsRouter');
import TimekeepingRouter = require('./TimekeepingRouter');
import TimesheetsRouter = require('./TimesheetsRouter');

class AppRouter extends BaseRouter {
   private _worktimeService = WorkTimeService;

   constructor() {
      super();
      this.init();
   }

   protected init() {
      this.router.get(
         '/Configuration/GetWorkingTimeConfigAllBranch',
         this._worktimeService.worktime,
      );

      this.router.use('/User', UserRouter);
      this.router.use('/Role', authorAdmin, RoleRouter);
      this.router.use('/Customer', authorAdmin, CustomerRouter);
      this.router.use('/Task', authorAdmin, TaskRouter);
      this.router.use('/Project', ProjectRouter);
      this.router.use('/MyTimesheets', MyTimesheetsRouter);
      this.router.use('/Timesheet', authorAdmin, TimesheetsRouter);

      this.router.use('/Timekeeping', TimekeepingRouter);
   }
}

export = new AppRouter().router;
