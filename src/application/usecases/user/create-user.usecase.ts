import { Inject, Service } from "typedi";
import { ICreateUserUseCase } from "@/domain/features";
import { ICreateUserRepository } from "@/domain/contracts/repositories";
import { CREATE_USER_REPOSITORY } from "@/infra/repositories";

export const CREATE_USER_USE_CASE = "create-user.usecase";

@Service(CREATE_USER_USE_CASE)
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @Inject(CREATE_USER_REPOSITORY)
    private createUserRepository: ICreateUserRepository
  ) {}

  async perform(
    input: ICreateUserUseCase.Input
  ): Promise<ICreateUserUseCase.Output> {
    const { id } = await this.createUserRepository.perform(input);

    return {
      id,
    };
  }
}
