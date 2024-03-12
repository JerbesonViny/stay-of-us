import { CreateUserUseCase } from "@/domain/features";
import { UserResolver } from "@/application/resolvers";
import {
  CreateUserUseCaseImpl,
  FindUsersUseCaseImpl,
} from "@/application/usecases";
import {
  CreateUserRepository,
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

  const findUsersUseCase = new FindUsersUseCaseImpl(findUsersRepository);
  const createUserUseCase = new CreateUserUseCaseImpl(createUserRepository);

  const sut = new UserResolver(findUsersUseCase, createUserUseCase);

  return {
    findUsersRepository,
    createUserRepository,
    findUsersUseCase,
    createUserUseCase,
    sut,
  };
}
