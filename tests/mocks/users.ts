import { CreateUserUseCase } from "@/domain/features";
import { FindUsersRepository } from "@/domain/contracts/repositories";

export const mockedUser: CreateUserUseCase.Input = {
  name: "Mocked name",
  login: "Mocked login",
  password: "Mocked password",
  confirmPassword: "Mocked password",
};

export const mockedUsers: FindUsersRepository.Output = [
  {
    id: "65efab5cab6cb78fea15ee19",
    name: "Sophie",
  },
  {
    id: "65efab838015c2e136c3cb11",
    name: "Morris",
  },
];
