import { buildSchemaSync, ResolverData } from "type-graphql";
import * as _ from "lodash";
import { GraphQLSchema } from "graphql";
import { resolve } from "path";
import { Context } from "vm";

export function createSchema(): GraphQLSchema {
  return buildSchemaSync({
    resolvers: [resolve("dist/application") + "/**/*.resolver.{ts,js}"],
    emitSchemaFile: true,
    nullableByDefault: true,
    validate: false,
    container: ({ context }: ResolverData<Context>) => {
      const { container } = context;

      for (const [key, value] of Object.entries(_.omit(context, "container"))) {
        container.set(key, value);
      }

      return container;
    },
  });
}
