import {Response, NextFunction} from "express";
import * as mallModel from "../models/mallModel";

export const create = async (req: any, res: Response, next: NextFunction) => {
  try {
    const _db = req._db;
    const {name} = req.body;
    await mallModel.create( _db, name);

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
    const data = await mallModel.getAll( _db);

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
    const data = await mallModel.getByID( _db, id);

    if (!data) {
      res.status(404).json({
        error: "fail",
        message: "Mall doesn't exists",
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
    await mallModel.removeByID( _db, id);

    res.status(200).json({
      status: "successs",
    });
  } catch (err) {
    next(err);
  }
};
