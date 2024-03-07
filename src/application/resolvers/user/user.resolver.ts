import { Query, Resolver } from "type-graphql";
import { User } from "@/application/resolvers/user/types";

const mockedUsers = [{ id: 1, name: "Jerbeson" }];

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User])
  async users() {
    return mockedUsers;
  }
}
