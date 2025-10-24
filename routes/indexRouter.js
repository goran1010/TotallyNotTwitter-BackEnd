import { Router } from "express";
const indexRouter = Router();
import * as indexController from "../controllers/indexController.js";
import * as validator from "../validate/validator.js";

indexRouter.post("/signup", validator.createUser, indexController.signUp);

indexRouter.post("/login", validator.logInUser, indexController.logIn);

indexRouter.get("profile", indexController.getProfile);

export default indexRouter;
