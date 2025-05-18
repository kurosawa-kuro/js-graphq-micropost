const { microposts } = require('../data');

module.exports = {
  posts: (parent) => microposts.filter(p => p.categoryIds.includes(parent.id))
}; 