import { buildSchemaSync } from "type-graphql";

export const schema = buildSchemaSync({
  resolvers: [__dirname + "/**/*.resolver.{ts,js}"],
  emitSchemaFile: true,
  nullableByDefault: true,
  validate: false,
});
