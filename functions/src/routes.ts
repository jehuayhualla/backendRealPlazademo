import {Request, Response, Router, NextFunction} from "express";
import {userRoutes} from "./routes/userRoutes";
import {mallRoutes} from "./routes/mallRoutes";
import {shopRoutes} from "./routes/shopRoutes";
import {errors} from "celebrate";

export const routes = (app: Router, db: FirebaseFirestore.Firestore) => {
  // inject firebase db
  app.use((req: any, res: Response, next: NextFunction) => {
    req._db = db;
    next();
  });

  // hello route
  app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello there!");
    return;
  });

  // routes
  app.use("/users", userRoutes);
  app.use("/malls", mallRoutes);
  app.use("/shops", shopRoutes);

  app.use(errors());
};
