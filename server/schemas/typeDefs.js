const {gql} = require('apollo-server-express')

const typeDefs= gql`
    type Movie {
        title: String
        id: String
        overview: String
        rating: String
        releaseDate: String
        poster: String
    }
    type Comment {
        id: String
        writer: User
       content: String
       postId: Movie
       date: String 
    }
    type User {
        id: String
        username: String
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
    }
    type Mutation {
        signup(email: String, username: String, password: String): UserResponse
        login(email: String, password: String): UserResponse
        addFriend(friendId: String): User
        addMovie: Movie
        likeMovie(movieId: String!): User
        dislikeMovie(movieId: String!): User
        addComment(postId: String!, content: String!): Comment
    }
`

module.exports= typeDefs