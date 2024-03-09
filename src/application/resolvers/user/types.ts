import { ArgsType, Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field()
  name: string;
}

@InputType()
export class UserInput {
  @Field()
  name: string;

  @Field()
  login: string;

  @Field()
  password: string;

  @Field()
  confirmPassword: string;
}
