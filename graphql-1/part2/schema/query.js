const { Product, ProductType } = require('./product.js');
const { User } = require('./user.js');
const { Order } = require('./order.js');
const { Comment } = require('./comment.js');
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'QueryRootType',
  fields: {
    user: {
      description: 'Get User by id',
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      type: User,
      //todo: get user by id
      resolve: (_, { id }) => Promise.resolve({
        id,
        login: "KEK",
        passwordHash: "111!",
        avatar: null,
      })
    },
    product: {
      description: 'Get Product by id',
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      type: Product,
      //todo: get product by id
      resolve: (_, { id }) => Promise.resolve({
        id: id,
        title: 'Test product',
        price: 0.1,
        type: 'BOOKS',
        photos: [],
        comments: []
      })
    },
    products: {
      description: 'Get Products by type',
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Product))),
      args: {
        type: { type: new GraphQLNonNull(ProductType) },
        limit: { type: GraphQLInt, defaultValue: 10 }
      },
      //todo: get product by type
      resolve: (_, { type, limit }) => Promise.resolve([
          {
            id: 1,
            title: 'Test product 1',
            price: 0.1,
            type,
            photos: [],
            comments: []
          },
          {
            id: 2,
            title: 'Test product 2',
            price: 0.2,
            type,
            photos: [],
            comments: []
          }
        ].slice(0, limit)
      )
    },
    orders: {
      description: 'Get user orders',
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Order))),
      args: {
        userId: { type: new GraphQLNonNull(GraphQLInt) },
        limit: { type: GraphQLInt, defaultValue: 3 }
      },
      //todo: get last user orders
      resolve: (_, { userId, limit }) => Promise.resolve([
        {
          id: 1,
          userId,
          status: 'NEW',
          items: [],
          created: new Date()
        },
        {
          id: 2,
          userId,
          status: 'PAID',
          items: [],
          created: new Date()
        }
      ].slice(0, limit))
    },
    comments: {
      description: 'Get product comments',
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Comment))),
      args: {
        productId: { type: new GraphQLNonNull(GraphQLInt) },
        limit: { type: GraphQLInt, defaultValue: 10 }
      },
      //todo: get product comments
      resolve: (_, { productId, limit }) => Promise.resolve([
        {
          userId: 1,
          productId,
          text: "Пам пам",
          created: new Date()
        },
        {
          userId: 1,
          productId,
          text: "Я оцениваю",
          mark: 2.0,
          created: new Date()
        }
      ].slice(0, limit))
    },
  }
});