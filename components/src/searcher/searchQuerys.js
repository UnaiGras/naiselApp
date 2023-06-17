import { gql } from "@apollo/client";

export const TRENDING_PLANS = gql`
query RequestTrendingPlans {
    requestTrendingPlans {
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