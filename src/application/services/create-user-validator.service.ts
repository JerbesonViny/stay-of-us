import { Inject, Service } from "typedi";
import { CreateUserValidator } from "@/domain/services";
import { FindOneUser } from "@/domain/contracts/repositories";
import { USER_REPOSITORY } from "@/infra/repositories";
import { UserAlreadyExists } from "@/domain/errors";

export const CREATE_USER_VALIDATOR_SERVICE = "create-user-validator.service";

@Service(CREATE_USER_VALIDATOR_SERVICE)
export class CreateUserValidatorService implements CreateUserValidator {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: FindOneUser
  ) {}

  async validate(input: CreateUserValidator.Input) {
    await this.checkUserExists(input);
  }

  private async checkUserExists({
    login,
  }: CreateUserValidator.CheckUserExistsInput): Promise<void> {
    const user = await this.userRepository.findOne({ login });

    if (user) {
      throw new UserAlreadyExists();
    }
  }
}
