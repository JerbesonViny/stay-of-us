import { Db } from "mongodb";
import { Inject, Service } from "typedi";

export namespace FindUsersService {
  type User = {
    name: string;
  };

  export type Output = User[];
}

@Service()
export class FindUsersService {
  constructor(
    @Inject("dbConnection")
    private readonly dbConnection: Db
  ) {}

  perform() {
    return this.dbConnection.collection("users").find().toArray();
  }
}
