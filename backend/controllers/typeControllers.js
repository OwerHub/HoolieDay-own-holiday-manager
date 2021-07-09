const TypeModell = require("../models/typeModell");

exports.testFunct = (req, res) => {
  res.send("im a testfunction in typeController");
};

exports.newTypeFunct = async (req, res) => {
  const defaultType = new TypeModell({
    name: "elseje3",
    color: "232324",
    description: "ez az URL helye",
  });

  const inComingType = new TypeModell({
    name: req.body.name,
    color: req.body.color,
    description: req.body.description,
  });

  const response = await inComingType.save();
  console.log(response);
  res.send(response);
};

exports.findAllTypes = async (req, res) => {
  const response = await TypeModell.find({}, (err, types) => {
    console.log(types);
    res.send(types);
  });
};
