const { users, categories } = require('../data');

module.exports = {
  author: (parent) => users.find(u => u.id === parent.authorId),
  categories: (parent) => categories.filter(c => parent.categoryIds.includes(c.id))
}; 