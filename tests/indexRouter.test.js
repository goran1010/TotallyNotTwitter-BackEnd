import indexRouter from "../routes/indexRouter";
import express from "express";
const app = express();
import request from "supertest";

app.use(express.urlencoded({ extended: false }));
app.use("/", indexRouter);

describe("indexRouter", () => {
  test("GET / route responds with json 200", async () => {
    const response = await request(app).get("/");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual("OK");
  });
  test("POST /signup route responds with json 400", async () => {
    const response = await request(app).post("/signup");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(400);
  });
});
