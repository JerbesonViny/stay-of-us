import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field()
  name: string;
}

@ObjectType()
export class CreateUserOutput {
  @Field(() => ID)
  id: string;
}

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  login: string;

  @Field()
  password: string;

  @Field()
  confirmPassword: string;
}
