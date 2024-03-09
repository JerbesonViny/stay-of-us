import { ApolloServer } from "apollo-server-express";
import { GraphQLSchema } from "graphql";
import Container from "typedi";

import { MONGO_CONNECTION, createMongoConnection } from "@/main/config";
import { createContainer } from "@/main/utils";

type CreateApolloServerInput = {
  schema: GraphQLSchema;
};

export function createApolloServer({
  schema,
}: CreateApolloServerInput): ApolloServer {
  return new ApolloServer({
    schema,
    context: async ({ req }) => {
      const { container, requestId } = createContainer();
      const dbConnection = await createMongoConnection();
      const context = { requestId, container }; // Create context

      container.set("context", context);
      container.set(MONGO_CONNECTION, dbConnection);

      return {
        requestId,
        container,
        req,
      };
    },
    plugins: [
      {
        requestDidStart: async () => ({
          async willSendResponse(requestContext) {
            // Dispose the scoped container to prevent memory leaks
            Container.reset(requestContext.context.requestId);
          },
        }),
      },
    ],
  });
}
