import "reflect-metadata";
import "../../../../src/main/config/module-alias";
import dotenv from "dotenv";
dotenv.config();

import { CreateUserUseCaseImpl } from "@/application/usecases";
import { CreateUserRepositoryImpl } from "@/infra/repositories";
import {
  MongoConnectionSingleton,
  MongoDatabase,
} from "@/main/config/mongo-connection";
import { Db } from "mongodb";
import { populateDatabase, resetDatabase } from "@/tests/utils/mongo";
import { CreateUserUseCase } from "@/domain/features";
import { CreateUserRepository } from "@/domain/contracts/repositories";
import { mockedUser } from "@/tests/mocks";

describe("CreateUserUseCase", () => {
  let createUserUseCase: CreateUserUseCase;
  let createUserRepository: CreateUserRepository;
  let mongoDatabase: MongoDatabase;
  let mongoConnection: Db;

  beforeAll(async () => {
    mongoDatabase = new MongoConnectionSingleton().getInstance();
    mongoConnection = await mongoDatabase.getConnection();
    await resetDatabase({ mongoConnection });
    await populateDatabase({ mongoConnection });
  });

  beforeEach(async () => {
    createUserRepository = new CreateUserRepositoryImpl(mongoConnection);
    createUserUseCase = new CreateUserUseCaseImpl(createUserRepository);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await mongoDatabase.close();
  });

  it("Should create user", async () => {
    const response = await createUserUseCase.perform(mockedUser);

    expect(response).toHaveProperty("id");
  });
});
