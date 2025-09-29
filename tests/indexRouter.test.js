import indexRouter from "../routes/indexRouter";
import express from "express";
const app = express();
import request from "supertest";
import prisma from "../db/prisma";

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", indexRouter);

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("GET / route", () => {
  test("responds with json 200", async () => {
    const response = await request(app).get("/");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual("OK");
  });
});

describe("POST /signup route", () => {
  test("responds with json 400, Username already exists, if given username exists", async () => {
    await prisma.user.create({
      data: {
        username: "test_user",
        email: "testuser@example.com",
        password: "secure_password123",
      },
    });

    const response = await request(app).post("/signup").send({
      username: "test_user",
      email: "testuser@example.com",
      password: "secure_password123",
      confirmPassword: "secure_password123",
    });

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(400);
    expect(response.body.msg).toEqual("Username already exists");
  });

  test("responds with json 400, Password must be between 5 and 30 characters long if no correct password", async () => {
    const response = await request(app).post("/signup").send({
      username: "test_user",
      email: "testuser@example.com",
      password: "sec",
      confirmPassword: "sec",
    });

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(400);
    expect(response.body.msg).toEqual(
      "Password must be between 5 and 30 characters long",
    );
  });

  test("responds with json 400, passwords need to match, when passwords don't match", async () => {
    const response = await request(app).post("/signup").send({
      username: "test_user",
      email: "testuser@example.com",
      password: "secure_password123",
      confirmPassword: "different_password",
    });

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(400);
    expect(response.body.msg).toEqual("Passwords need to match");
  });

  test("responds with json 201 when valid data is provided", async () => {
    const response = await request(app).post("/signup").send({
      username: "test_user",
      email: "testuser@example.com",
      password: "secure_password123",
      confirmPassword: "secure_password123",
    });

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(201);
  });
});
