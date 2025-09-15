import indexRouter from "../../routes/indexRouter";
import express from "express";
const app = express();
import request from "supertest";

app.use(express.urlencoded({ extended: false }));
app.use("/", indexRouter);

describe("indexRouter", () => {
  test("root route works", (done) => {
    request(app).get("/").expect("Content-Type", /json/).expect(200, done);
  });
  test("signup route works", (done) => {
    request(app)
      .post("/signup")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
