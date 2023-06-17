import { gql } from "@apollo/client/core";


export const CREATE_PLAN = gql`
mutation CreatePlan($name: String, $description: String, $context: String, $price: Float, $duration: String, $type: String, $photo: String) {
    createPlan(name: $name, description: $description, context: $context, price: $price, duration: $duration, type: $type, photo: $photo) {
      username
      plans {
        price
        name
        description
      }
    }
  }
`

export const MY_INFO = gql`
query MyProfileInfo {
  myProfileInfo {
    username
    profilePhoto
    planMaker
    name
    id
    email
  }
}
`

export const EDIT_PROFILE = gql`
  mutation EditProfile($newUser: String, $newEmail: String, $newDescription: String, $newProfilePhoto: String) {
    editProfile(newUser: $newUser, newEmail: $newEmail, newDescription: $newDescription, newProfilePhoto: $newProfilePhoto) {
      description
      email
      id
      name
      profilePhoto
      username
    }
}
`

export const REQUEST_MY_PLANS = gql`
query Query {
  requestMyPlans {
    username
    plans {
      price
      planName
      photo
      id
      duration
      description
      context
    }
  }
}
`