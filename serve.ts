require("dotenv").config();

import express, { Express } from "express";
import cors from "cors";
const cron = require("node-cron");
import fileUpload from "express-fileupload";
import { Server } from "socket.io";
import { createServer } from "http";
import fs from "fs";
import path from "path";
import {
  initialize,
  initLottery,
  createLottery,
  endLottery,
} from "./src/controllers/contractController";
import { time_frame } from "./src/interfaces/global";
import { formatTime } from "./src/util/utils";

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

if (!process.env.NETWORK || !process.env.NETWORK.startsWith("http")) {
  throw new Error("Invalid NETWORK URL; it must start with http: or https:");
}

const startTimeFilePath = path.join(__dirname, "start_times.txt");

let start_time_list: any[] = [];

const saveStartTimesToFile = () => {
  fs.writeFileSync(startTimeFilePath, JSON.stringify(start_time_list), "utf-8");
};

const loadStartTimesFromFile = () => {
  if (fs.existsSync(startTimeFilePath)) {
    const fileContents = fs.readFileSync(startTimeFilePath, "utf-8");
    start_time_list = JSON.parse(fileContents);
  } else {
    start_time_list = Array(10).fill(0); 
  }
};

loadStartTimesFromFile();

const schedule_list = [
  "*/8 * * * *",
  "*/15 * * * *",
  "*/26 * * * *",
  "*/35 * * * *",
  "*/43 * * * *",
  "*/52 * * * *",
  "13 */1 * * *",
  "21 */1 * * * *",
  "33 */1 * * * *",
  "41 */1 * * * *",
];

const time_frame_list = time_frame;

app.use(
  router.post("/get_current_time", (req, res) => {
    const lottery_time_frame = req.body.timeFrame;
    let lottery_index = time_frame_list.indexOf(lottery_time_frame);
    let start_time = start_time_list[lottery_index];
    let current_time = new Date();
    let passed_time = current_time.getTime() - new Date(start_time).getTime();
    let rest_time = lottery_time_frame * 3600000 - passed_time;
    res.send({ rest_time });
  })
);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: any) => {
  socket.on("disconnect", function () {
    console.log("user disconnected", socket.id);
  });
});

io.listen(4000);

const main = async () => {
  await initialize()
    .then(async (res) => {
      if (res == true) {
        console.log(res, "res");
        await initLottery();
        for (let i = 0; i < 10; i++) {
          let start_time = new Date();
          start_time_list[i] = start_time;
        }

        saveStartTimesToFile();
      } else {
        console.log("Already Initialized!");
      }
    });

  const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));
  for (let i = 0; i < schedule_list.length; i++) {
    await delay(i * 120000);

    cron.schedule(schedule_list[i], async () => {
      try {
        const res = await endLottery(i);
        console.log(res, "this is result");
        if(res == true){
            await createLottery(i);
            console.log("successfully created!");
        }
        let start_time = new Date();
        start_time_list[i] = start_time;
        io.emit("newGame", {
          newGame: true,
          message: `New ${formatTime(i)} Game Just Started!`,
        });

        saveStartTimesToFile();
      } catch (error) {
        console.log(error, "this is error");
      }
    });
  }
};

main();
