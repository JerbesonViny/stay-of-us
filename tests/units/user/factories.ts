import { CreateUser } from "@/domain/features";

export function makeCreateUserUseCase() {
  const createUserUseCaseSpy: CreateUser = {
    perform: jest.fn().mockResolvedValue({
      id: "Mocked id",
    }),
  };

  return createUserUseCaseSpy;
}
