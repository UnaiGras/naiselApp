import { gql } from "@apollo/client/core";

export const CHAT_LIST = gql`
query RequestChats {
    requestChats {
      chats {
        id
        messages
        plan {
          author {
            username
            profilePhoto
          }
          name
        }
      }
    }
  }
`