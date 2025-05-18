// ... existing code ...
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// GraphQLスキーマ定義
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// リゾルバ定義
const resolvers = {
  Query: {
    hello: () => 'Hello World!',
  },
};

// Expressアプリ作成
const app = express();

// ApolloServerインスタンス作成
async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  // サーバ起動
  app.listen({ port: 4000 }, () => {
    console.log('🚀 Server ready at http://localhost:4000/graphql');
  });
}

startServer();
// ... existing code ...