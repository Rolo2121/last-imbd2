const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Movie {
    title: String
    id: String
    overview: String
    rating: String
    releaseDate: String
    poster: String
  }
  type User {
    id: String
    username: String
    email: String
    name: String
  }
  type Comment {
    id: String
    writer: User
    content: String
    postId: Movie
    date: String
  }
  
  type UserResponse {
    token: String
    user: User
  }
  type Query {
    me: User
    users: User
    user(username: String!): User
    movie(id: String!): Movie
    movies(title: String): [Movie]
    comments(postId: String!): [Comment]
    watchlist(user_id: String): [Movie]
  }
  type Mutation {
    signup(email: String, username: String, password: String): UserResponse
    login(email: String, password: String): UserResponse
    addComment(postId: String!, content: String!, writer: String): Comment
    deleteComment(id: String!): Comment
    addToWatchlist(id: String!): Movie
    removeFromWatchlist(id: String!): Movie
  }
`;

module.exports = typeDefs;
