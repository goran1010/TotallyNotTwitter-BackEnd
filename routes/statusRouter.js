import { Router } from "express";
const statusRouter = Router();
import * as statusController from "../controllers/statusController.js";

statusRouter.get("/", statusController.status);

export default statusRouter;
