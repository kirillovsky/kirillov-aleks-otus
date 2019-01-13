module.exports = new (class {
  constructor() {
    this.orders = [
      {
        id: 1,
        userId: 1,
        description: 'First order',
        status: 'NEW',
        items: [
          { productId: 1, count: 2 }
        ],
        created: new Date()
      }
    ];
  }

  findUsersOrder(userId, limit) {
    return Promise.resolve(
      this.orders
      .filter(order => order.userId === userId)
      .splice(0, limit)
    );
  }

  update(id, newOrder) {
    return this.get(id)
    .then(({ userId, created }) => ({ id, userId, created, updated: new Date(), ...newOrder }))
    .then(order => {
      this.orders[id - 1] = order;
      return order;
    });
  }

  get(id) {
    const result = this.orders[id - 1];

    return result ?
      Promise.resolve(result) :
      Promise.reject(`Not found order by id - ${id}`);
  }

  create(order) {
    const result = {
      id: this.orders.length + 1,
      created: new Date(),
      ...order
    };

    this.orders.push(result);

    return Promise.resolve(result);
  }
})();