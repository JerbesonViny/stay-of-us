export namespace CreateUserValidatorService {
  export type Input = {
    login: string;
  };

  export type CheckUserExistsInput = {
    login: string;
  };
}

export interface CreateUserValidatorService {
  validate(input: CreateUserValidatorService.Input): Promise<void>;
}
