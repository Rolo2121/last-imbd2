import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      username
    }
  }
`;

export const GET_MOVIES = gql`
  query GetMovies($title: String) {
    movies(title: $title) {
      id
      title
      overview
      rating
      poster
      releaseDate
    }
  }
`;

export const GET_MOVIE = gql`
  query GetMovie($id: String!) {
    movie(id: $id) {
      id
      title
      overview
      rating
      poster
      releaseDate
    }
  }
`;

export const GET_COMMENTS = gql`
query GetComments($postId: String!) {
  comments(postId: $postId) {
    id
    content
    date
    writer{username}
  }
}

`;

/*export const GET_MOVIES_BY_NAME = gql`
  query GetMoviesByName($title: String) {
    movies(title: $title) {
      id
      title
      overview
      rating
      poster
      releaseDate
    }
  }
`;*/



export const GET_WATCHLIST = gql`
  query GetWatchlist($id: String!) {
    users(id: $id) {
      watchlist
    }
  }
`;
