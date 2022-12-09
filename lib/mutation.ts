import { gql } from "apollo-server-micro";

export const createPinMutation = gql`
  mutation Mutation(
    $title: String!
    $media: String!
    $userId: String!
    $description: String
    $categories: [String]!
  ) {
    createPin(
      title: $title
      media: $media
      userId: $userId
      description: $description
      categories: $categories
    ) {
      categories {
        id
        name
      }
      title
      media
      description
      userId
    }
  }
`;

export const savePinMutation = gql`
  mutation Mutation($pinId: String!, $boardId: String!, $userId: String!) {
    savePin(pinId: $pinId, boardId: $boardId, userId: $userId) {
      id
      userId
      pinId
    }
  }
`;

export const createCommentMutation = gql`
  mutation Mutation($content: String!, $userId: String!, $pinId: String!) {
    createComment(content: $content, userId: $userId, pinId: $pinId) {
      id
      createdAt
      content
      userId
      pinId
    }
  }
`;

export const deleteSaveMutation = gql`
  mutation Mutation($saveId: String!) {
    deleteSave(saveId: $saveId) {
      id
      createdAt
      userId
      pinId
    }
  }
`;

export const createBoardMutation = gql`
  mutation Mutation($userId: String!, $name: String!, $secret: Boolean!) {
    createBoard(userId: $userId, name: $name, secret: $secret) {
      id
      userId
    }
  }
`;

export const deletePinMutation = gql`
  mutation Mutation($pinId: String!) {
    deletePin(pinId: $pinId) {
      title
      id
      userId
    }
  }
`;

export const updatePinMutation = gql`
  mutation Mutation($pinId: String!, $description: String, $title: String) {
    updatePin(pinId: $pinId, description: $description, title: $title) {
      id
      title
      description
    }
  }
`;
