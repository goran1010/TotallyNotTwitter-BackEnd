import { Router } from "express";
const statusRouter = Router();
import * as statusController from "../controllers/statusController.js";

statusRouter.get("/", statusController.status);

statusRouter.post("/update-profile", statusController.updateProfile);

statusRouter.post("/logout", statusController.logout);

export default statusRouter;
