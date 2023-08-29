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

export const CREATE_CHANNEL_MUTATION = gql`
mutation CreateChannel($name: String, $description: String, $photo: String) {
  createChannel(name: $name, description: $description, photo: $photo) {
    id
    name
    description
  }
}`

export const STATS_INFO = gql`
  query StatsInfo {
    statsInfo {
      username
      name
      money
      email
      profilePhoto
      plans {
        # Aquí asumo que cada plan puede tener un campo 'id' u otro identificador único.
        id
      }
    }
  }
`;