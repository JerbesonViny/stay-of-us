import "reflect-metadata";
import "../../../../src/main/config/module-alias";
import dotenv from "dotenv";
dotenv.config();

import { FindUsersUseCaseImpl } from "@/application/usecases";
import { FindUsersRepositoryImpl } from "@/infra/repositories";
import {
  MongoConnectionSingleton,
  MongoDatabase,
} from "@/main/config/mongo-connection";
import { Db } from "mongodb";
import { populateDatabase, resetDatabase } from "@/tests/utils/mongo";
import { FindUsersUseCase } from "@/domain/features";
import { FindUsersRepository } from "@/domain/contracts/repositories";

describe("FindUsersUseCase", () => {
  let findUsersUseCase: FindUsersUseCase;
  let findUsersRepository: FindUsersRepository;
  let mongoDatabase: MongoDatabase;
  let mongoConnection: Db;

  beforeAll(async () => {
    mongoDatabase = new MongoConnectionSingleton().getInstance();
    mongoConnection = await mongoDatabase.getConnection();
    await resetDatabase({ mongoConnection });
    await populateDatabase({ mongoConnection });
  });

  beforeEach(async () => {
    findUsersRepository = new FindUsersRepositoryImpl(mongoConnection);
    findUsersUseCase = new FindUsersUseCaseImpl(findUsersRepository);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await mongoDatabase.close();
  });

  it("Should get all users", async () => {
    const users = await findUsersUseCase.perform();

    expect(users).toMatchSnapshot();
  });
});
