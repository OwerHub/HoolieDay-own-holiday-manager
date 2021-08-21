const app = require("../server");
const supertest = require("supertest");
const request = supertest(app);
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const UserModel = require("../models/UserModel");
const TypeModel = require("../models/typeModell");
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

const createUserFunct = async (Userid) => {
  const newUser = new UserModel({
    _id: Userid,
    name: "testName",
    sub: "666545423",
    nickName: "nickname",
    email: "email",
  });

  const responseSaveNewHolyday = await newUser.save();
};

const createHolyDayFunct = async (
  name,
  date,
  picture,
  celebrate,
  description,
  type,
  token
) => {
  const newHolyday = {
    name: name,
    date: date,
    picture: picture,
    celebrate: celebrate,
    description: description,
    type: type,
  };

  const response = await request
    .post("/api/holyday/newHolyday")
    .set("authorization", token)
    .send(newHolyday);

  return response;
};

describe("Holydays tests", () => {
  // create basic variables
  let holyday1ID;
  let holyday2ID;
  const Userid = new mongoose.Types.ObjectId();
  const token = createToken(Userid);

  it("createHolyday", async () => {
    // create new User
    /* const newUser = new UserModel({
      _id: Userid,
      name: "testName",
      sub: "666545423",
      nickName: "nickname",
      email: "email",
    });

    const responseSaveNewHolyday = await newUser.save(); */

    const CreateNewUser = await createUserFunct(Userid);

    const response = await createHolyDayFunct(
      "Holyday1Name",
      "Holyday1Date",
      "Holyday1Picture",
      "Holyday1Celebrate",
      "Holyday1description",
      "Holyday1Type",
      token
    );

    // create first Holyday
    /*   const newHolyday = {
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
      .send(newHolyday); */

    holyday1ID = response.body[0]._id;
    //console.log("response body is", response.body[0]._id);
    expect(response.body[0].name).toBe("Holyday1Name");
    expect(response.status).toBe(200);
  });

  it("create new Holyday and test getAllHolyday", async () => {
    /*  const newHolyday2 = {
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
      .send(newHolyday2); */

    const responseNew2 = await createHolyDayFunct(
      "Holyday2Name",
      "Holyday2Date",
      "Holyday2Picture",
      "Holyday2Celebrate",
      "Holyday2description",
      "Holyday2Type",
      token
    );

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

describe("user tests", () => {
  const Userid = new mongoose.Types.ObjectId();
  const token = createToken(Userid);

  it("modify Nickname", async () => {
    const CreateNewUser = await createUserFunct(Userid);

    const reqBody = {
      key: "nickName",
      value: "newNickName",
    };

    const response = await request
      .put("/api/login/updateUserData")
      .set("authorization", token)
      .send(reqBody);

    expect(response.status).toBe(200);
    expect(response.body.newName).toBe("newNickName");
  });
});

// defaultTypes -------------------

const createType = async () => {
  const reqBody = {
    name: "type1Name",
    color: "124585",
    description: "type1Description",
  };
};

const createTypeFunct = async (
  name,
  color,
  description,
  token,
  userType = false
) => {
  let url;

  const reqBody = {
    name: name,
    color: color,
    description: description,
  };

  if (userType) {
    url = "/api/userType/newUserType";
  } else {
    url = "/api/type/newType";
  }

  const response = await request.post(url).set("authorization", token).send(reqBody);

  return response;
};

describe("default Types tests", () => {
  const Userid = new mongoose.Types.ObjectId();
  const token = createToken(Userid);

  it("Create New Type type/newType", async () => {
    const response = await createTypeFunct(
      "type1Name",
      "type1Color",
      "type1Description",
      token
    );

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("type1Name");
  });

  it("ask all types type/allTypes", async () => {
    const responseCreateType = await createTypeFunct(
      "type2Name",
      "type2Color",
      "type2Description",
      token
    );

    const response = await request
      .get("/api/type/allTypes")
      .set("authorization", token);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[1].name).toBe("type2Name");
  });
});

//--- User Types
// Ezt még lehet egyszerűsíteni

describe("user Type Tests", () => {
  const Userid = new mongoose.Types.ObjectId();
  const token = createToken(Userid);

  // tömbben egyszerűbb
  let userTypeId1;
  let userTypeId2;

  it("create new UserType in /api/userType/newUserType", async () => {
    // ezt majd ikiszervezem
    const CreateNewUser = await createUserFunct(Userid);

    const response = await createTypeFunct(
      "userType1Name",
      "userType1Color",
      "userType1Description",
      token,
      true
    );

    userTypeId1 = response.body[0]._id;
    expect(response.status).toBe(200);
    expect(response.body[0].name).toBe("userType1Name");
  });

  it("ask all userType in /api/userType/allUserTypes", async () => {
    const createresponse = await createTypeFunct(
      "userType2Name",
      "userType2Color",
      "userType2Description",
      token,
      true
    );

    const response = await request
      .get("/api/userType/allUserTypes")
      .set("authorization", token);

    userTypeId2 = response.body[1]._id;
    expect(response.status).toBe(200);
    expect(response.body[1].name).toBe("userType2Name");
    expect(response.body.length).toBe(2);
  });

  it("modify Usertype in /api/userType/updateUserTypes", async () => {
    console.log("idéék", userTypeId1, userTypeId2);

    const reqBody = {
      id: userTypeId2,
      key: "name",
      value: "modifyUserTypeName",
    };

    const response = await request
      .put("/api/userType/updateUserTypes")
      .set("authorization", token)
      .send(reqBody);

    console.log();
    expect(response.status).toBe(200);
    expect(response.body[1].name).toBe("modifyUserTypeName");
  });

  it("delete userType in /api/userType/deleteUserTypes", async () => {
    const reqBody = {
      id: userTypeId2,
    };

    const response = await request
      .delete("/api/userType/deleteUserTypes")
      .set("authorization", token)
      .send(reqBody);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
});
