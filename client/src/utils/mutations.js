import { gql } from "@apollo/client";

export const UPDATE_ACCOUNT = gql`
  mutation UpdateUser(
    $id: String!
    $name: String
    $email: String
    $password: String
  ) {
    updateuser(name: $name, email: $email, password: $password)
    id
    name
    email
    password
  }
`;

export const UPDATE_WATCHLIST = gql`
  mutation GetWatchlist( $movieId: String!) {
    updatewatchlist(movieId: $movieId) {
      watchlist
    }
  }
`;

export const DELETE_WATCHLIST = gql`
  mutation DeleteWatchlist( $movieId: String!) {
    deletewatchlist(movieId: $movieId) {
      watchlist
    }
  }
`;
