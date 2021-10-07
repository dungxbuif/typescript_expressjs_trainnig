import { Server } from './Server';
import dotenv from 'dotenv';
import db from './config/db';
import logger from './config/logger';
/**
 * Application class.
 * @description Handle init config and components.
 */
dotenv.config({
   path: '.env',
});

export class Application {
   server: Server;

   init() {
      this.initServer();
      this.server.initRouter();
      db.connect();
   }

   private initServer() {
      this.server = new Server();
   }

   start() {
      ((port = process.env.APP_PORT || 5000) => {
         this.server.app.listen(port, () => logger.cyan(`> Listening on port ${port}`));
      })();
   }
}
