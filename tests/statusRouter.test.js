import express from "express";
const app = express();
import request from "supertest";
import statusRouter from "../routes/statusRouter";

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", statusRouter);

describe("GET /status route", () => {
  test("responds with json 403 when not logged in", async () => {
    const response = await request(app).get("/");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(403);
  });
});
