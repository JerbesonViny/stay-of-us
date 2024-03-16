import { Inject, Service } from "typedi";
import { CreateUserUseCase } from "@/domain/features";
import { CreateUserRepository } from "@/domain/contracts/repositories";
import { CREATE_USER_REPOSITORY } from "@/infra/repositories";
import { CREATE_HASH_SERVICE } from "@/application/services";
import { CreateHashService } from "@/domain/services";

export const CREATE_USER_USE_CASE = "create-user.usecase";

@Service(CREATE_USER_USE_CASE)
export class CreateUserUseCaseImpl implements CreateUserUseCase {
  constructor(
    @Inject(CREATE_HASH_SERVICE)
    private readonly createHashService: CreateHashService,
    @Inject(CREATE_USER_REPOSITORY)
    private createUserRepository: CreateUserRepository
  ) {}

  async perform({
    name,
    login,
    password,
  }: CreateUserUseCase.Input): Promise<CreateUserUseCase.Output> {
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
