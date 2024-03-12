import { CreateUserUseCase } from "@/domain/features";

export const userInput: CreateUserUseCase.Input = {
  name: "Mocked name",
  login: "Mocked login",
  password: "Mocked password",
  confirmPassword: "Mocked password",
};
