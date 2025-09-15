import indexRouter from "../../routes/indexRouter";
import express from "express";
const app = express();
import request from "supertest";

app.use(express.urlencoded({ extended: false }));
app.use("/", indexRouter);

test("index route works", (done) => {
  request(app).get("/").expect("Content-Type", /json/).expect(200, done);
});
