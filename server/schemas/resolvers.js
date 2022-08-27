const { User, Movie } = require('../models');
const { signToken } = require('../utils/auth');
const {AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {}
    Mutation: {}
}

module.exports = resolvers;