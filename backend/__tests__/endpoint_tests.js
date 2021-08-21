const app = require("../server");
const supertest = require("supertest");
const request = supertest(app);
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const UserModel = require("../models/UserModel");

const { dbConnect, dbDisconnect, dbDelete } = require("./utils/dbHandler.utils");

// a beégetett tokent beolvasni
function createToken(id) {
  const token = jwt.sign(
    {
      id: id,
    },
    "secretToken",
    { expiresIn: "6h" }
  );
  return token;
}

let mongoServer;

beforeAll(async () => {
  await dbConnect();
});

afterAll(async () => {
  await dbDisconnect();
});

describe("test basic routes", () => {
  it("test Holyday ping", async () => {
    const response = await request.get("/api/holyday/ping");

    expect(response.status).toBe(200);
  });

  it("test token security route in Holyday", async () => {
    const token = createToken("121212122");
    const response = await request
      .get("/api/holyday/pong")
      .set("authorization", token);

    expect(response.status).toBe(200);
  });

  ///------------------------------------
}); // describe ENd

describe("Holydays tests", () => {
  // create basic variables
  let holyday1ID;
  let holyday2ID;
  const Userid = new mongoose.Types.ObjectId();
  const token = createToken(Userid);

  it("createHolyday", async () => {
    // create new User
    const newUser = new UserModel({
      _id: Userid,
      name: "testName",
      sub: "666545423",
      nickName: "nickname",
      email: "email",
    });

    const responseSaveNewHolyday = await newUser.save();

    // create first Holyday
    const newHolyday = {
      name: "Holyday1Name",
      date: "Holyday2Name",
      picture: "Holyday1Picture",
      celebrate: "Holyday1Celebrate",
      description: "Holyday1description",
      type: "Holyday1Type",
    };

    const response = await request
      .post("/api/holyday/newHolyday")
      .set("authorization", token)
      .send(newHolyday);

    holyday1ID = response.body[0]._id;
    //console.log("response body is", response.body[0]._id);
    expect(response.body[0].name).toBe("Holyday1Name");
    expect(response.status).toBe(200);
  });

  it("create new Holyday and test getAllHolyday", async () => {
    const newHolyday2 = {
      name: "Holyday2Name",
      date: "Holyday2Date",
      picture: "Holyday2Picture",
      celebrate: "Holyday2Celebrate",
      description: "Holyday2description",
      type: "Holyday2Type",
    };

    const responseNew2 = await request
      .post("/api/holyday/newHolyday")
      .set("authorization", token)
      .send(newHolyday2);

    holyday2ID = responseNew2.body[1]._id;

    const response = await request
      .get("/api/holyday/allHolyday")
      .set("authorization", token);

    //console.log("test ID-s", holyday1ID, holyday2ID);

    expect(response.status).toBe(200);
    expect(response.body[1].date).toBe("Holyday2Date");
    expect(response.body[1].picture).not.toBe("fakeValue");
    expect(response.body.length).toBe(2);
  });

  it("modify Holyday value in ModifyHolyday", async () => {
    const reqBody = {
      id: holyday2ID,
      key: "celebrate",
      value: "modyfyCelebrate",
    };

    const response = await request
      .put("/api/holyday/modifyHolyday")
      .set("authorization", token)
      .send(reqBody);

    expect(response.status).toBe(200);
    expect(response.body[1].celebrate).toBe("modyfyCelebrate");

    //console.log(response.body[1].celebrate);
  });

  it("delete a holyday", async () => {
    const reqBody = {
      id: holyday2ID,
    };

    const response = await request
      .delete("/api/holyday/deleteHolyday")
      .set("authorization", token)
      .send(reqBody);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
});
