export namespace CreateUserValidatorService {
  export type Input = {
    name: string;
    login: string;
    password: string;
    confirmPassword: string;
  };

  export type ValidatePasswordInput = {
    password: string;
    confirmPassword: string;
  };

  export type CheckUserExistsInput = {
    login: string;
  };
}

export interface CreateUserValidatorService {
  validate(input: CreateUserValidatorService.Input): Promise<boolean>;
}

export const CREATE_USER_VALIDATOR_SERVICE = "create-user-validator.service";
