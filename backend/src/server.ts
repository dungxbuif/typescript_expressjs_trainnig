import express from "express";
import indexRouter from "./routes";
/**
 * Express server application class.
 * @description Will later contain the routing system.
 */
export class Server {
   public app = express();

   initRouter = () => {
      this.app.use("/", indexRouter);
   };
}
