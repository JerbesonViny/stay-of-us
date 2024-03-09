import { ApolloServer } from "apollo-server-express";
import express from "express";

import { createSchema } from "@/application/schema";
import { createApolloServer } from "@/main/config";

const app = express();
const schema = createSchema();
const apolloServer = createApolloServer({
  schema,
});

async function startServer(server: ApolloServer) {
  await server.start();

  server.applyMiddleware({
    app,
    path: "*",
  });
}

startServer(apolloServer);

app.listen(4000, () => {
  console.log("Server running at http://localhost:4000");
});
