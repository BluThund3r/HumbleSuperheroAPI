import app from "../src/app.js";
import supertest from "supertest";
import { heroes } from "../src/routers/heroesRouter.js";

describe("POST /superheroes", () => {
  // Create a server instance that would be initialized before all tests
  let server;

  beforeAll(() => {
    // Make it listen to a port
    server = app.listen(1);
  });

  afterAll((done) => {
    // After all tests have ended, close the server
    server.close();
    done();
  });

  describe("given all the fields are correct", () => {
    test("should respond with status code 200", async () => {
      const dataToSend = {
        name: "Superman",
        superpower: "flying",
        humility: 8,
      };
      const response = await supertest(app)
        .post("/superheroes")
        .send(dataToSend);

      expect(response.statusCode).toBe(201);
      expect(JSON.parse(response.text)).toStrictEqual({ ...dataToSend, id: 1 });
    });
  });

  describe("given some fields are missing", () => {
    test("should respond with status code 400 for missing name", async () => {
      const response = await supertest(app).post("/superheroes").send({
        superpower: "flying",
        humility: 8,
      });

      expect(response.statusCode).toBe(400);
    });

    test("should respond with status code 400 for missing superpower", async () => {
      const response = await supertest(app).post("/superheroes").send({
        name: "Superman",
        humility: 8,
      });

      expect(response.statusCode).toBe(400);
    });

    test("should respond with status code 400 for missing humility", async () => {
      const response = await supertest(app).post("/superheroes").send({
        superpower: "flying",
        name: "Superman",
      });

      expect(response.statusCode).toBe(400);
    });
  });

  describe("given fields do not have proper type", () => {
    test("should respond with status code 400 for wrong name type", async () => {
      const response = await supertest(app).post("/superheroes").send({
        name: 1,
        superpower: "flying",
        humility: 8,
      });

      expect(response.statusCode).toBe(400);
    });

    test("should respond with status code 400 for wrong superpower type", async () => {
      const response = await supertest(app).post("/superheroes").send({
        name: "Superman",
        superpower: 1,
        humility: 8,
      });

      expect(response.statusCode).toBe(400);
    });

    test("should respond with status code 400 for wrong humility type", async () => {
      const response = await supertest(app).post("/superheroes").send({
        name: "Superman",
        superpower: "flying",
        humility: "8",
      });

      expect(response.statusCode).toBe(400);
    });
  });

  describe("given wrong values for fields", () => {
    test("should respond with status code 400 for humility out of [1, 10]", async () => {
      const response = await supertest(app).post("/superheroes").send({
        name: "Superman",
        superpower: "flying",
        humility: 11,
      });

      expect(response.statusCode).toBe(400);
    });

    test("should respond with status code 400 for name length out of [1, 50]", async () => {
      const response = await supertest(app).post("/superheroes").send({
        name: "",
        superpower: "flying",
        humility: 10,
      });

      expect(response.statusCode).toBe(400);
    });

    test("should respond with status code 400 superpower length out of [1, 50]", async () => {
      const response = await supertest(app).post("/superheroes").send({
        name: "Superman",
        superpower: "",
        humility: 10,
      });

      expect(response.statusCode).toBe(400);
    });
  });
});
