const { getTuits, createTuit, deleteTuit } = require("./tuitContollers");
const Tuit = require("../../DB/models/Tuit");

jest.mock("../../DB/models/Tuit");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Given the tuit controllers", () => {
  describe("Given the getTuits function and resolved promise", () => {
    describe("When it recibes the res object", () => {
      test("Then it should call the methods json and status with a 200", async () => {
        const res = mockResponse();
        const expectedStatus = 200;
        const expectedTuit = [
          { title: "Tuit 1", id: 1, date: "2020-09-01", likes: 0 },
        ];

        Tuit.find = jest.fn().mockResolvedValue(expectedTuit);
        await getTuits(null, res);

        expect(res.json).toHaveBeenCalledWith(expectedTuit);
        expect(res.status).toHaveBeenCalledWith(expectedStatus);
      });
    });

    describe("When it recibes the next function and a rejected promise", () => {
      test("Then it should call the next function with a expected error", async () => {
        const expectedError = new Error("Error loading the tuits.");
        const next = jest.fn();

        Tuit.find = jest.fn().mockRejectedValue();
        await getTuits(null, null, next);

        expect(next).toHaveBeenCalledWith(expectedError);
      });
    });
  });

  describe("Given the createTuit function", () => {
    describe("When it recibes the res and req objects and resolved promise", () => {
      test("Then it should call the methods json and status with a 200", async () => {
        const req = {
          body: { title: "Tuit 1", id: 1, date: "2020-09-01", likes: 0 },
        };
        const res = mockResponse();
        const expectedStatus = 201;

        Tuit.create = jest.fn().mockResolvedValue(req.body);
        await createTuit(req, res);

        expect(res.json).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(expectedStatus);
      });
    });

    describe("When it recibes a next function and rejected promise", () => {
      test("Then it should call the next function with the expected error", async () => {
        const req = {
          body: {
            title: "Tuit 1",
            id: 1,
            date: "2020-09-01",
            likes: 0,
          },
        };
        const next = jest.fn();
        const expectedError = new Error("Error creating the tuit.");

        Tuit.create = jest.fn().mockRejectedValue();
        await createTuit(req, null, next);

        expect(next).toHaveBeenCalledWith(expectedError);
      });
    });
  });

  describe("Given the deleteTuit function", () => {
    describe("When it recibes the res and req objects, a found user and resolved promise", () => {
      test("Then it should call the methods json and status with a 200", async () => {
        const req = {
          params: { id: 1 },
        };
        const res = mockResponse();
        const expectedStatus = 200;

        Tuit.findByIdAndDelete = jest.fn().mockResolvedValue(req.params);
        await deleteTuit(req, res);

        expect(res.json).toHaveBeenCalledWith(req.params);
        expect(res.status).toHaveBeenCalledWith(expectedStatus);
      });
    });

    describe("When it recibes the res and req objects a not found user and a resolved promise", () => {
      test("Then it should call the methods json and status with a 200", async () => {
        const req = {
          params: { id: 1 },
        };
        const expectedError = new Error("Tuit not found.");
        const next = jest.fn();

        Tuit.findByIdAndDelete = jest.fn().mockResolvedValue(null);
        await deleteTuit(req, null, next);

        expect(next).toHaveBeenCalledWith(expectedError);
      });
    });

    describe("When it recibes the res and req objects and a rejected promise", () => {
      test("Then it should call the methods json and status with a 200", async () => {
        const req = {
          params: { id: 1 },
        };
        const expectedError = new Error("Error deleting the tuit.");
        const next = jest.fn();

        Tuit.findByIdAndDelete = jest.fn().mockRejectedValue();
        await deleteTuit(req, null, next);

        expect(next).toHaveBeenCalledWith(expectedError);
      });
    });
  });
});
