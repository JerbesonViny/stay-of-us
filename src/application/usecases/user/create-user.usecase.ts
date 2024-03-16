import { Inject, Service } from "typedi";
import { CreateUserUseCase, CREATE_USER_USE_CASE } from "@/domain/features";
import {
  CreateUserRepository,
  CREATE_USER_REPOSITORY,
} from "@/domain/contracts/repositories";
import {
  CreateHashService,
  CreateUserValidatorService,
  CREATE_USER_VALIDATOR_SERVICE,
  CREATE_HASH_SERVICE,
} from "@/domain/services";

@Service(CREATE_USER_USE_CASE)
export class CreateUserUseCaseImpl implements CreateUserUseCase {
  constructor(
    @Inject(CREATE_HASH_SERVICE)
    private readonly createHashService: CreateHashService,
    @Inject(CREATE_USER_VALIDATOR_SERVICE)
    private createUserValidatorService: CreateUserValidatorService,
    @Inject(CREATE_USER_REPOSITORY)
    private createUserRepository: CreateUserRepository
  ) {}

  async perform({
    name,
    login,
    password,
    confirmPassword,
  }: CreateUserUseCase.Input): Promise<CreateUserUseCase.Output> {
    this.createUserValidatorService.validate({
      name,
      login,
      password,
      confirmPassword,
    });

    const passwordHashed = this.createHashService.perform({ text: password });
    const { id } = await this.createUserRepository.perform({
      name,
      login,
      password: passwordHashed,
    });

    return {
      id,
    };
  }
}
