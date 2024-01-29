var mongoose = require("mongoose");

module.exports = async function connectMongo() {
  const MONGO_URL = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER}/${process.env.MONGO_DATABASE}?ssl=true&replicaSet=atlas-nsyxcu-shard-0&authSource=admin&retryWrites=true&w=majority`;
  return await mongoose.connect(MONGO_URL);
};
