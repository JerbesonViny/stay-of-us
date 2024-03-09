import "reflect-metadata";
import "../../../src/main/config/module-alias";
import dotenv from "dotenv";
dotenv.config();

import { CreateUser } from "@/domain/features";
import { makeCreateUserUseCase } from "@/tests/units/user/factories";
import { UserAlreadyExists } from "@/domain/errors";

describe("CreateUserUseCase", () => {
  const userInput: CreateUser.Input = {
    name: "Mocked name",
    login: "Mocked login",
    password: "Mocked password",
    confirmPassword: "Mocked password",
  };

  let createUserUseCase: any;

  beforeAll(() => {
    createUserUseCase = makeCreateUserUseCase();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should create user with success", async () => {
    const result = await createUserUseCase.perform(userInput);

    expect(result).toEqual({
      id: "Mocked id",
    });
  });

  it("Should throw UserAlrearyExists when login already used", async () => {
    createUserUseCase.perform.mockRejectedValueOnce(new UserAlreadyExists());

    const result = createUserUseCase.perform(userInput);

    expect(result).rejects.toThrowError("User already exists");
  });
});
