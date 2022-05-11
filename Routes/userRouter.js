import { Router } from "express";

import { signIn, signUp, logout } from "../controllers/loginController.js";
import { userSc, loginSc } from "../Schemas/Schemas.js";
import { validate } from "../middlewares/validate.js";
import { validateToken } from "../middlewares/validateToken.js";

const userRouter = Router();

userRouter.post(
    "/sign-up",
    (req, res, next) => {
        validate(req, res, next, userSc);
    },
    signUp
);
userRouter.post(
    "/sign-in",
    (req, res, next) => {
        validate(req, res, next, loginSc);
    },
    signIn
);

userRouter.delete("/logout", validateToken, logout)

export default userRouter;