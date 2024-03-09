import Container, { ContainerInstance } from "typedi";
import { v4 } from "uuid";

type CreateContainerOutput = {
  container: ContainerInstance;
  requestId: string;
};

export function createContainer(): CreateContainerOutput {
  const requestId = v4();
  const container = Container.of(requestId); // Get scoped container

  return {
    container,
    requestId,
  };
}
