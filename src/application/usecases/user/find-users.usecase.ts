import { Inject, Service } from "typedi";

import { FindUsers } from "@/domain/contracts/repositories";
import { USER_REPOSITORY } from "@/infra/repositories";
import { Usecase } from "@/@shared/abstract.usecase";

export namespace FindUsersUseCase {
  type User = {
    id: string;
    name: string;
  };

  export type Output = User[];

  @Service()
  export class UseCase implements Usecase<void, Output> {
    constructor(
      @Inject(USER_REPOSITORY)
      private readonly userRepository: FindUsers
    ) {}

    async perform(): Promise<FindUsersUseCase.Output> {
      return this.userRepository.find();
    }
  }
}
