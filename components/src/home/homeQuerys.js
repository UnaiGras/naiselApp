import { gql } from "@apollo/client/core";

export const CHAT_LIST = gql`
query RequestChats {
  requestChats {
    chats {
      id
      plan {
        author {
          id
          username
          profilePhoto
        }
        id
        planName
        photo
        description
      }
    }
  }
}
`

export const UPDATE_DEVICE_TOKEN = gql`
  mutation UpdateDeviceToken($deviceToken: String!) {
    updateDeviceToken(deviceToken: $deviceToken) {
      id
      username
      email
      deviceToken
    }
  }
`;