import { Inject, Service } from "typedi";
import { FindUsersUseCase } from "@/domain/features";
import { FindUsers } from "@/domain/contracts/repositories";
import { USER_REPOSITORY } from "@/infra/repositories";

export const FIND_USERS_USE_CASE = "find-users.usecase";

@Service(FIND_USERS_USE_CASE)
export class FindUsersUseCaseImpl implements FindUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: FindUsers
  ) {}

  async perform(): Promise<FindUsersUseCase.Output> {
    return this.userRepository.find();
  }
}
