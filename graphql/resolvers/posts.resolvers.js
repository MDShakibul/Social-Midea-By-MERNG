const Post = require("../../models/Post");

const postsResolvers = {
  Query: {
    async getPosts() {
      try {
        console.log("sdfsd");
        const posts = await Post.find();
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },

    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (!post) {
          throw new Error("Post not found");
        }
        return post;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

module.exports = { postsResolvers };
