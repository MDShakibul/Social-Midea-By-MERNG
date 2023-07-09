const { ApolloServer } = require("apollo-server");

const mongoose = require("mongoose");


const { MONGODB } = require("./config");

const {typeDefs} = require ("./graphql/typeDefs.js")
const {resolvers} = require ("./graphql/resolvers/index.resolvers.js")





const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => ({ req }) });

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("Mongodb connected");
    return server.listen({ port: 4000 });
  })
  .then((res) => {
    console.log(`YOUR API IS RUNNING: ${res.url}`);
  });
