const { users, microposts, categories } = require('./data');
const { randomUUID } = require('crypto');

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
  User: {
    posts: (parent) => microposts.filter(p => p.authorId === parent.id)
  },
  Micropost: {
    author: (parent) => users.find(u => u.id === parent.authorId),
    categories: (parent) => categories.filter(c => parent.categoryIds.includes(c.id))
  },
  Category: {
    posts: (parent) => microposts.filter(p => p.categoryIds.includes(parent.id))
  }
};
