export namespace CreateHashService {
  export type Input = {
    text: string;
  };
}

export interface CreateHashService {
  perform(input: CreateHashService.Input): string;
}
