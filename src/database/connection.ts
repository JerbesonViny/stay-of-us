import { MongoClient } from "mongodb";
import { config } from "@/config";

const url = `mongodb://${config.mongo.username}:${config.mongo.password}@${config.mongo.host}:${config.mongo.port}`;

const client = new MongoClient(url);

export const connection = client
  .connect()
  .then((result) => result.db(config.mongo.database));
