import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import db from "./../db.js";

export async function signIn (req, res) {
    const body = req.body;
  
      try {
          const user = await db
              .collection("users")
              .findOne({ email: body.email });
  
          if (user && bcrypt.compareSync(body.password, user.password)) {
              const token = uuid();
              await db.collection("sessions").insertOne({
                  userId: user._id,
                  token,
              });
  
              res.status(200).send(token);
          } else {
              res.sendStatus(401);
          }
      } catch (erro) {
          console.log(erro);
          res.sendStatus(500);
      }
  };
  
export async function signUp (req, res)  {
    const {email, password, name} = req.body;

    try {
      const user = await db.collection("users").findOne({email});
      if (user) {
        res.sendStatus(409);
        return;
      }
      const hash = bcrypt.hashSync(password, 10);
      await db.collection("users").insertOne({
        name,
        email,
        password: hash,
        registry: [] 
      });
      res.sendStatus(201);
      console.log(db.collection("users").findOne({email}));
    } catch (error) {
      res.sendStatus(500);
    }
  };

  export async function logout(req, res){
    const token = res.locals.token;

    try{
        await db.collection("sessions").deleteOne({token});
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}