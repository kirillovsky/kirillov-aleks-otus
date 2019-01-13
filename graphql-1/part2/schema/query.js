const { Product, ProductType } = require('./types/product.js');
const { User } = require('./types/user.js');
const { Order } = require('./types/order.js');
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList
} = require('graphql');
const userStorage = require('../storage/userStorage.js');
const productStorage = require('../storage/productStorage.js');
const orderStorage = require('../storage/orderStorage.js');

module.exports = new GraphQLObjectType({
  name: 'QueryRootType',
  fields: {
    user: {
      description: 'Get User by id',
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      type: new GraphQLNonNull(User),
      resolve: (_, { id }) => userStorage.get(id)
    },
    product: {
      description: 'Get Product by id',
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      type: Product,
      resolve: (_, { id }) => productStorage.get(id)
    },
    products: {
      description: 'Get Products by type',
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Product))),
      args: {
        type: { type: new GraphQLNonNull(ProductType) },
        limit: { type: GraphQLInt, defaultValue: 10 }
      },
      resolve: (_, { type, limit }) => productStorage.findByType(type, limit)
    },
    orders: {
      description: 'Get user orders',
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Order))),
      args: {
        userId: { type: new GraphQLNonNull(GraphQLInt) },
        limit: { type: GraphQLInt, defaultValue: 3 }
      },
      resolve: (_, { userId, limit }) => orderStorage.findUsersOrder(userId, limit)
    }
  }
});