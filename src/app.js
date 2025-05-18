const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const fs = require('fs');
const path = require('path');
const { resolvers } = require('./resolvers');

const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8');

const app = express();

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen({ port: 4000 }, () => {
    console.log('🚀 Server ready at http://localhost:4000/graphql');
  });
}

startServer();