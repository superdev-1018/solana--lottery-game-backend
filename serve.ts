require("dotenv").config();

import express, { Express } from "express";
import cors from "cors";
const cron = require("node-cron");
import fileUpload from "express-fileupload";
import { Server } from "socket.io";
import { createServer } from "http";

import { log } from "console";
import {initialize, initLottery, createLottery, endLottery} from "./src/controllers/contractController";


const router = express.Router();

const app: Express = express();
const port: Number = Number(process.env.HTTP_PORT || 5005);

app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    safeFileNames: true,
    preserveExtension: true,
    tempFileDir: `${__dirname}/public/files/temp`,
  })
);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

const httpServer = createServer();

if (!process.env.NETWORK || !process.env.NETWORK.startsWith('http')) {
  throw new Error('Invalid NETWORK URL; it must start with http: or https:');
}



const main = async () => {
  try{
      console.log("*****")
      const io = new Server(httpServer, {
        cors: {
          origin: "*",
        },
      });

      io.on("connection", (socket: any) => {
        socket.on("disconnect", function () {
          console.log("user disconnected",socket.id);
        });
      });

      io.listen(4000);

      // await initialize();
      // await initLottery();

      await endLottery(4);
      cron.schedule("* * * * *", async () => {
        // await createLottery(0);
    });

  } catch{(error:any)=>{
    console.log(error);
  }};
}

main();

  

