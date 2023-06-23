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