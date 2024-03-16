import { Inject, Service } from "typedi";
import {
  FindUsersRepository,
  FIND_USERS_REPOSITORY,
} from "@/domain/contracts/repositories";
import { MONGO_CONNECTION } from "@/main/config/constants";
import { Db } from "mongodb";

@Service(FIND_USERS_REPOSITORY)
export class FindUsersRepositoryImpl implements FindUsersRepository {
  constructor(
    @Inject(MONGO_CONNECTION)
    private dbConnection: Db
  ) {}

  async perform(): Promise<FindUsersRepository.Output> {
    const users = await this.dbConnection
      .collection<FindUsersRepository.User>("users")
      .find()
      .toArray();

    return users?.map((user) => {
      return {
        id: user?._id.toString(),
        name: user?.name,
      };
    });
  }
}
