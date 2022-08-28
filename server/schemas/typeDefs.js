const {gql} = require('apollo-server-express')

const typeDefs= gql`
    type Movie {
        title: String
        id: String
        overview: String
        rating: String
        releaseDate: String
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
        movie(movieId: String!): Movie
        movies: [Movie]
    }
    type Mutation {
        addUser(email: String, username: String, password: String): UserResponse
        login(email: String, password: String): UserResponse
        addFriend(friendId: String): User
        addMovie: Movie
        likeMovie(movieId: String!): User
        dislikeMovie(movieId: String!): User
    }
`

module.exports= typeDefs