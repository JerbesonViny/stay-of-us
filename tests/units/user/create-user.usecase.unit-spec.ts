import "reflect-metadata";
import "../../../src/main/config/module-alias";
import dotenv from "dotenv";
dotenv.config();

import { makeCreateUserUseCase } from "@/tests/units/user/factories";
import { UserAlreadyExists } from "@/domain/errors";
import { userInput } from "@/tests/units/user/mocks";

describe("CreateUserUseCase", () => {
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
