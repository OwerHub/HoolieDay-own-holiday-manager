const TypeModell = require("../models/typeModell");

const addDefaultTypesToUserTypes = async (types) => {
  const defaultTypes = await TypeModell.find({});

  const tryType = {
    _id: "6120caaca8da16204c448f6d",
    name: "FIRST",
    color: "FIRST",
    description: "FIRST",
  };

  const newTypes = defaultTypes.concat(types);

  return newTypes;
};

exports.addDefaultTypesToUserTypes;
