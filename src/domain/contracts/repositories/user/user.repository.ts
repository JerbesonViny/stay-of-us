import { UserAccount } from "@/domain/entities";

export namespace FindUsers {
  export type User = {
    name: string;
  };

  export type Output = {
    id: string;
    name: string;
  }[];
}

export interface FindUsers {
  find(): Promise<FindUsers.Output>;
}

export namespace FindOneUser {
  export type Input = {
    login?: string;
  };

  export type Output = {
    id: string;
    name: string;
    login: string;
    password: string;
  } | void;
}

export interface FindOneUser {
  findOne(input: FindOneUser.Input): Promise<FindOneUser.Output>;
}

export namespace CreateUser {
  export type Input = UserAccount;

  export type Output = {
    id: string;
  };
}

export interface CreateUser {
  create(input: CreateUser.Input): Promise<CreateUser.Output>;
}
