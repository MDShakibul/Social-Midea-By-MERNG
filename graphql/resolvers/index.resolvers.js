const {postsResolvers }= require('./posts.resolvers');
const {usersResolvers} = require('./users.resolvers');

const resolvers = {
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
  },
};

module.exports = {
  resolvers,
}; 



