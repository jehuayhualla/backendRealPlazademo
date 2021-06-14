import {Response, NextFunction} from "express";
import * as shopModel from "../models/shopModel";

export const create = async (req: any, res: Response, next: NextFunction) => {
  try {
    const _db = req._db;
    const {name, malls} = req.body;
    await shopModel.create( _db, name, malls);

    res.status(200).json({
      status: "successs",
    });
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req: any, res: Response, next: NextFunction) => {
  try {
    const _db = req._db;
    const data = await shopModel.getAll( _db);

    res.status(200).json({
      status: "successs",
      data: data,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllByMall = async (req: any, res: Response, next: NextFunction) => {
  try {
    const _db = req._db;
    const {mallId} = req.body;
    const data = await shopModel.getAllByMall( _db, mallId);

    res.status(200).json({
      status: "successs",
      data: data,
    });
  } catch (err) {
    next(err);
  }
};

export const getByID = async (req: any, res: Response, next: NextFunction) => {
  try {
    const _db = req._db;
    const {id} = req.body;
    const data = await shopModel.getByID( _db, id);

    if (!data) {
      res.status(404).json({
        error: "fail",
        message: "Shop doesn't exists",
      });
      return;
    }

    res.status(200).json({
      status: "successs",
      data: data,
    });
  } catch (err) {
    next(err);
  }
};

export const removeByID = async (req: any, res: Response, next: NextFunction) => {
  try {
    const _db = req._db;
    const {id} = req.body;
    await shopModel.removeByID( _db, id);

    res.status(200).json({
      status: "successs",
    });
  } catch (err) {
    next(err);
  }
};

export const addVisitor = async (req: any, res: Response, next: NextFunction) => {
  try {
    const _db = req._db;
    const {dni} = req.user;
    const {shopId, mallId} = req.body;
    await shopModel.addVisitor( _db, shopId, dni, mallId);

    res.status(200).json({
      status: "successs",
    });
  } catch (err) {
    next(err);
  }
};
