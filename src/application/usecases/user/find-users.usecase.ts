import { Inject, Service } from "typedi";
import { FindUsersUseCase, FIND_USERS_USE_CASE } from "@/domain/features";
import {
  FindUsersRepository,
  FIND_USERS_REPOSITORY,
} from "@/domain/contracts/repositories";

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
