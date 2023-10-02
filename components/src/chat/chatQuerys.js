import { gql } from "@apollo/client";

export const MESSAGE_RESPONSE = gql`
query Query($planId: String, $prompt: String) {
    generateMessageResponse(planId: $planId, prompt: $prompt) {
      value
    }
  }
`

export const AUTHOR_INFO_BY_PLANID = gql`
query UserInfoByPlanId($planId: String) {
    userInfoByPlanId(planId: $planId) {
      username
      profilePhoto
      clarity
      voiceId
      stability
      id
    }
  }
`

export const GET_PLAN_CONTENT = gql`
query GetPlanContentById($planId: String) {
  getPlanContentById(planId: $planId) {
    planImage {
      content
      descrition
      id
      tag
      title
    }
    planVideos {
      title
      id
      descrition
      tag
    }
    photo
    planName
  }
}
`

export const CREATE_TOKENS_CHECKOUT = gql`
mutation CreateCheckoutForTokens($amount: Float!, $creatorId: String!, $modelId: String!) {
  createCheckoutForTokens(amount: $amount, creatorId: $creatorId, modelId: $modelId)
}
`