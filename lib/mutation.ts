import { gql } from "apollo-server-micro";

export const createPinMutation = gql`
    mutation Mutation($title: String!, $imageUrl: String!, $userId: String!, $description: String, $category: [String]) {
        createPin(title: $title, imageUrl: $imageUrl, userId: $userId, description: $description, category: $category) {
            category
            title
            imageUrl
            description
        }
    }


`