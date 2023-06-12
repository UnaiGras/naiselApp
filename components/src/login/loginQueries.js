import { gql } from "@apollo/client";


export const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
    value
  }
}
`
export const REGISTER = gql`
mutation Mutation($username: String!, $email: String!, $password: String!, $name: String!, $phoneNumber: String!, $profilePhoto: String) {
  addUser(username: $username, email: $email, password: $password, name: $name, phoneNumber: $phoneNumber, profilePhoto: $profilePhoto) {
      id
      email
      eventMaker
      name
      username
      walletAddress
    }
  }
`