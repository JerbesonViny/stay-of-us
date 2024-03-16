export namespace FindUsersRepository {
  export type User = {
    name: string;
  };

  export type Output = {
    id: string;
    name: string;
  }[];
}

export interface FindUsersRepository {
  perform(): Promise<FindUsersRepository.Output>;
}

export const FIND_USERS_REPOSITORY = "find-users.repository";
