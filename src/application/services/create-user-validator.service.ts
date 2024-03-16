import { Inject, Service } from "typedi";
import {
  CREATE_USER_VALIDATOR_SERVICE,
  CreateUserValidatorService,
} from "@/domain/services";
import {
  FIND_USER_REPOSITORY,
  FindUserRepository,
} from "@/domain/contracts/repositories";
import {
  UserAlreadyExists,
  PasswordDoesNotMatchConfirmPasswordError,
} from "@/domain/errors";

@Service(CREATE_USER_VALIDATOR_SERVICE)
export class CreateUserValidatorServiceImpl
  implements CreateUserValidatorService
{
  constructor(
    @Inject(FIND_USER_REPOSITORY)
    private findUserRepository: FindUserRepository
  ) {}

  async validate(input: CreateUserValidatorService.Input): Promise<boolean> {
    this.validatePassword(input);
    this.checkUserExists(input);

    return true;
  }

  private validatePassword({
    password,
    confirmPassword,
  }: CreateUserValidatorService.ValidatePasswordInput): boolean {
    if (password !== confirmPassword) {
      throw new PasswordDoesNotMatchConfirmPasswordError();
    }

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
