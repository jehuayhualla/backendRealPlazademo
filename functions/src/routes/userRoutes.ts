import * as express from "express";
import * as authController from "../controllers/authController";
import * as userController from "../controllers/userControlles";
import {celebrate, Joi} from "celebrate";

const router = express.Router();

router.post("/login", celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), authController.login);

router.post("/signup", celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    names: Joi.string().required(),
    dni: Joi.string().required(),
  }),
}), authController.signup);

// after auth controller all is protected by bearer token
router.use(authController.protect);

router.get("/test", (req: express.Request, res: express.Response) => {
  res.send("Hello there!");
  return;
});

router.get("/getAllVisits", userController.getAllVisits);
export {router as userRoutes};
