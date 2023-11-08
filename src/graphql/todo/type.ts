export const type: string = `#graphql
    type Todo {
        id:String!
        title:String!
        description:String
        isCompelete: Boolean!
        image: String
        uid: String!
        user: User
        createdAt: String!
        updatedAt: String!
    }
    type User {
        id:String!
        name:String!
        email:String!
        image: String
        createdAt: String!
        updatedAt: String!
    }
`;
