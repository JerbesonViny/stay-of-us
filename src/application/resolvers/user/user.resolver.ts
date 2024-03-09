import { Ctx, Query, Resolver } from "type-graphql";
import { User } from "@/application/resolvers/user/types";
import { Context } from "@/application/types";

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User])
  async users(@Ctx() { db }: Context) {
    return db.collection("users").find({}).toArray();
  }
}
