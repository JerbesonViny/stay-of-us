export namespace CreateUserRepository {
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

export interface CreateUserRepository {
  perform(
    input: CreateUserRepository.Input
  ): Promise<CreateUserRepository.Output>;
}
