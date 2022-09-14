import { gql } from "apollo-server-micro";

export const FeedQuery = gql`
  query {
    pins {
      id
      imageUrl
      title
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

export const SavedPinsQuery = gql`
  query Query {
    saved {
      id
      createdAt
      pin {
        imageUrl
        id
      }

    }
  }

`

export const UserSavedPins = gql`
  query ExampleQuery($userId: String!) {
    userSaved(userId: $userId) {
      pin {
        imageUrl
        id
      }
      id
      pinId
    }
}


`

export const SearchPinQuery = gql`
  query Query($searchTerm: String!) {
    searchPins(searchTerm: $searchTerm) {
      title
      id
      imageUrl
    }

  }
`

export const UserBoardsQuery = gql`
  query Query($userId: String!) {
    userBoards(userId: $userId) {
      id
      name
      userId
      secret
    }
  }

`

export const firstBoardQuery = gql`
  query ExampleQuery($userId: String!) {
  
    firstUserBoard(userId: $userId) {
      name
      id
      userId
      secret
    }
}

`