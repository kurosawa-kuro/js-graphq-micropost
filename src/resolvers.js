const { users, microposts, categories } = require('./data');
const { randomUUID } = require('crypto');
const User = require('./resolvers/User');
const Micropost = require('./resolvers/Micropost');
const Category = require('./resolvers/Category');

exports.resolvers = {
  Query: {
    listUsers: () => users,
    listMicroposts: () => microposts,
    listCategories: () => categories
  },
  Mutation: {
    addMicropost: (_, { input }) => {
      const newPost = { id: randomUUID(), ...input };
      microposts.push(newPost);
      return newPost;
    }
  },
  User,
  Micropost,
  Category
};
