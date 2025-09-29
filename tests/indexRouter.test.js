import indexRouter from "../routes/indexRouter";
import express from "express";
const app = express();
import request from "supertest";

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", indexRouter);

describe("GET / route", () => {
  test("responds with json 200", async () => {
    const response = await request(app).get("/");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual("OK");
  });
});

describe("POST /signup route", () => {
  test("responds with json 400 for empty input", async () => {
    const response = await request(app).post("/signup").send({});
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(400);
  });

  test("responds with json 201 when valid data is provided", async () => {
    const response = await request(app).post("/signup").send({
      username: "test_user",
      email: "testuser@example.com",
      password: "secure_password123",
    });

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(201);
    expect(response.body.message).toEqual("OK");
  });
});
