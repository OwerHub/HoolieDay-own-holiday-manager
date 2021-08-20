const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

exports.dbConnect = async () => {
  mongoServer = await MongoMemoryServer.create();

  const uri = mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };

  await mongoose.connect(uri, mongooseOpts);
};

exports.dbDisconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

exports.dbDelete = async (models) => {
  const deletions = models.map((model) => model.deleteMany());
  await Promise.all(deletions);
};
