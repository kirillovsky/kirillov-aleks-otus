module.exports = new (class {
  constructor() {
    this.products = [
      {
        id: 1,
        title: 'Р. Мартин "Чистый код"',
        price: 600,
        type: "BOOKS",
        description: "Чистый код, который работает! Вот к чему надо стремиться",
        photos: [
          {
            width: 100,
            height: 100,
            url: "https://tinyurl.com/y957whut"
          },
          {
            width: 150,
            height: 150,
            url: "https://tinyurl.com/y8mkubdp"
          }
        ]
      }
    ]
  }

  get(id) {
    const result = this.products.filter(({ id: productId }) => productId === id)[0];

    return result ?
      Promise.resolve(result) :
      Promise.reject(`Not found product with id - ${id}`);
  }

  findByType(type, limit) {
    const result = this.products
    .filter(({ type: productType }) => productType === type)
    .slice(0, limit);

    return Promise.resolve(result);
  }

  create(product) {
    const result = {
      id: this.products.length + 1,
      ...product
    };
    this.products.push(result);

    return Promise.resolve(result);
  }
})();