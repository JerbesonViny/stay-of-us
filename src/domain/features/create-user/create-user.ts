import { Feature } from "@/domain/features/abstract.feature";

export namespace CreateUserUseCase {
  export type Input = {
    name: string;
    login: string;
    password: string;
    confirmPassword: string;
  };

  export type Output = {
    id: string;
  } | void;
}

export interface CreateUserUseCase
  extends Feature<CreateUserUseCase.Input, Promise<CreateUserUseCase.Output>> {}

export const CREATE_USER_USE_CASE = "create-user.usecase";
