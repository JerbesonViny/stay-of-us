export namespace CreateHash {
  export type Input = {
    text: string;
  };
}

export interface CreateHash {
  perform(input: CreateHash.Input): string;
}
