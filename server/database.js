require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const dns = require('dns');

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/";

try {
  dns.setServers(['0.0.0.0','1.1.1.1']);
} catch (error) {

}

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
};

let client;
const connectToMongoDB = async () => {
  if (!client) {
    try {
      client = await MongoClient.connect(uri, options);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.log(error);
    }
  }
  return client;
};

const getConnectedClient = () => client;

module.exports = { connectToMongoDB, getConnectedClient };