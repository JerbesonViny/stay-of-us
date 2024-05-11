export namespace CreateUserValidator {
  export type Input = {
    login: string;
  };

  export type CheckUserExistsInput = {
    login: string;
  };
}

export interface CreateUserValidator {
  validate(input: CreateUserValidator.Input): Promise<void>;
}
