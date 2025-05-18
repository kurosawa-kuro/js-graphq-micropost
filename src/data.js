exports.users = [
  { id: 'u1', name: 'Alice' },
  { id: 'u2', name: 'Bob' }
];

exports.categories = [
  { id: 'c1', name: 'GraphQL' },
  { id: 'c2', name: 'DevOps' }
];

exports.microposts = [
  {
    id: 'p1',
    title: 'Hello GraphQL',
    body: 'First post',
    authorId: 'u1',
    categoryIds: ['c1']
  }
];
