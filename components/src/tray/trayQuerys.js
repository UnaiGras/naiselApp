import { gql } from "@apollo/client";


export const SEND_MAIL = gql`
mutation SendMailToMembers($subject: String!, $message: String!) {
  sendMailToMembers(subject: $subject, message: $message) {
    id
    message
    sentAt
    subject
  }
}
`

export const GET_USER_TRAY = gql`
query GetUserTray {
  getUserTray {
    id
    mails {
      from {
        username
        id
        profilePhoto
      }
      id
      message
      sentAt
      subject
    }
  }
}  
`