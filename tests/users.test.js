const request = require("supertest");
const app = require("../app");

describe("GET /users", () => {
  it("returns all users", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /users/:id", () => {
  it("returns a user by ID", async () => {
    const res = await request(app).get("/users/1");
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
    expect(res.body.name).toBe("Alice");
  });

  it("returns 404 for unknown ID", async () => {
    const res = await request(app).get("/users/9999");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("User not found");
  });

  it("returns 400 for non-numeric ID", async () => {
    const res = await request(app).get("/users/abc");
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Invalid ID");
  });
});

describe("POST /users", () => {
  it("creates a new user", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Dave", email: "dave@example.com" });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Dave");
    expect(res.body.email).toBe("dave@example.com");
    expect(res.body.id).toBeDefined();
  });

  it("returns 400 for missing name", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "noname@example.com" });
    expect(res.status).toBe(400);
  });

  it("returns 400 for invalid email", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Eve", email: "not-an-email" });
    expect(res.status).toBe(400);
  });
});

describe("PUT /users/:id", () => {
  it("updates a user", async () => {
    const res = await request(app)
      .put("/users/2")
      .send({ name: "Bob Updated", email: "bob2@example.com" });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Bob Updated");
    expect(res.body.id).toBe(2);
  });

  it("returns 404 for unknown ID", async () => {
    const res = await request(app)
      .put("/users/9999")
      .send({ name: "Nobody", email: "nobody@example.com" });
    expect(res.status).toBe(404);
  });

  it("returns 400 for invalid body", async () => {
    const res = await request(app)
      .put("/users/1")
      .send({ name: "", email: "bad" });
    expect(res.status).toBe(400);
  });
});

describe("DELETE /users/:id", () => {
  it("deletes a user", async () => {
    const res = await request(app).delete("/users/3");
    expect(res.status).toBe(204);
  });

  it("returns 404 for unknown ID", async () => {
    const res = await request(app).delete("/users/9999");
    expect(res.status).toBe(404);
  });

  it("returns 400 for non-numeric ID", async () => {
    const res = await request(app).delete("/users/abc");
    expect(res.status).toBe(400);
  });
});
