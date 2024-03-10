import { ICreateUserUseCase } from "@/domain/features";

export const userInput: ICreateUserUseCase.Input = {
  name: "Mocked name",
  login: "Mocked login",
  password: "Mocked password",
  confirmPassword: "Mocked password",
};
