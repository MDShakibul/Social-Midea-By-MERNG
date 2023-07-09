const {postsResolvers }= require('./posts.resolvers');
const {usersResolvers} = require('./users.resolvers');
const {commentsResolvers} = require('./comments.resolvers');

const resolvers = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length
  },
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
  Subscription: {
    ...postsResolvers.Subscription
  }
};

module.exports = {
  resolvers,
}; 



