import "reflect-metadata";
import "../../../../src/main/config/module-alias";
import dotenv from "dotenv";
dotenv.config();

import { CreateUserUseCase } from "@/application/usecases";
import { UserRepository } from "@/infra/repositories";
import {
  MongoConnectionSingleton,
  MongoDatabase,
} from "@/main/config/mongo-connection";
import { Db } from "mongodb";
import { populateDatabase, resetDatabase } from "@/tests/utils/mongo";
import { CreateUser, FindOneUser } from "@/domain/contracts/repositories";
import { mockedUser } from "@/tests/mocks";
import {
  CreateHashService,
  CreateUserValidatorService,
} from "@/application/services";
import { CreateHash, CreateUserValidator } from "@/domain/services";
import { Usecase } from "@/@shared/abstract.usecase";

describe("CreateUserUseCase", () => {
  let createUserUseCase: Usecase<
    CreateUserUseCase.Input,
    CreateUserUseCase.Output
  >;
  let userRepository: CreateUser & FindOneUser;
  let createHashService: CreateHash;
  let createUserValidatorService: CreateUserValidator;
  let mongoDatabase: MongoDatabase;
  let mongoConnection: Db;

  beforeAll(async () => {
    mongoDatabase = new MongoConnectionSingleton().getInstance();
    mongoConnection = await mongoDatabase.getConnection();
    await resetDatabase({ mongoConnection });
    await populateDatabase({ mongoConnection });
  });

  beforeEach(async () => {
    createHashService = new CreateHashService();
    userRepository = new UserRepository(mongoConnection);
    createUserValidatorService = new CreateUserValidatorService(userRepository);
    createUserUseCase = new CreateUserUseCase.UseCase(
      createHashService,
      createUserValidatorService,
      userRepository
    );
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
