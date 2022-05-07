import express, {json} from 'express';
import chalk from 'chalk';
import dotenv from 'dotenv';
import cors from 'cors';
import {MongoClient} from 'mongodb';
import bcrypt from 'bcrypt';
import joi from 'joi';

const app = express();
app.use(cors());
app.use(json());

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
mongoClient.connect(() => {
  db = mongoClient.db("MyWalletDB");
});

app.post("/sign-in", async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await db.collection("users").findOne({email});
    if (user && bcrypt.compareSync(password, user.password)) {
      res.sendStatus(200);
    } else {
     res.sendStatus(401);
     
    }
  } catch (error) {
    res.sendStatus(500);
  }
});


app.listen(5000, () => {
  console.log(chalk.pink('Server is listening on port 5000.'));
});
