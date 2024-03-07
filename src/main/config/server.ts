import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { schema } from "@/application/schema";

const app = Express();

const server = new ApolloServer({
  schema,
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
