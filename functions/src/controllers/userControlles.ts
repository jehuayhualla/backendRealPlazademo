import {Response, NextFunction} from "express";
import * as userModel from "../models/userModel";

export const getAllVisits = async (req: any, res: Response, next: NextFunction) => {
  try {
    const _db = req._db;
    const {dni} = req.user;
    const data = await userModel.getAllVisits( _db, dni);

    res.status(200).json({
      status: "successs",
      data: data,
    });
  } catch (err) {
    next(err);
  }
};
