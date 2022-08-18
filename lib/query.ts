import { gql } from "apollo-server-micro";

export const FeedQuery = gql`
  query {
    pins {
      id
      imageUrl
    }
  }
`
export const SinglePinQuery = gql`
    query Pin($pinId: String!) {
        pin(pinId: $pinId) {
            id
            title
            imageUrl
            description
            category
            userId
            user {
                id
                email
                image
            }
            comments {
                id
                content
                user {
                    id
                    email
                    image
                }
                userId
            }   
        }
    }
`

export const PinByUserEmail = gql`
  query Query($userId: String!) {
    user(userId: $userId) {
      pins {
        id
        imageUrl
      }
    }
  }
`

export const UserIdQuery = gql`
  query User($userId: String!) {
    user(userId: $userId) {
      id
    }
  }

`