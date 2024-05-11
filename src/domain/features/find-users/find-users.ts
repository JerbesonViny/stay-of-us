import { Feature } from "@/domain/features/abstract.feature";

export namespace FindUsersUseCase {
  type User = {
    id: string;
    name: string;
  };

  export type Output = User[];
}

export interface FindUsersUseCase
  extends Feature<void, Promise<FindUsersUseCase.Output>> {}
