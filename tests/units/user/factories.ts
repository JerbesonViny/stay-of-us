import { CreateUserUseCase } from "@/domain/features";
import { UserResolver } from "@/application/resolvers";
import { CreateUserUseCaseImpl } from "@/application/usecases";
import { CreateUserRepository } from "@/domain/contracts/repositories";

export function makeCreateUserUseCase() {
  const createUserUseCaseSpy: CreateUserUseCase = {
    perform: jest.fn().mockResolvedValue({
      id: "Mocked id",
    }),
  };

  return createUserUseCaseSpy;
}

export function makeCreateUserResolver() {
  const findUsersService = {
    perform: jest.fn(),
  };
  const createUserRepository: CreateUserRepository = {
    perform: jest.fn().mockResolvedValue({ id: "Mocked id" }),
  };

  const createUserUseCase = new CreateUserUseCaseImpl(createUserRepository);

  return new UserResolver(findUsersService as any, createUserUseCase);
}
