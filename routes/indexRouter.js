import { Router } from "express";
const indexRouter = Router();
import * as indexController from "../controllers/indexController.js";
import * as validator from "../validate/validator.js";
import isNotLoggedIn from "../auth/isNotLoggedIn.js";

indexRouter.get("/", indexController.root);
indexRouter.post(
  "/signup",
  isNotLoggedIn,
  validator.createUser,
  indexController.signUp,
);

export default indexRouter;
