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

export const ME = gql`
query Me {
  me {
    id
  }
}
`

export const SEND_NEW_MESSAGE = gql`
mutation AddNewMessage($userId: String!, $chatId: String!, $message: String!, $messageType: String!, $messageImage: String) {
  newMessage(userId: $userId, chatId: $chatId, message: $message, messageType: $messageType, messageImage: $messageImage) {
    chatId
    message
    messageType
    messageImage
  }
}
`

