import { Query, Resolver } from "type-graphql";
import { User } from "@/application/resolvers/user/types";
import { Inject, Service } from "typedi";
import { FindUsersService } from "@/application/services";

@Service()
@Resolver(() => User)
export class UserResolver {
  constructor(
    @Inject()
    private readonly findUsersService: FindUsersService
  ) {}

  @Query(() => [User])
  async users() {
    return this.findUsersService.perform();
  }
}
