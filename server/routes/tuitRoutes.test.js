require("dotenv").config();
const mongoose = require("mongoose");
const supertest = require("supertest");

const { app, initializeServer } = require("../index");
const initializeMongoDB = require("../../DB/index");
const Tuit = require("../../DB/models/Tuit");

const request = supertest(app);
let server;

beforeAll(async () => {
  await initializeMongoDB(process.env.DB_STRING_TEST);
  server = await initializeServer(4005);
});

beforeEach(async () => {
  await Tuit.deleteMany();
  await Tuit.create({
    text: "test",
    likes: 1,
    date: "2021-11-18T18:08:28.677Z",
    _id: "619699ad8412045cca3119e3",
  });
});

afterAll((done) => {
  server.close(async () => {
    await mongoose.connection.close();
    done();
  });
});

describe("Given the tuit routes", () => {
  describe("When it receives a GET ", () => {
    test("Then it should return a 200 status", async () => {
      const { body } = await request.get("/tuits").expect(200);

      const expectedResponse = [
        {
          date: "2021-11-18T18:08:28.677Z",
          id: "619699ad8412045cca3119e3",
          likes: 1,
          text: "test",
        },
      ];

      expect(body).toEqual(expectedResponse);
    });
  });

  describe("When it receives a GET with a id ", () => {
    test("Then it should return a 200 status", async () => {
      const { body } = await request
        .get("/tuits/619699ad8412045cca3119e3")
        .expect(200);

      const expectedResponse = {
        date: "2021-11-18T18:08:28.677Z",
        id: "619699ad8412045cca3119e3",
        likes: 1,
        text: "test",
      };

      expect(body).toEqual(expectedResponse);
    });
  });

  describe("When it receives a PATCH with a id ", () => {
    test("Then it should return a 200 status", async () => {
      const { body } = await request
        .patch("/tuits/like/619699ad8412045cca3119e3")
        .expect(200);

      const expectedResponse = {
        date: "2021-11-18T18:08:28.677Z",
        id: "619699ad8412045cca3119e3",
        likes: 2,
        text: "test",
      };

      expect(body).toEqual(expectedResponse);
    });
  });

  describe("When it receives a POST", () => {
    test("Then it should return a 201 status", async () => {
      const newPost = {
        date: "2021-11-18T18:08:28.677Z",
        _id: "619699ad8412045cca311911",
        likes: 2,
        text: "createdTest",
      };
      const { body } = await request
        .post("/tuits/create")
        .send(newPost)
        .expect(201);

      const expectedResponse = {
        date: "2021-11-18T18:08:28.677Z",
        id: "619699ad8412045cca311911",
        likes: 2,
        text: "createdTest",
      };

      expect(body).toEqual(expectedResponse);
    });
  });

  describe("When it receives a POST with ID", () => {
    test("Then it should return a 200 status", async () => {
      const { body } = await request
        .post("/tuits/delete/619699ad8412045cca3119e3")
        .expect(200);

      const expectedResponse = {
        id: "619699ad8412045cca3119e3",
      };

      expect(body).toEqual(expectedResponse);
    });
  });
});
