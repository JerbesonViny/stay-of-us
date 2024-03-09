import { Feature } from "@/domain/features/abstract.feature";

export namespace CreateUser {
  export type Input = {
    name: string;
    login: string;
    password: string;
    confirmPassword: string;
  };

  export type Output = {
    id: string;
  };
}

export interface CreateUser
  extends Feature<CreateUser.Input, Promise<CreateUser.Output>> {}
