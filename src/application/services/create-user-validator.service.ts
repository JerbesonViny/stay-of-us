import { Inject, Service } from "typedi";
import {
  CREATE_USER_VALIDATOR_SERVICE,
  CreateUserValidatorService,
} from "@/domain/services";
import {
  FIND_USER_REPOSITORY,
  FindUserRepository,
} from "@/domain/contracts/repositories";
import { UserAlreadyExists } from "@/domain/errors";

@Service(CREATE_USER_VALIDATOR_SERVICE)
export class CreateUserValidatorServiceImpl
  implements CreateUserValidatorService
{
  constructor(
    @Inject(FIND_USER_REPOSITORY)
    private findUserRepository: FindUserRepository
  ) {}

  async validate(input: CreateUserValidatorService.Input): Promise<boolean> {
    this.checkUserExists(input);

    return true;
  }

  private async checkUserExists({
    login,
  }: CreateUserValidatorService.CheckUserExistsInput): Promise<boolean> {
    const user = await this.findUserRepository.perform({ login });

    if (user) {
      throw new UserAlreadyExists();
    }

    return true;
  }
}
