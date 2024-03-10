import { ICreateUserRepository } from "@/domain/contracts/repositories";
import { Inject, Service } from "typedi";
import { MONGO_CONNECTION } from "@/main/config/constants";
import { Db } from "mongodb";

export const CREATE_USER_REPOSITORY = "create-user.repository";

@Service(CREATE_USER_REPOSITORY)
export class CreateUserRepository implements ICreateUserRepository {
  constructor(
    @Inject(MONGO_CONNECTION)
    private mongoConnection: Db
  ) {}

  async perform({
    name,
    login,
    password,
    confirmPassword,
  }: ICreateUserRepository.Input): Promise<ICreateUserRepository.Output> {
    const users = await this.mongoConnection.collection("users").insertOne({
      name,
      login,
      password,
      confirmPassword,
    });

    return {
      id: users.insertedId.toString(),
    };
  }
}
