import { gql } from "@apollo/client";

export const TRENDING_PLANS = gql`
query RequestTrendingPlans($trend: String) {
  requestTrendingPlans(trend: $trend) {
    planName
    id
    photo
    price
    planTokensLenghtResponse
    description
    author {
      name
      profilePhoto
      username
      id
    }
  }
}
`