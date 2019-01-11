const { Product, ProductInput } = require('./product.js');
const { User, UserInput } = require('./user.js');
const { Comment, CommentInput } = require('./comment.js');
const {
  Order,
  OrderInput,
  OrderUpdateInput
} = require('./order.js');
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'MutationRootType',
  fields: {
    createUser: {
      args: {
        user: { type: new GraphQLNonNull(UserInput) }
      },
      type: new GraphQLNonNull(User),
      //todo: create new user
      resolve: (_, { user: { login, passwordHash, avatar, email, fullName, address } }) =>
        Promise.resolve({
          id: 2,
          login,
          passwordHash,
          avatar,
          email,
          fullName,
          address
        })
    },
    createProduct: {
      args: {
        product: { type: new GraphQLNonNull(ProductInput) }
      },
      type: new GraphQLNonNull(Product),
      //todo: create new product
      resolve: (_, { product: { title, price, type, description, photos } }) => Promise.resolve({
        id: 3,
        title,
        price,
        type,
        description,
        photos,
        comments: []
      })
    },
    createComment: {
      args: {
        comment: { type: new GraphQLNonNull(CommentInput) }
      },
      type: new GraphQLNonNull(Comment),
      //todo: create new comment
      resolve: (_, { comment: { userId, productId, text, mark } }) => Promise.resolve({
        userId,
        productId,
        text,
        mark,
        created: new Date()
      })
    },
    createOrder: {
      args: {
        order: { type: new GraphQLNonNull(OrderInput) }
      },
      type: new GraphQLNonNull(Order),
      //todo: create new order
      resolve: (_, { order: { userId, description, status, items } }) => Promise.resolve({
        userId,
        description,
        status,
        items,
        created: new Date()
      })
    },
    updateOrder: {
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        order: { type: new GraphQLNonNull(OrderUpdateInput) }
      },
      type: Order,
      //todo: update order
      resolve: (_, { id, order: { description, status, items } }) => Promise.resolve({
        id,
        userId: 1,
        description,
        status,
        items,
        created: new Date()
      })
    }
  }
});