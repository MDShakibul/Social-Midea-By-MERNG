const { UserInputError, AuthenticationError } = require("apollo-server");
const checkAuth = require("../../utils/check-auth");
const Post = require("../../models/Post");

const commentsResolvers = {
  Mutation: {
    async createComment(_, { postId, body }, context) {
      const { username } = checkAuth(context);

      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment body must not be empty",
          },
        });
      }

      try {
        const post = await Post.findById(postId);
        console.log(post);
        if (!post) {
          throw new UserInputError("Post not found");
        }

        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });

        await post.save();

        return post;
      } catch (err) {
        throw new Error(err);
      }
    },

    async deleteComment(_, { postId, commentId }, context) {
        const { username } = checkAuth(context);
  
        const post = await Post.findById(postId);
  
        if (post) {
          const commentIndex = post.comments.findIndex((c) => c.id === commentId);
  
          if (post.comments[commentIndex].username === username) {
            post.comments.splice(commentIndex, 1);
            await post.save();
            return post;
          } else {
            throw new AuthenticationError('Action not allowed');
          }
        } else {
          throw new UserInputError('Post not found');
        }
      }
  },
};

module.exports = { commentsResolvers };
