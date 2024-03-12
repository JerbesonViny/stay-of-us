import { MongoClient } from "mongodb";
import enviroments from "@/config";

const url = `mongodb://${enviroments.mongo.username}:${enviroments.mongo.password}@${enviroments.mongo.host}:${enviroments.mongo.port}`;

export class MongoDatabase {
  private client: MongoClient;

  async setMongoClient() {
    this.client = new MongoClient(url);

    await this.client.connect();
  }

  async getConnection() {
    await this.setMongoClient();

    return this.client.db(enviroments.mongo.database);
  }

  async close() {
    await this.client.close();
  }
}

export class MongoConnectionSingleton {
  private static instance: MongoDatabase;

  constructor() {
    if (!MongoConnectionSingleton.instance) {
      MongoConnectionSingleton.instance = new MongoDatabase();
    }
  }

  getInstance() {
    return MongoConnectionSingleton.instance;
  }
}
