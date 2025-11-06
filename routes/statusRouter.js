import { Router } from "express";
const statusRouter = Router();
import * as statusController from "../controllers/statusController.js";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });

statusRouter.get("/", statusController.status);

statusRouter.put(
  "/update-profile",
  upload.single("avatar"),
  statusController.updateProfile,
);

statusRouter.post("/logout", statusController.logout);

export default statusRouter;
