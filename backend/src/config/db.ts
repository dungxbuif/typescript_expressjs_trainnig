import dotenv from "dotenv";
import mongoose from "mongoose";
import logger from "./logger";
dotenv.config();

interface ConnectOptions extends mongoose.ConnectOptions {
   useNewUrlParser: true;
   useUnifiedTopology: true;
   useFindAndModify: false;
}

const MONGO_URL = process.env.MONGO_URL;

export default {
   connect: () => {
      mongoose.connect(MONGO_URL, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         // useFindAndModify: false,
      } as ConnectOptions);
      mongoose.connection.on("connected", () => {
         logger.succeed("Connect to MongoDB successfully !!!");
      });
      mongoose.connection.on("error", (err) => {
         logger.error(`Mongoose default connection has occured error: ${err}`);
      });
   },
};
