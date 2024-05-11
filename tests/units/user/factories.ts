import { UserResolver } from "@/application/resolvers";
import { CreateUserUseCase, FindUsersUseCase } from "@/application/usecases";
import {
  CreateHashService,
  CreateUserValidatorService,
} from "@/application/services";
import {
  CreateUser,
  FindOneUser,
  FindUsers,
} from "@/domain/contracts/repositories";
import { mockedUsers } from "@/tests/mocks";
import { Usecase } from "@/@shared/abstract.usecase";

export function makeCreateUserUseCase(): Usecase<
  CreateUserUseCase.Input,
  CreateUserUseCase.Output
> {
  return {
    perform: jest.fn().mockResolvedValue({
      id: "Mocked id",
    }),
  };
}

export function makeUserResolver() {
  const userRepository: CreateUser & FindOneUser & FindUsers = {
    findOne: jest.fn().mockResolvedValue(null),
    find: jest.fn().mockResolvedValue(mockedUsers),
    create: jest.fn().mockResolvedValue({ id: "Mocked id" }),
  };

  const createHashService = new CreateHashService();
  const createUserValidatorService = new CreateUserValidatorService(
    userRepository
  );

  const findUsersUseCase = new FindUsersUseCase.UseCase(userRepository);
  const createUserUseCase = new CreateUserUseCase.UseCase(
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
