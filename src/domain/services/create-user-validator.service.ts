export namespace CreateUserValidatorService {
  export type Input = {
    login: string;
  };

  export type CheckUserExistsInput = {
    login: string;
  };
}

export interface CreateUserValidatorService {
  validate(input: CreateUserValidatorService.Input): Promise<boolean>;
}

export const CREATE_USER_VALIDATOR_SERVICE = "create-user-validator.service";
