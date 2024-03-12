import { Inject, Service } from "typedi";
import { FindUsersUseCase } from "@/domain/features";
import { FindUsersRepository } from "@/domain/contracts/repositories";
import { FIND_USERS_REPOSITORY } from "@/infra/repositories/user/find-users.repository";

export const FIND_USERS_USE_CASE = "find-users.usecase";

@Service(FIND_USERS_USE_CASE)
export class FindUsersUseCaseImpl implements FindUsersUseCase {
  constructor(
    @Inject(FIND_USERS_REPOSITORY)
    private readonly findUsersRepository: FindUsersRepository
  ) {}

  async perform(): Promise<FindUsersUseCase.Output> {
    return this.findUsersRepository.perform();
  }
}
