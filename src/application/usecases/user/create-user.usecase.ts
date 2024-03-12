import { Inject, Service } from "typedi";
import { CreateUserUseCase } from "@/domain/features";
import { CreateUserRepository } from "@/domain/contracts/repositories";
import { CREATE_USER_REPOSITORY } from "@/infra/repositories";

export const CREATE_USER_USE_CASE = "create-user.usecase";

@Service(CREATE_USER_USE_CASE)
export class CreateUserUseCaseImpl implements CreateUserUseCase {
  constructor(
    @Inject(CREATE_USER_REPOSITORY)
    private createUserRepository: CreateUserRepository
  ) {}

  async perform(
    input: CreateUserUseCase.Input
  ): Promise<CreateUserUseCase.Output> {
    const { id } = await this.createUserRepository.perform(input);

    return {
      id,
    };
  }
}
