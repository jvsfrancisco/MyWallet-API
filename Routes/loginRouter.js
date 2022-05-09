import { Router } from "express";

import { signIn, signUp } from "./../controllers/loginController.js";
import { userSc, loginSc } from "./../Schemas/Schemas.js";
import { validate } from "../middlewares/validate.js";

const loginRouter = Router();

loginRouter.post(
    "/sign-up",
    (req, res, next) => {
        validate(req, res, next, userSc);
    },
    signUp
);
loginRouter.post(
    "/sign-in",
    (req, res, next) => {
        validate(req, res, next, loginSc);
    },
    signIn
);

export default loginRouter;