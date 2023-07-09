const { ApolloServer } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");

const mongoose = require("mongoose");

const { MONGODB } = require("./config");

const { typeDefs } = require("./graphql/typeDefs.js");
const { resolvers } = require("./graphql/resolvers/index.resolvers.js");

const pubsub = new PubSub();

const PORT = 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("Mongodb connected");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`YOUR API IS RUNNING: ${res.url}`);
  });
