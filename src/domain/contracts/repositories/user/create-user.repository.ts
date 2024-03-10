export namespace ICreateUserRepository {
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

export interface ICreateUserRepository {
  perform(
    input: ICreateUserRepository.Input
  ): Promise<ICreateUserRepository.Output>;
}
