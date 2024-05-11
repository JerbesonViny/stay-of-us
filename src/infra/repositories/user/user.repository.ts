import { Inject, Service } from "typedi";
import {
  FindUsers,
  CreateUser,
  FindOneUser,
} from "@/domain/contracts/repositories";
import { MONGO_CONNECTION } from "@/main/config/constants";
import { Db, Filter } from "mongodb";

export const USER_REPOSITORY = "user.repository";

@Service(USER_REPOSITORY)
export class UserRepository implements FindUsers, FindOneUser, CreateUser {
  constructor(
    @Inject(MONGO_CONNECTION)
    private dbConnection: Db
  ) {}

  async find(): Promise<FindUsers.Output> {
    const users = await this.dbConnection
      .collection<FindUsers.User>("users")
      .find()
      .toArray();

    return users?.map((user) => {
      return {
        id: user?._id.toString(),
        name: user?.name,
      };
    });
  }

  async create(userAccount: CreateUser.Input): Promise<CreateUser.Output> {
    const users = await this.dbConnection.collection("users").insertOne({
      _id: userAccount.id,
      name: userAccount.name,
      login: userAccount.login,
      password: userAccount.getPassword(),
    });

    return {
      id: users.insertedId.toString(),
    };
  }

  async findOne(input: FindOneUser.Input): Promise<FindOneUser.Output> {
    const query = this.getQuery(input);

    const user = await this.dbConnection.collection("users").findOne(query);

    if (user) {
      return {
        id: user._id.toString(),
        name: user.name,
        login: user.login,
        password: user.password,
      };
    }
  }

  private getQuery(input: FindOneUser.Input): any {
    const query: Filter<Document> = {};

    if (input.login) {
      query.login = input.login;
    }

    return query;
  }
}
