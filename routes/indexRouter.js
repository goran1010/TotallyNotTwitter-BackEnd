import { Router } from "express";
const indexRouter = Router();
import * as indexController from "../controllers/indexController.js";
import * as validator from "../validate/validator.js";

indexRouter.get("/", indexController.root);
indexRouter.post("/signup", validator.createUser, indexController.signUp);

export default indexRouter;
