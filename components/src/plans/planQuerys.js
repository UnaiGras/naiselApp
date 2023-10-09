import { gql } from "@apollo/client";

export const REQUEST_PLAN = gql`
query SpecificPlanById($planId: String) {
    specificPlanById(planId: $planId) {
      planName
        id
        photo
        price
        description
        clients {
          id
        }
        author {
          name
          profilePhoto
          username
          id
        }
    }
  }
`

export const SUBSCRIBE_TO_PLAN = gql`
mutation SubscribeToPlan($planId: String) {
  subscribeToPlan(planId: $planId) {
    id
    name
    plans {
      planName
      id
    }
  }
}
`

export const CREATE_PLAN = gql`
mutation CreatePlan($planName: String, $description: String, $context: String, $price: Float, $duration: String, $type: String, $photo: String, $planTokensLenght: Int, $percetageForMarketer: Int, $marketerId: String, $flag: String) {
  createPlan(planName: $planName, description: $description, context: $context, price: $price, duration: $duration, type: $type, photo: $photo, planTokensLenght: $planTokensLenght, percetageForMarketer: $percetageForMarketer, marketerId: $marketerId, flag: $flag) {
    id
    username
    name
  }
}
`

export const GET_PAYMENT_SHEET = gql`
mutation CreatePaymentSheet($amount: Float) {
  createPaymentSheet(amount: $amount) {
    clientSecret
    customerId
  }
}
`

export const DEPOSIT = gql`
mutation Deposit($amount: Float) {
  deposit(amount: $amount) {
    id
    money
    username
  }
}
`

export const ADD_VIDEO_TO_PLAN = gql`
mutation AddContentVideoToPlan($planId: String, $title: String, $description: String, $content: String, $tag: String) {
  addContentVideoToPlan(planId: $planId, title: $title, description: $description, content: $content, tag: $tag) {
    id
    planVideos {
      id
      content
      title
    }
    planImage {
      title
      id
      content
    }
  }
}
`

export const ADD_IMAGE_TO_PLAN = gql`
mutation AddContentImageToPlan($planId: String, $title: String, $description: String, $content: String, $tag: String) {
  addContentImageToPlan(planId: $planId, title: $title, description: $description, content: $content, tag: $tag) {
    id
    planVideos {
      id
      content
      title
    }
    planImage {
      title
      id
      content
    }
  }
}
`


export const CREATE_CHECKOUT_SESSION = gql`
query Query($planId: String!) {
  createCheckoutSession(planId: $planId)
}
`;

export const SEARCH_USERS = gql`
query SearchUsers($username: String) {
  searchUsers(username: $username) {
    id
    username
    profilePhoto
  }
}
`