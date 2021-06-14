import * as express from "express";
import {celebrate, Joi} from "celebrate";
import * as authController from "../controllers/authController";
import * as shopController from "../controllers/shopController";

const router = express.Router();

// Protect by bearer token
router.use(authController.protect);

router.post("/create", celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    malls: Joi.array().required(),
  }),
}), shopController.create);

router.get("/getAll", shopController.getAll);

router.post("/getAllByMall", celebrate({
  body: Joi.object().keys({
    mallId: Joi.string().required(),
  }),
}), shopController.getAllByMall);

router.post("/getByID", celebrate({
  body: Joi.object().keys({
    id: Joi.string().required(),
  }),
}), shopController.getByID);

router.delete("/deleteByID", celebrate({
  body: Joi.object().keys({
    id: Joi.string().required(),
  }),
}), shopController.removeByID);

router.post("/addVisitor", celebrate({
  body: Joi.object().keys({
    shopId: Joi.string().required(),
    mallId: Joi.string().required(),
  }),
}), shopController.addVisitor);

export {router as shopRoutes};
