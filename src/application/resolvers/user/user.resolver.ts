import { Mutation, Query, Resolver, Arg } from "type-graphql";
import {
  User,
  CreateUserInput,
  CreateUserOutput,
} from "@/application/resolvers/user/types";
import { Inject, Service } from "typedi";

import { CreateUserUseCase, FindUsersUseCase } from "@/application/usecases";

@Service()
@Resolver()
export class UserResolver {
  constructor(
    private readonly findUsersService: FindUsersUseCase.UseCase,
    private readonly createUserUseCase: CreateUserUseCase.UseCase
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
