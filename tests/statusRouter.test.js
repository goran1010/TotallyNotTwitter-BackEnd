import app from "../app.js";
import request from "supertest";
import prisma from "../db/prisma.js";

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("GET /status route", () => {
  test("responds with json 403 when not logged in", async () => {
    const response = await request(app).get("/status");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(403);
  });

  test("responds with json 200 and user info when logged in", async () => {
    const agent = request.agent(app);

    await agent.post("/signup").send({
      username: "test_user",
      email: "testuser@example.com",
      password: "secure_password123",
      ["confirm-password"]: "secure_password123",
    });

    await agent
      .post("/login")
      .send({ username: "test_user", password: "secure_password123" })
      .expect(200);

    const response = await agent.get("/status");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("username", "test_user");
  });

  test("responds with json 200 when logged out successfully", async () => {
    const agent = request.agent(app);

    await agent.post("/signup").send({
      username: "test_user",
      email: "testuser@example.com",
      password: "secure_password123",
      ["confirm-password"]: "secure_password123",
    });

    await agent
      .post("/login")
      .send({ username: "test_user", password: "secure_password123" })
      .expect(200);

    const response = await agent.get("/status");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);

    await agent.post("/status/logout").expect(200);

    const responseLogOut = await agent.get("/status");
    expect(responseLogOut.headers["content-type"]).toMatch(/json/);
    expect(responseLogOut.status).toEqual(403);
  });
});
