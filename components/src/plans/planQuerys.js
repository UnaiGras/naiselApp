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
mutation CreatePlan($planName: String, $description: String, $context: String, $price: Float, $duration: String, $type: String, $photo: String, $planTokensLenght: Int) {
  createPlan(planName: $planName, description: $description, context: $context, price: $price, duration: $duration, type: $type, photo: $photo, planTokensLenght: $planTokensLenght) {
    id
    name
    username
  }
}
`
