import express from "express";
import passport from "./auth/passport.js";
import "dotenv/config";
const app = express();
import sessionMiddleware from "./auth/sessionMiddleware.js";
import cors from "cors";
import isNotLoggedIn from "./auth/isNotLoggedIn.js";
import indexRouter from "./routes/indexRouter.js";
import statusRouter from "./routes/statusRouter.js";

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import path from "node:path";

const assetsPath = path.join(import.meta.dirname, "public");
app.use(express.static(assetsPath));

app.use(sessionMiddleware);
app.use(passport.session());

app.use("/status", statusRouter);
app.use("/", isNotLoggedIn, indexRouter);

app.use((req, res) => {
  res.status(404).json("No resource found");
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(500).json(err.message || "Error 500: Internal Server Error");
});

export default app;
