import "reflect-metadata";
import "../../../src/main/config/module-alias";
import dotenv from "dotenv";
dotenv.config();

import { UserResolver } from "@/application/resolvers";
import { makeCreateUserResolver } from "@/tests/units/user/factories";
import { userInput } from "@/tests/units/user/mocks";

describe("CreateUserResolver", () => {
  let resolver: UserResolver;

  beforeAll(() => {
    resolver = makeCreateUserResolver();
  });

  it("Should create user", async () => {
    const response = resolver.createUser(userInput);

    expect(response).resolves.toEqual({
      id: "Mocked id",
    });
  });
});
