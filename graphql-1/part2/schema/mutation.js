const { Product, ProductInput } = require('./types/product.js');
const { User, UserInput } = require('./types/user.js');
const { Comment, CommentInput } = require('./types/comment.js');
const {
  Order,
  OrderInput,
  OrderUpdateInput
} = require('./types/order.js');
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt
} = require('graphql');
const userStorage = require('../storage/userStorage.js');
const productStorage = require('../storage/productStorage.js');
const commentStorage = require('../storage/commentStorage.js');
const orderStorage = require('../storage/orderStorage.js');

module.exports = new GraphQLObjectType({
  name: 'MutationRootType',
  fields: {
    createUser: {
      args: {
        user: { type: new GraphQLNonNull(UserInput) }
      },
      type: new GraphQLNonNull(User),
      resolve: (_, { user }) => userStorage.create(user)
    },
    createProduct: {
      args: {
        product: { type: new GraphQLNonNull(ProductInput) }
      },
      type: new GraphQLNonNull(Product),
      resolve: (_, { product }) => productStorage.create(product)
    },
    createComment: {
      args: {
        comment: { type: new GraphQLNonNull(CommentInput) }
      },
      type: new GraphQLNonNull(Comment),
      resolve: (_, { comment }) => commentStorage.create(comment)
    },
    createOrder: {
      args: {
        order: { type: new GraphQLNonNull(OrderInput) }
      },
      type: new GraphQLNonNull(Order),
      resolve: (_, { order }) => orderStorage.create(order)
    },
    updateOrder: {
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        order: { type: new GraphQLNonNull(OrderUpdateInput) }
      },
      type: Order,
      resolve: (_, { id, order }) => orderStorage.update(id, order)
    }
  }
});