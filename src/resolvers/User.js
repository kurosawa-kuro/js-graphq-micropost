const { microposts } = require('../data');

module.exports = {
  posts: (parent) => microposts.filter(p => p.authorId === parent.id)
}; 