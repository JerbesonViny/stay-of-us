import { Service } from "typedi";
import { CreateUser } from "@/domain/features";
import { CreateUserRepository } from "@/domain/contracts/repositories";

@Service()
export class CreateUserUseCase implements CreateUser {
  constructor(private createUserRepository: CreateUserRepository) {}

  async perform(input: CreateUser.Input): Promise<CreateUser.Output> {
    const { id } = await this.createUserRepository.perform(input);

    return {
      id,
    };
  }
}
