import { Inject, Service } from "typedi";
import { CreateUserUseCase, CREATE_USER_USE_CASE } from "@/domain/features";
import { CreateUser } from "@/domain/contracts/repositories";
import {
  CreateHashService,
  CreateUserValidatorService,
} from "@/domain/services";
import { UserAccount } from "@/domain/entities";
import { USER_REPOSITORY } from "@/infra/repositories";
import {
  CREATE_HASH_SERVICE,
  CREATE_USER_VALIDATOR_SERVICE,
} from "@/application/services";

@Service(CREATE_USER_USE_CASE)
export class CreateUserUseCaseImpl implements CreateUserUseCase {
  constructor(
    @Inject(CREATE_HASH_SERVICE)
    private readonly createHashService: CreateHashService,
    @Inject(CREATE_USER_VALIDATOR_SERVICE)
    private createUserValidatorService: CreateUserValidatorService,
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
      const passwordHashed = this.createHashService.perform({ text: password });

      userAccount.setPassword({ password: passwordHashed });

      return this.userRepository.create(userAccount);
    }
  }
}
