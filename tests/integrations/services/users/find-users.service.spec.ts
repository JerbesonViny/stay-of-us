import "reflect-metadata";
import "../../../../src/main/config/module-alias";
import dotenv from "dotenv";
dotenv.config();

import { FindUsersService } from "@/application/services";
import {
  MongoConnectionSingleton,
  MongoDatabase,
} from "@/main/config/mongo-connection";
import { Db, ObjectId } from "mongodb";

describe("FindUsersService", () => {
  let findUsersService: FindUsersService;
  let mongoConnectionSingleton: MongoDatabase;
  let mongoConnection: Db;

  beforeAll(async () => {
    mongoConnectionSingleton = new MongoConnectionSingleton().getInstance();
  });

  beforeEach(async () => {
    mongoConnection = await mongoConnectionSingleton.getConnection();
    findUsersService = new FindUsersService(mongoConnection);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await mongoConnectionSingleton.close();
  });

  it("Should get all users", async () => {
    const users = await findUsersService.perform();

    expect(users).toEqual([
      {
        _id: new ObjectId("65ec6b173adbcd6214ef6241"),
        name: "mocked name",
      },
    ]);
  });
});
