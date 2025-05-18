const request = require('supertest');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const fs = require('fs');
const path = require('path');
const { resolvers } = require('../src/resolvers');

const typeDefs = fs.readFileSync(path.join(__dirname, '../src/schema.graphql'), 'utf8');

let app, server, httpServer;

describe('GraphQL Micropost API', () => {
  beforeAll(async () => {
    app = express();
    server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });
    httpServer = app.listen(0); // ランダムポート
  });

  afterAll(async () => {
    await server.stop();
    httpServer.close();
  });

  it('listMicroposts: 初期データ取得', async () => {
    const res = await request(httpServer)
      .post('/graphql')
      .send({ query: '{ listMicroposts { id title author { name } categories { name } } }' });
    expect(res.body.data.listMicroposts.length).toBeGreaterThan(0);
    expect(res.body.data.listMicroposts[0]).toHaveProperty('author');
    expect(res.body.data.listMicroposts[0]).toHaveProperty('categories');
  });

  it('addMicropost: 新規作成', async () => {
    const mutation = `
      mutation($input: MicropostInput!) {
        addMicropost(input: $input) { id title }
      }
    `;
    const variables = {
      input: {
        title: 'Test Post',
        body: 'Test Body',
        authorId: 'u1',
        categoryIds: ['c1']
      }
    };
    const res = await request(httpServer)
      .post('/graphql')
      .send({ query: mutation, variables });
    expect(res.body.data.addMicropost).toHaveProperty('id');
    expect(res.body.data.addMicropost.title).toBe('Test Post');
  });

  it('listUsers: ユーザー一覧取得', async () => {
    const res = await request(httpServer)
      .post('/graphql')
      .send({ query: '{ listUsers { id name posts { id } } }' });
    expect(res.body.data.listUsers.length).toBeGreaterThan(0);
    expect(res.body.data.listUsers[0]).toHaveProperty('posts');
  });

  it('listCategories: カテゴリ一覧取得', async () => {
    const res = await request(httpServer)
      .post('/graphql')
      .send({ query: '{ listCategories { id name posts { id } } }' });
    expect(res.body.data.listCategories.length).toBeGreaterThan(0);
    expect(res.body.data.listCategories[0]).toHaveProperty('posts');
  });
}); 