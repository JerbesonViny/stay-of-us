import { Inject, Service } from "typedi";
import { CreateUser } from "@/domain/contracts/repositories";
import { CreateHash, CreateUserValidator } from "@/domain/services";
import { UserAccount } from "@/domain/entities";
import { USER_REPOSITORY } from "@/infra/repositories";
import {
  CREATE_HASH_SERVICE,
  CREATE_USER_VALIDATOR_SERVICE,
} from "@/application/services";
import { Usecase } from "@/@shared/abstract.usecase";

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

  @Service()
  export class UseCase implements Usecase<Input, Output> {
    constructor(
      @Inject(CREATE_HASH_SERVICE)
      private readonly createHashService: CreateHash,
      @Inject(CREATE_USER_VALIDATOR_SERVICE)
      private createUserValidatorService: CreateUserValidator,
      @Inject(USER_REPOSITORY)
      private userRepository: CreateUser
    ) {}

    async perform({
      name,
      login,
      password,
      confirmPassword,
    }: CreateUserUseCase.Input): Promise<CreateUserUseCase.Output> {
      await this.createUserValidatorService.validate({
        login,
      });

      const userAccount = new UserAccount({ name, login, password });
      if (userAccount.validateCreateUser({ confirmPassword })) {
        const passwordHashed = this.createHashService.perform({
          text: password,
        });

        userAccount.setPassword({ password: passwordHashed });

        return this.userRepository.create(userAccount);
      }
    }
  }
}
