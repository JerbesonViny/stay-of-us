import { UserAccount } from "@/domain/entities";

export namespace CreateUserRepository {
  export type Input = UserAccount;

  export type Output = {
    id: string;
  };
}

export interface CreateUserRepository {
  perform(
    input: CreateUserRepository.Input
  ): Promise<CreateUserRepository.Output>;
}

export const CREATE_USER_REPOSITORY = "create-user.repository";
