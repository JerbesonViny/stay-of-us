export abstract class Usecase<Input, Output> {
  abstract perform(input: Input): Output | Promise<Output>;
}
