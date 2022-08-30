const { User, Movie } = require('../models');
const { signToken } = require('../utils/auth');
const {AuthenticationError } = require('apollo-server-express');
const bcrypt = require ('bcrypt')
const resolvers = {
    Query: {
        me: async (parent, args, contect) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('dislikedMovies')
                    .populate('likedMovies');

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },

        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('dislikedMovies')
                .populate('likedMovies')
                .populate('Movie-dislikedUsers')
                .populate('Movie.likedUsers');
        },

        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select(-__v -passowrd)
                .populate('dislikedMovies')
                .populate('likedMovies')
                .populate('Movie-dislikedUsers')
                .populate('Movie.likedUsers');
        },

        movie: async (parent, { movieId }) => {
            return Movie.findOne({ _id: movieId })
                .select('-__v')
                .populate('disliekdUsers')
                .populate('likedUsers');
        },

        movies: async () => {
            return Movie.find()
                .select('-__v')
                .populate('dislikedUsers')
                .populate('likedUsers');
        }
    },

    Mutation: {
        signup: async (parent, args) => {
            const user = await User.create(args);
          
                console.log(user)

                    const userData = await User.
                    findOne({username: args.username})
                    const token = signToken(userData);
                    return { token, user: userData };

           
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
             if (!bcrypt.compare(password, user.password)){
                throw new AuthenticationError('Incorrect credentials');
             }
            const token = signToken(user);
            return { token, user };
        },

        addFriend: async (parent, { friendId }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { friends: friendId } },
                    { new: true }
                ) .populate('friends');

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in.');
        },

        addMovie: async (parent, { input }) => {
            const movie = await Movie.findOneAndUpdate(
                { externalMovieId: input.externalMovieId },
                input,
                { upsert: true, new: true }
            );
            return movie;
        },

        likeMovie: async (parent, { movieId }, context) => {
            if (context.user) {
                const updatedMovie = await Movie.findByIdAndUpdate(
                    { _id: movieId },
                    {
                        $addToSet: { likedUsers: context.user._id },
                        $pull: { dislikedUsers: context.user._id }
                    }
                )

                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    {
                        $addToSet: { likedMovies: updatedMovie._id },
                        $pull: { disliekdMovies: updatedMovie._id }
                    },
                    { new: true }
                )
                .populate('dislikedMovies')
                .populate('likedMovies')
                .populate('Movie.dislikedUsers')
                .populate('Movie.likedUsers');

                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in.')
        },

        dislikeMovie: async (parent, { movieId }, context) => {
            if (context.user) {
                const updatedMovie = await Movie.findByIdAndUpdate(
                    { _id: movieId },
                    {
                        $addToSet: { dislikedUsers: context.user._id },
                        $pull: { likedUsers: context.user._id }
                    }
                )
                .populate('Movie.dislikedUsers')
                .populate('Movie.likedUsers')

                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    {
                        $addToSet: { dislikedMovies: updatedMovie._id },
                        $pull: { likedMovies: updatedMovie._id }
                    },
                    { new: true }
                )
                .populate('dislikedMovies')
                .populate('likedMovies');

                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!')
        }
    }
};

module.exports = resolvers