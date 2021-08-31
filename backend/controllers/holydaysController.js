const { google } = require("googleapis");

const UserModel = require("../models/UserModel");
exports.testFunct = (req, res) => {
  res.send("im a testfunction");
};

exports.newHolydayFunct = async (req, res) => {
  // search User
  const searchUser = await UserModel.findOne({
    _id: req.idFromToken,
  });

  if (searchUser) {
    searchUser.holydays.push({
      name: req.body.name,
      date: req.body.date,
      picture: req.body.picture,
      celebrate: req.body.celebrate,
      description: req.body.description,
      type: req.body.type,
    });

    const response = await searchUser.save();
    //console.log(response.holydays);
    res.send(response.holydays);
  }

  if (!searchUser) {
    console.log("valami gáz van, nem talál user-t");
    console.log(req.body);
    res.status(203).send("user not found");
  }
};

exports.findAllHolydays = async (req, res) => {
  //console.log("token in holydays", req.idFromToken);
  const response = await UserModel.findOne({ _id: req.idFromToken });

  res.send(response.holydays);
};

//error-t, nem talált cuccot le kéne kezelni
exports.deleteHolyday = async (req, res) => {
  const response = await UserModel.findOneAndUpdate(
    {
      "holydays._id": req.body.id,
    },
    {
      $pull: {
        holydays: {
          _id: req.body.id,
        },
      },
    },
    {
      new: true,
    }
  );

  res.send(response.holydays);
};

exports.updateHolyday = async (req, res) => {
  const response = await UserModel.findOneAndUpdate(
    {
      "holydays._id": req.body.id,
    },
    { $set: { [`holydays.$.${req.body.key}`]: req.body.value } },
    { new: true }
  );

  //console.log("response in update: ", response);
  res.json(response.holydays);
};

//------------CALENDAR STUFS

function listEvents(auth) {
  const calendar = google.calendar({ version: "v3", auth });
  calendar.events.list(
    {
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      const events = res.data.items;
      if (events.length) {
        console.log("Upcoming 10 events:");
        events.map((event, i) => {
          const start = event.start.dateTime || event.start.date;
          console.log(`${start} - ${event.summary}`);
        });
      } else {
        console.log("No upcoming events found.");
      }
    }
  );
}

async function createNewCalendar(auth) {
  console.log("in CreateFunction");
  const calendar = google.calendar({ version: "v3", auth });
  var newCalendar = {
    requestBody: {
      summary: "HoolieDays",
      description: "Hooliedays Calendar",
      //timeZone: "Europe/Budapest",
      //etag: "my_etag",
      //id: "234234234HoolieDay",
    },
  };

  const res = await calendar.calendars.insert(newCalendar);
  //console.log(res.data.id);
  return res.data.id;
}

async function askHoolieDaysCalendar(auth) {
  const calendar = google.calendar({ version: "v3", auth });

  const reqCalendars = await calendar.calendarList.list({});

  const findMyCalendar = await reqCalendars.data.items
    .filter(function (calendar) {
      return calendar.summary === "HoolieDays";
    })
    .map(function (calendar) {
      return calendar.id;
    });

  console.log("findmyCalendars", findMyCalendar);
  if (findMyCalendar.length === 1) {
    return { message: "", data: findMyCalendar[0] };
  } else {
    const res = await createNewCalendar(auth);
    return { message: "I create new calendar", data: res };
  }
}

async function addEventToCalendar(
  auth,
  calendarID,
  date,
  summary,
  description,
  color
) {
  const calendar = google.calendar({ version: "v3", auth });
  var event = {
    summary: summary,
    description: description,
    colorId: color,
    start: {
      date: date,
      timeZone: "Europe/Budapest",
    },
    end: {
      date: date,
      timeZone: "Europe/Budapest",
    },
  };

  console.log("calendarID.data in AddEvent", calendarID.data);

  const response = await calendar.events
    .insert({
      auth: auth,
      calendarId: calendarID.data,
      resource: event,
    })
    .catch((err) => {
      return err;
    });

  return response;
}

exports.saveToGoogle = async (req, res) => {
  const eventColors = ["2", "3", "6", "7"]; // best colors for the types
  const userDataResponse = await UserModel.findOne({ _id: req.idFromToken });

  const dataWhatNeed = {
    date: req.body.date,
    celebrate: req.body.celebrate,
    description: req.body.description,
    name: req.body.name,
    access_token: userDataResponse.acess_token,
    refresh_token: userDataResponse.refresh_token,
  };

  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
  );

  const tokens = {
    access_token: userDataResponse.acess_token,
    refresh_token: userDataResponse.refresh_token,
  };

  oauth2Client.setCredentials(tokens);

  const calendarID = await askHoolieDaysCalendar(oauth2Client);

  console.log("calendarID= ", calendarID.data);
  const eventResponse = await addEventToCalendar(
    oauth2Client,
    calendarID,
    req.body.date,
    req.body.summary,
    req.body.description,
    eventColors[req.body.type]
  );

  console.log("return eventresponse :", eventResponse.status);

  res.json({
    calendarMessage: calendarID.message,
    googleStatus: eventResponse.status,
  });
};
