import { Router } from "express";
const statusRouter = Router();
import * as statusController from "../controllers/statusController.js";
import isLoggedIn from "../auth/isLoggedIn.js";

statusRouter.get("/", isLoggedIn, statusController.status);

export default statusRouter;
