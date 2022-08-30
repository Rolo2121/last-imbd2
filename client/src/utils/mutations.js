import { gql } from "@apollo/client";

export const UPDATE_ACCOUNT = gql`
  mutation UpdateUser(

    $username: String
    $email: String
    $password: String
  ) {
    addUser(username: $username, email: $email, password: $password)
    {id
    username
    email
    password}
  }
`;

export const SIGNUP_MUTATION = gql`
mutation SignupMutation( 
  $username: String
  $email: String
  $password: String
) {
  signup(username: $username, email: $email, password: $password){
    token
    user{
      id
    }

  }

}


`;

export const LOGIN_MUTATION = gql`
mutation LoginMutation( 
  $email: String
  $password: String
) {
  login(email: $email, password: $password){
    token
    user{
      id
    }

  }

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
