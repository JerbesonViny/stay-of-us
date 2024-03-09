import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { schema } from "@/application/schema";
import { connection } from "@/database/connection";

const app = Express();

const server = new ApolloServer({
  schema,
  context: async ({ req, res }) => ({
    db: await connection,
  }),
});

async function startServer(server: ApolloServer) {
  await server.start();

  server.applyMiddleware({
    app,
    path: "*",
  });
}

startServer(server);

app.listen(4000, () => {
  console.log("Server running at http://localhost:4000");
});
