import { ICreateUserUseCase } from "@/domain/features";
import { UserResolver } from "@/application/resolvers";
import { CreateUserUseCase } from "@/application/usecases";
import { ICreateUserRepository } from "@/domain/contracts/repositories";

export function makeCreateUserUseCase() {
  const createUserUseCaseSpy: ICreateUserUseCase = {
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
  const createUserRepository: ICreateUserRepository = {
    perform: jest.fn().mockResolvedValue({ id: "Mocked id" }),
  };

  const createUserUseCase = new CreateUserUseCase(createUserRepository);

  return new UserResolver(findUsersService as any, createUserUseCase);
}
