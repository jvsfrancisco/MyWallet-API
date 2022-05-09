import { Router } from "express";

import {
    getData,
    sendData,
} from "./../controllers/Data.js";
import { validate } from "./../middlewares/validate.js";
import { registerSc } from "./../Schemas/Schemas.js";
import { validateToken } from "./../middlewares/validateToken.js";

const financesRouter = Router();

financesRouter.use(validateToken);

financesRouter.get("/finances", getData);

financesRouter.post(
    "/finances",
    (req, res, next) => {
        validate(req, res, next, registerSc);
    },
    sendData
);

export default financesRouter;