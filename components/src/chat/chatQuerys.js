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