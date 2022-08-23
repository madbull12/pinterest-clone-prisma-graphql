import { gql } from "apollo-server-micro";

export const createPinMutation = gql`
    mutation Mutation($title: String!, $imageUrl: String!, $userId: String!, $description: String, $category: [String]) {
        createPin(title: $title, imageUrl: $imageUrl, userId: $userId, description: $description, category: $category) {
            category
            title
            imageUrl
            description
            userId
        }
    }

`

export const savePinMutation = gql`
    mutation Mutation($pinId: String!, $userId: String!) {
        savePin(pinId: $pinId, userId: $userId) {
            id
            createdAt
            userId
            pinId
            user {
                id
                email
            }
            pin {
                imageUrl
                description
            }
        }
    }

`

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

`

export const deleteSaveMutation = gql`
    mutation Mutation($saveId: String!) {
        deleteSave(saveId: $saveId) {
            id
            createdAt
            userId
            pinId
        }
    }
`