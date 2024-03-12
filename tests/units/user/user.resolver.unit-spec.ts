import "reflect-metadata";
import "../../../src/main/config/module-alias";
import dotenv from "dotenv";
dotenv.config();

import { UserResolver } from "@/application/resolvers";
import { makeUserResolver } from "@/tests/units/user/factories";
import { mockedUser, mockedUsers } from "@/tests/mocks";

describe("CreateUserResolver", () => {
  let resolver: UserResolver;

  beforeAll(() => {
    const { sut } = makeUserResolver();

    resolver = sut;
  });

  it("Should create user", async () => {
    const response = resolver.createUser(mockedUser);

    expect(response).resolves.toEqual({
      id: "Mocked id",
    });
  });

  it("Should find all users", async () => {
    const users = resolver.users();

    expect(users).resolves.toEqual(mockedUsers);
  });
});
