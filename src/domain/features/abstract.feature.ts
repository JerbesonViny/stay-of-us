export abstract class Feature<Input, Output> {
  abstract perform(input: Input): Output;
}
