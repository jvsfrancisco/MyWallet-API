import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";

import loginRouter from "./Routes/loginRouter.js";
import financesRouter from "./Routes/financesRouter.js";

const app = express();
app.use(cors());
app.use(json());

dotenv.config();

app.use(loginRouter);
app.use(financesRouter);

app.listen(5000, () => {
  console.log(chalk.blue('Server is listening on port 5000.'));
});
