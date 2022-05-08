import express, {json} from 'express';
import chalk from 'chalk';
import dotenv from 'dotenv';
import cors from 'cors';
import {MongoClient} from 'mongodb';
import bcrypt from 'bcrypt';
import joi from 'joi';
import {v4 as uuid} from 'uuid';

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

  const Schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
  });
  const validate = Schema.validate(req.body, {abortEarly: false});

  if (validate.error) {
    console.log(validate.error.details.map((detail) => detail.message));
        res.sendStatus(422);
        return;
  }
  try {
    const user = await db.collection("users").findOne({email});
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuid();
      await db.collection("sessions").insertOne({
        userId: user._id,
        token,
    });
      res.sendStatus(200);
    } else {
     res.sendStatus(401);
     
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post("/sign-up", async (req, res) => {
  const {email, password} = req.body;
  const Schema = joi.object({
    name : joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required()
  }

  );
  const validate = Schema.validate(req.body, {abortEarly: false});
  if(validate.error) {
    console.log(validate.error.details.map((detail) => detail.message));
    res.sendStatus(422);
    return;
  }

  try {
    const user = await db.collection("users").findOne({email});
    if (user) {
      res.sendStatus(409);
      return;
    }
    const hash = bcrypt.hashSync(password, 10);
    await db.collection("users").insertOne({
      email,
      password: hash,
    });
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }



app.listen(5000, () => {
  console.log(chalk.pink('Server is listening on port 5000.'));
});
