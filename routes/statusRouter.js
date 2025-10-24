import { Router } from "express";
const statusRouter = Router();
import * as statusController from "../controllers/statusController.js";

statusRouter.get("/", statusController.status);

statusRouter.get("/update-profile", statusController.updateProfile);

statusRouter.get("/logout", statusController.logout);

export default statusRouter;
