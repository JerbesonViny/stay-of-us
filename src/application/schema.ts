import { buildSchemaSync } from "type-graphql";
import * as lodash from "lodash";
import { GraphQLSchema } from "graphql";

export function createSchema(): GraphQLSchema {
  return buildSchemaSync({
    resolvers: [__dirname + "/**/*.resolver.{ts,js}"],
    emitSchemaFile: true,
    nullableByDefault: true,
    validate: false,
    container: ({ context }) => {
      const { container } = context;
      for (const [key, value] of Object.entries(
        lodash.omit(context, "container")
      )) {
        container.set(key, value);
      }

      return container;
    },
  });
}
