import { MongoClient } from "mongodb";
import enviroments from "@/config";

const url = `mongodb://${enviroments.mongo.username}:${enviroments.mongo.password}@${enviroments.mongo.host}:${enviroments.mongo.port}`;

export async function createMongoConnection() {
  const client = new MongoClient(url);

  await client.connect();

  return client.db(enviroments.mongo.database);
}
