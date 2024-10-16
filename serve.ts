require("dotenv").config();

import express, { Express } from "express";
import cors from "cors";
const cron = require("node-cron");
import fileUpload from "express-fileupload";
import { Server } from "socket.io";
import { createServer } from "http";

import { log } from "console";
import {initialize, initLottery, createLottery, endLottery} from "./src/controllers/contractController";
import { time_frame } from "./src/interfaces/global";


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

const schedule_list = ["0 * * * *","0 */3 * * *","0 */6 * * *" ,"0 */12 * * *","0 0 * * *","0 0 * * 0","0 0 1 * *","0 0 1 */3 *", "0 0 1 */6 *", "0 0 1 1 *"];
const time_frame_list = time_frame;
let start_time_list: any[] = [0,0,0,0,0,0,0,0,0,0];

app.use(router.post("/get_current_time", (req, res) => {
  const lottery_time_frame = req.body.timeFrame;
  let lottery_index = time_frame_list.indexOf(lottery_time_frame);
  let start_time = start_time_list[lottery_index];
  let current_time = new Date();
  let passed_time = current_time.getTime() - new Date(start_time).getTime();
  let rest_time = lottery_time_frame * 3600000 - passed_time;
  res.send({rest_time});
}));

app.get("/", (req, res)=>console.log("dfdfdf"));

const main = async () => {
  try{
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

      for (let i=0; i<10;i++){
        
          cron.schedule(schedule_list[i], async () => {
            await endLottery(i);
            await createLottery(i);
            let start_time = new Date();
            start_time_list[i] = start_time;
        });
      }
      

  } catch{(error:any)=>{
    console.log(error);
  }};
}

main();

  

