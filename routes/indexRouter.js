import { Router } from "express";
const indexRouter = Router();
import * as indexController from "../controllers/indexController.js";

indexRouter.get("/", indexController.root);
indexRouter.post("/signup", indexController.signUp);

export default indexRouter;
