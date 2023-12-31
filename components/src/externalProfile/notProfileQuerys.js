import { gql } from "@apollo/client";

export const NOT_PROFILE_INFO = gql`
query Query($userId: String) {
  userProfileInfo(userId: $userId) {
    email
      id
      name
      planMaker
      profilePhoto
      username
      plans {
        id
        duration
        description
        photo
        planName
        price
        type
      }
      channel {
      membersCount
        id
        name
        photo
        description
      }
    }
  }
`