const { ApolloServer, gql } = require("apollo-server");

const mongoose = require("mongoose");

const { MONGODB } = require("./config");

const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`;

const resolvers = {
  Query: {
    sayHi: () => {
      return "Hello word!";
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('Mongodb connected')
    return server.listen({ port: 4000 });
  })
  .then((res) => {
    console.log(`YOUR API IS RUNNING: ${res.url}`);
  });
