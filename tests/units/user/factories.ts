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
  CreateUserRepository,
  FindUserRepository,
  FindUsersRepository,
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
  const findUsersRepository: FindUsersRepository = {
    perform: jest.fn().mockResolvedValue(mockedUsers),
  };
  const createUserRepository: CreateUserRepository = {
    perform: jest.fn().mockResolvedValue({ id: "Mocked id" }),
  };
  const findUserRepository: FindUserRepository = {
    perform: jest.fn().mockResolvedValue(null),
  };

  const createHashService = new CreateHashServiceImpl();
  const createUserValidatorService = new CreateUserValidatorServiceImpl(
    findUserRepository
  );

  const findUsersUseCase = new FindUsersUseCaseImpl(findUsersRepository);
  const createUserUseCase = new CreateUserUseCaseImpl(
    createHashService,
    createUserValidatorService,
    createUserRepository
  );

  const sut = new UserResolver(findUsersUseCase, createUserUseCase);

  return {
    findUsersRepository,
    createUserRepository,
    findUserRepository,
    findUsersUseCase,
    createUserUseCase,
    createHashService,
    createUserValidatorService,
    sut,
  };
}
