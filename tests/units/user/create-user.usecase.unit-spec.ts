import "reflect-metadata";
import "../../../src/main/config/module-alias";
import dotenv from "dotenv";
dotenv.config();

import { makeCreateUserUseCase } from "@/tests/units/user/factories";
import {
  PasswordDoesNotMatchConfirmPasswordError,
  UserAlreadyExists,
} from "@/domain/errors";
import { mockedUser } from "@/tests/mocks";

describe("CreateUserUseCase", () => {
  let createUserUseCase: any;

  beforeAll(() => {
    createUserUseCase = makeCreateUserUseCase();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should create user with success", async () => {
    const result = await createUserUseCase.perform(mockedUser);

    expect(result).toEqual({
      id: "Mocked id",
    });
  });

  it("Should throw UserAlrearyExists when login already used", async () => {
    createUserUseCase.perform.mockRejectedValueOnce(new UserAlreadyExists());

    const result = createUserUseCase.perform(mockedUser);

    expect(result).rejects.toThrowError("User already exists");
  });

  it("Should throw PasswordDoesNotMatchConfirmPasswordError when password does not match with confirm password", async () => {
    createUserUseCase.perform.mockRejectedValueOnce(
      new PasswordDoesNotMatchConfirmPasswordError()
    );

    const result = createUserUseCase.perform(mockedUser);

    expect(result).rejects.toThrowError(
      "Password does not match with confirm password"
    );
  });
});
