export namespace FindUserRepository {
  export type Input = {
    login?: string;
  };

  export type Output = {
    id: string;
    name: string;
    login: string;
    password: string;
  } | void;
}

export interface FindUserRepository {
  perform(input: FindUserRepository.Input): Promise<FindUserRepository.Output>;
}

export const FIND_USER_REPOSITORY = "find-user.repository";
