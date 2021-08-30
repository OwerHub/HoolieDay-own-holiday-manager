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

async function addEventToCalendar(auth) {
  const calendar = google.calendar({ version: "v3", auth });
  var event = {
    summary: "test2",
    //location: "800 Howard St., San Francisco, CA 94103",
    description: "A chance to hear more about Google's developer products.",
    start: {
      //dateTime: "2021-08-31T19:00:00Z",
      date: "2021-09-02",
      timeZone: "Europe/Budapest",
    },
    end: {
      //dateTime: "2021-08-31T21:00:00Z",
      date: "2021-09-02",
      timeZone: "Europe/Budapest",
    },
    /*  'recurrence': [
      'RRULE:FREQ=DAILY;COUNT=2'
    ], */
    /*  'attendees': [
      {'email': 'lpage@example.com'},
      {'email': 'sbrin@example.com'},
    ], */
    /*    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10},
      ],
    }, */
  };

  const response = await calendar.events
    .insert({
      auth: auth,
      calendarId: "primary",
      resource: event,
    })
    .catch((err) => {
      return err;
    });

  return response;
}

exports.saveToGoogle = async (req, res) => {
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

  const response = await addEventToCalendar(oauth2Client);

  if (response.status == "200") {
    res.json(response.data);
  } else {
    res.status(400).send("Wrong");
  }

  /*   console.log("main response", response);

  res.send({ dataWhatNeed }); */

  /* 
  -----EZ SE LETT VOLNA ROSSZ MEGOLDÁS
  const selectedHolyday = userResponse.holydays.filter(
    (holyday) => holyday._id == req.body.id
  ); // két egyenlőségjellel mert Login-ra küldöm a dolgokat.
 */
};
