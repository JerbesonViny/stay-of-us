import { Feature } from "@/domain/features/abstract.feature";

export namespace ICreateUserUseCase {
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

export interface ICreateUserUseCase
  extends Feature<
    ICreateUserUseCase.Input,
    Promise<ICreateUserUseCase.Output>
  > {}
