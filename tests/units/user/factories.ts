import { CreateUserUseCase } from "@/domain/features";
import { UserResolver } from "@/application/resolvers";
import {
  CreateUserUseCaseImpl,
  FindUsersUseCaseImpl,
} from "@/application/usecases";
import {
  CreateHashServiceImpl,
  CreateUserValidatorServiceImpl,
} from "@/application/services";
import {
  CreateUser,
  FindOneUser,
  FindUsers,
} from "@/domain/contracts/repositories";
import { mockedUsers } from "@/tests/mocks";

export function makeCreateUserUseCase() {
  const createUserUseCaseSpy: CreateUserUseCase = {
    perform: jest.fn().mockResolvedValue({
      id: "Mocked id",
    }),
  };

  return createUserUseCaseSpy;
}

export function makeUserResolver() {
  const userRepository: CreateUser & FindOneUser & FindUsers = {
    findOne: jest.fn().mockResolvedValue(null),
    find: jest.fn().mockResolvedValue(mockedUsers),
    create: jest.fn().mockResolvedValue({ id: "Mocked id" }),
  };

  const createHashService = new CreateHashServiceImpl();
  const createUserValidatorService = new CreateUserValidatorServiceImpl(
    userRepository
  );

  const findUsersUseCase = new FindUsersUseCaseImpl(userRepository);
  const createUserUseCase = new CreateUserUseCaseImpl(
    createHashService,
    createUserValidatorService,
    userRepository
  );

  const sut = new UserResolver(findUsersUseCase, createUserUseCase);

  return {
    userRepository,
    findUsersUseCase,
    createUserUseCase,
    createHashService,
    createUserValidatorService,
    sut,
  };
}
