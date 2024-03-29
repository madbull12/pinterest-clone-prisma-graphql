import { gql } from "apollo-server-micro";

export const FeedQuery = gql`
  query {
    pins {
      id
      media
      title
    }
  }
`;

export const RelatedPins = gql`
  query ExampleQuery($categories: [String]!, $pinId: String!) {
    relatedPins(categories: $categories, pinId: $pinId) {
      title
      id
      media
    }
  }
`;

export const SinglePinQuery = gql`
  query Pin($pinId: String!) {
    pin(pinId: $pinId) {
      id
      title
      media
      description
      categories {
        name
      }
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
          name
        }
        userId
      }
    }
  }
`;

export const CreatedPins = gql`
  query Query($userId: String!) {
    user(userId: $userId) {
      id
      pins {
        id
        media
        title
        description
      }
    }
  }
`;

export const SavedPinsQuery = gql`
  query Query {
    saved {
      id
      createdAt
      pin {
        media
        id
      }
    }
  }
`;

export const UserSavedPins = gql`
  query ExampleQuery($userId: String!) {
    userSaved(userId: $userId) {
      pin {
        media
        id
      }
      id
      pinId
    }
  }
`;

export const CategoriesWithLargestPins = gql`
  query ExampleQuery {
    categoriesHighestPins {
      pins {
        media
      }
      name
    }
  }
`;

export const CategoriesQuery = gql`
  query ExampleQuery {
    categories {
      name
      pins {
        media
      }
    }
  }
`;

export const SearchPinQuery = gql`
  query Query($searchTerm: String!) {
    searchPins(searchTerm: $searchTerm) {
      title
      id
      media
    }
  }
`;

export const UserBoardsQuery = gql`
  query Query($userId: String!) {
    userBoards(userId: $userId) {
      id
      name
      userId
      secret
      saved {
        id
        pin {
          media
          id
        }
      }
    }
  }
`;

export const SingleUserQuery = gql`
  query User($userId: String!) {
    user(userId: $userId) {
      image
      name
      id
      email
    }
  }
`;

export const firstBoardQuery = gql`
  query ExampleQuery($userId: String!) {
    firstUserBoard(userId: $userId) {
      name
      id
      userId
      secret
    }
  }
`;

export const BoardPins = gql`
  query Query($boardId: String!) {
    boardPins(boardId: $boardId) {
      saved {
        pinId
        createdAt
        id
        pin {
          title
          id
          media
        }
      }

      id
      name
      secret
      description
    }
  }
`;

export const SingleBoard = gql`
  query ExampleQuery($boardId: String!) {
    singleBoard(boardId: $boardId) {
      id
      name
      secret
      description
    }
  }
`;
