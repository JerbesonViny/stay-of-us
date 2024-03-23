import {
  CreateUserRepository,
  CREATE_USER_REPOSITORY,
} from "@/domain/contracts/repositories";
import { Inject, Service } from "typedi";
import { MONGO_CONNECTION } from "@/main/config/constants";
import { Db } from "mongodb";

@Service(CREATE_USER_REPOSITORY)
export class CreateUserRepositoryImpl implements CreateUserRepository {
  constructor(
    @Inject(MONGO_CONNECTION)
    private mongoConnection: Db
  ) {}

  async perform(
    userAccount: CreateUserRepository.Input
  ): Promise<CreateUserRepository.Output> {
    const users = await this.mongoConnection.collection("users").insertOne({
      _id: userAccount.id,
      name: userAccount.name,
      login: userAccount.login,
      password: userAccount.getPassword(),
    });

    return {
      id: users.insertedId.toString(),
    };
  }
}
