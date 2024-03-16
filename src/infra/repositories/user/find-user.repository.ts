import { Inject, Service } from "typedi";
import {
  FindUserRepository,
  FIND_USER_REPOSITORY,
} from "@/domain/contracts/repositories";
import { MONGO_CONNECTION } from "@/main/config/constants";
import { Db, Filter } from "mongodb";

@Service(FIND_USER_REPOSITORY)
export class FindUserRepositoryImpl implements FindUserRepository {
  constructor(
    @Inject(MONGO_CONNECTION)
    private dbConnection: Db
  ) {}

  async perform(
    input: FindUserRepository.Input
  ): Promise<FindUserRepository.Output> {
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

  private getQuery(input: FindUserRepository.Input): any {
    const query: Filter<Document> = {};

    if (input.login) {
      query.login = input.login;
    }

    return query;
  }
}
