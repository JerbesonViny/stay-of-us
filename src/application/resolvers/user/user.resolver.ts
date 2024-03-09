import { ID, Mutation, Query, Resolver, Arg } from "type-graphql";
import { User, UserInput } from "@/application/resolvers/user/types";
import { Inject, Service } from "typedi";
import { FindUsersService } from "@/application/services";
import { CreateUser } from "@/domain/features";

@Service()
@Resolver(() => User)
export class UserResolver {
  constructor(
    @Inject()
    private readonly findUsersService: FindUsersService,
    private readonly createUserUseCase: CreateUser
  ) {}

  @Query(() => [User])
  async users() {
    return this.findUsersService.perform();
  }

  @Mutation(() => ID)
  async createUser(@Arg("input") user: UserInput) {
    return this.createUserUseCase.perform(user);
  }
}
