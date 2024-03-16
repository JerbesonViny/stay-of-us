import "reflect-metadata";
import "../../../../src/main/config/module-alias";
import dotenv from "dotenv";
dotenv.config();

import { CreateUserUseCaseImpl } from "@/application/usecases";
import {
  CreateUserRepositoryImpl,
  FindUserRepositoryImpl,
} from "@/infra/repositories";
import {
  MongoConnectionSingleton,
  MongoDatabase,
} from "@/main/config/mongo-connection";
import { Db } from "mongodb";
import { populateDatabase, resetDatabase } from "@/tests/utils/mongo";
import { CreateUserUseCase } from "@/domain/features";
import {
  CreateUserRepository,
  FindUserRepository,
} from "@/domain/contracts/repositories";
import { mockedUser } from "@/tests/mocks";
import {
  CreateHashServiceImpl,
  CreateUserValidatorServiceImpl,
} from "@/application/services";
import {
  CreateHashService,
  CreateUserValidatorService,
} from "@/domain/services";

describe("CreateUserUseCase", () => {
  let createUserUseCase: CreateUserUseCase;
  let createUserRepository: CreateUserRepository;
  let findUserRepository: FindUserRepository;
  let createHashService: CreateHashService;
  let createUserValidatorService: CreateUserValidatorService;
  let mongoDatabase: MongoDatabase;
  let mongoConnection: Db;

  beforeAll(async () => {
    mongoDatabase = new MongoConnectionSingleton().getInstance();
    mongoConnection = await mongoDatabase.getConnection();
    await resetDatabase({ mongoConnection });
    await populateDatabase({ mongoConnection });
  });

  beforeEach(async () => {
    createHashService = new CreateHashServiceImpl();
    createUserRepository = new CreateUserRepositoryImpl(mongoConnection);
    findUserRepository = new FindUserRepositoryImpl(mongoConnection);
    createUserValidatorService = new CreateUserValidatorServiceImpl(
      findUserRepository
    );
    createUserUseCase = new CreateUserUseCaseImpl(
      createHashService,
      createUserValidatorService,
      createUserRepository
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
