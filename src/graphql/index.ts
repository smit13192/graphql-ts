import { ApolloServer } from "@apollo/server";
import TodoGraphql from "./todo";

const typeDefs = `#graphql
  ${TodoGraphql.type}
  type Query {
    ${TodoGraphql.query}
  }
  type Mutation {
    ${TodoGraphql.mutation}
  }
`;

const resolvers = {
  ...TodoGraphql.resolver.Type,
  Query: {
    ...TodoGraphql.resolver.Query,
  },
  Mutation: {
    ...TodoGraphql.resolver.Mutation,
  },
};

export const server = new ApolloServer({
  typeDefs,
  resolvers,
});
