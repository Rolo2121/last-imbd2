const { User, Movie, Comment } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");
const bcrypt = require("bcrypt");
const resolvers = {
  Query: {
    me: async (parent, args, contect) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select("-__v -password");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },

    users: async () => {
      return User.find().select("-__v -password");
    },

    user: async (parent, { username }) => {
      return User.findOne({ username }).select(-__v - passowrd);
    },

    movie: async (parent, { id }) => {
      return Movie.findOne({ _id: id }).select("-__v");
    },

    comments: async (parent, { postId }) => {
      const response= await Comment.find({ postId }).populate("writer");
      console.log(response)
        return response
    },

    movies: async (parent, { title }) => {
      return Movie.find(title ? { title: new RegExp(".*" + title + ".*", "i") } : {}).select("-__v");
    },

    watchlist: async (parent, { user_id }, context) => {
      const foundUser = await User.findOne({
        _id: context.user.user_id || user_id,
      }).populate("Movies");
      return foundUser.watchlist;
    },
  },

  Mutation: {
    signup: async (parent, args) => {
      const user = await User.create(args);

      const userData = await User.findOne({ username: args.username });
      const token = signToken(userData);
      return { token, user: userData };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      if (!bcrypt.compare(password, user.password)) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },

    addComment: async (parent, { postId, content, writer }, context) => {
      if (context.user || writer) {
        return await Comment.create({ postId, content, writer: context.user?._id || writer }).then((data) => {
          return data;
        });
      }
    },

    deleteComment: async (parent, { id }) => {
      await Comment.remove({
        _id: id,
      });
      return true;
    },

    addToWatchlist: async (parent, { id, user_id }, context) => {
      if (context.user || user_id) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id || user_id },
          {
            $addToSet: { watchlist: id },
          },
          { new: true }
        ).populate("Movie");
        return updatedUser;
      }
    },
    removeFromWatchlist: async (parent, { id, user_id }, context) => {
      if (context.user || user_id) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id || user_id },
          {
            $pull: { watchlist: id },
          },
          { new: true }
        ).populate("Movie");
        return updatedUser;
      }
    },
  },
};

module.exports = resolvers;
