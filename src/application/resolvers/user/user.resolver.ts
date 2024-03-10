import { Mutation, Query, Resolver, Arg } from "type-graphql";
import {
  User,
  CreateUserInput,
  CreateUserOutput,
} from "@/application/resolvers/user/types";
import { Inject, Service } from "typedi";
import { FindUsersService } from "@/application/services";
import { ICreateUserUseCase } from "@/domain/features";
import { CREATE_USER_USE_CASE } from "@/application/usecases";

@Service()
@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly findUsersService: FindUsersService,
    @Inject(CREATE_USER_USE_CASE)
    private readonly createUserUseCase: ICreateUserUseCase
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
