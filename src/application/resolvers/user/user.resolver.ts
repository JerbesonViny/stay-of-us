import { Mutation, Query, Resolver, Arg } from "type-graphql";
import {
  User,
  CreateUserInput,
  CreateUserOutput,
} from "@/application/resolvers/user/types";
import { Inject, Service } from "typedi";
import {
  FindUsersUseCase,
  CreateUserUseCase,
  CREATE_USER_USE_CASE,
} from "@/domain/features";
import { FIND_USERS_USE_CASE } from "@/application/usecases";

@Service()
@Resolver()
export class UserResolver {
  constructor(
    @Inject(FIND_USERS_USE_CASE)
    private readonly findUsersService: FindUsersUseCase,
    @Inject(CREATE_USER_USE_CASE)
    private readonly createUserUseCase: CreateUserUseCase
  ) {}

  @Query(() => [User])
  async users() {
    return this.findUsersService.perform();
  }

  @Mutation(() => CreateUserOutput)
  async createUser(@Arg("input") user: CreateUserInput) {
    return this.createUserUseCase.perform(user);
  }
}
