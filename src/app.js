import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";

import userRouter from "./../Routes/userRouter.js";
import financesRouter from "./../Routes/financesRouter.js";

const app = express();
app.use(cors());
app.use(json());

dotenv.config();

app.use(userRouter);
app.use(financesRouter);

export default app;
