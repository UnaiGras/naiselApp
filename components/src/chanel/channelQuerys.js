import { gql } from "@apollo/client";


export const GET_CHANEL = gql`
query ChanelInfo($creatorId: String) {
  chanelInfo(creatorId: $creatorId) {
    id
    name
    photo
    description
    messages {
      content
      messageImage
      messageType
      id
    }
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

export const ME = gql`
query Me {
  me {
    id
  }
}
`

export const SEND_NEW_MESSAGE = gql`
mutation NewMessage($message: String, $messageType: String, $messageImage: String) {
  newMessage(message: $message, messageType: $messageType, messageImage: $messageImage) {
    id
    content
    messageImage
    messageType
  }
}
`

export const GET_IMAGES_BY_PLAN = gql`
  query GetContentImagesByPlan($planId: ID!) {
    getContentImagesByPlan(planId: $planId) {
      id
      title
      description
      content
      tag
    }
  }
`;

export const GET_VIDEOS_BY_PLAN = gql`
query GetContentVideosByPlan($planId: ID!) {
  getContentVideosByPlan(planId: $planId) {
    content
    description
    id
    tag
    thumbnail
    title
  }
}
`;

export const CREATE_MOMENT = gql`
mutation StartMoment($channelId: String, $message: String!) {
  startMoment(channelId: $channelId, message: $message) {
      id
      author
      messageType
      content
      channelId
      momentFiles
  }
}
`

export const ADD_MOMENT_FILE = gql`
mutation AddMomentFile($messageId: ID!, $imageUrl: String!) {
  addMomentFile(messageId: $messageId, imageUrl: $imageUrl) {
      id
      momentFiles
  }
}
`
