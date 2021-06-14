import * as express from "express";
import {celebrate, Joi} from "celebrate";
import * as authController from "../controllers/authController";
import * as mallController from "../controllers/mallController";

const router = express.Router();

// Protect by bearer token
router.use(authController.protect);

router.get("/getAll", mallController.getAll);

router.post("/create", celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
}), mallController.create);

router.post("/getByID", celebrate({
  body: Joi.object().keys({
    id: Joi.string().required(),
  }),
}), mallController.getByID);

router.delete("/deleteByID", celebrate({
  body: Joi.object().keys({
    id: Joi.string().required(),
  }),
}), mallController.removeByID);


export {router as mallRoutes};
