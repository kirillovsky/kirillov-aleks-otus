module.exports = new (class {
  constructor() {
    this.comments = [
      {
        userId: 1,
        productId: 1,
        text: "Hello! It's my first comment",
        created: new Date()
      },
      {
        userId: 1,
        productId: 1,
        text: "It's best book for all programmers",
        mark: 5,
        created: new Date()
      }
    ];
  }

  create(comment) {
    const result = {
      ...comment,
      created: new Date()
    };
    this.comments.push(result);

    return Promise.resolve(result);
  }

  find(productId) {
    return Promise.resolve(
      this.comments.filter(comment => comment.productId === productId)
    );
  }

  findWithLimit(productId, limit) {
    return this.find(productId)
    .then(results => results.slice(0, limit));
  }
})();