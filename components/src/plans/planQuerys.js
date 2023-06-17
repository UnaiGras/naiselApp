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
