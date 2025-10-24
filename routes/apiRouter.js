import { Router } from "express";
const apiRouter = Router();
import * as apiController from "../controllers/apiController.js";

apiRouter.get("/profile", apiController.getProfile);

export default apiRouter;
