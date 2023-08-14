import { gql } from "@apollo/client";


export const GET_CHANEL = gql`
query ChanelInfo($creatorId: String) {
    chanelInfo(creatorId: $creatorId) {
      id
      name
      photo
      description
      messages
    }
  }
`

export const GET_COMMON_PLANS = gql`
query Query($creatorId: String) {
  requestContent(creatorId: $creatorId) {
    planContent
    id
    photo
    description
    planName
  }
}
`

