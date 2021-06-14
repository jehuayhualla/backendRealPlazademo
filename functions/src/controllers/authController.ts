import {Response, NextFunction} from "express";
import * as jwt from "jsonwebtoken";
import * as userModel from "../models/userModel";

const jwtsecret = "tokenkeyrealplaza";

const createToken = (id: string) => {
  return jwt.sign(
      {
        id,
      },
      jwtsecret,
      {
        expiresIn: "30d",
      },
  );
};

export const login = async (req: any, res: Response, next: NextFunction) => {
  try {
    const _db = req._db;
    const {email, password} = req.body;
    const data = await userModel.findOneByEmail( _db, email);

    if (!data) {
      res.status(401).json({
        error: "fail",
        message: "User doesn't exist",
      });
      return;
    }

    if (!(await userModel.comparePasswords(password, data.password))) {
      res.status(401).json({
        error: "fail",
        message: "Email or password is wrong",
      });
      return;
    }

    const token = createToken(data.dni);

    data.password = undefined;

    res.status(200).json({
      status: "successs",
      token,
      data: data,
    });
  } catch (err) {
    next(err);
  }
};

export const signup = async (req: any, res: Response, next: NextFunction) => {
  try {
    const _db = req._db;
    const {email, password, names, dni} = req.body;
    await userModel.create(_db, email, password, names, dni);

    res.status(200).json({
      status: "successs",
      data: {
        email,
        password,
        names,
        dni,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const protect = async (req: any, res: Response, next: NextFunction) => {
  try {
    let token;
    const _db = req._db;
    if ( req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.status(401).json({
        error: "fail",
        message: "You are not logged in! Please login in to continue",
      });
      return;
    }

    // verify token
    const decode: any = jwt.verify(token, jwtsecret);
    const user = await userModel.findOneByDNI( _db, decode.id);

    if (!user) {
      res.status(401).json({
        error: "fail",
        message: "User doesn't exist",
      });
      return;
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
