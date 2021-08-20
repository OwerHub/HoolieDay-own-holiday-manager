const app = require("../server"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);

const { dbConnect, dbDisconnect, dbDelete } = require("./utils/dbHandler.utils");
const mongoose = require("mongoose");

describe("Smoke tests", () => {
  it("Jest works", async () => {
    //given

    //when

    //then
    expect(1).toBe(1);
  });

  it("Supertest works", async () => {
    //given

    //when
    const response = await request.get("/endpoint/not/exists");

    //then
    expect(response.status).toBe(404);
  });

  it("Database works", async () => {
    //given
    const mongoServer = await dbConnect();

    const TestModel = mongoose.model(
      "test",
      new mongoose.Schema({
        name: String,
      })
    );

    const test = new TestModel({
      name: "testName",
    });
    await test.save();

    //when
    const doc = await TestModel.findOne();
    await dbDelete([TestModel]);
    const result = await TestModel.countDocuments();

    //then
    expect(doc.name).toBe("testName");
    expect(result).toBe(0);

    await dbDisconnect();
  });
});
