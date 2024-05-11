import { Inject, Service } from "typedi";
import { CreateUserValidatorService } from "@/domain/services";
import { FindOneUser } from "@/domain/contracts/repositories";
import { USER_REPOSITORY } from "@/infra/repositories";
import { UserAlreadyExists } from "@/domain/errors";

export const CREATE_USER_VALIDATOR_SERVICE = "create-user-validator.service";

@Service(CREATE_USER_VALIDATOR_SERVICE)
export class CreateUserValidatorServiceImpl
  implements CreateUserValidatorService
{
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: FindOneUser
  ) {}

  async validate(input: CreateUserValidatorService.Input) {
    await this.checkUserExists(input);
  }

  private async checkUserExists({
    login,
  }: CreateUserValidatorService.CheckUserExistsInput): Promise<void> {
    const user = await this.userRepository.findOne({ login });

    if (user) {
      throw new UserAlreadyExists();
    }
  }
}
