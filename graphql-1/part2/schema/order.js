const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLEnumType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString
} = require('graphql');
const { Product } = require('./product');
const { User } = require('./user');
const { GraphQLDateTime } = require('graphql-custom-types');

const OrderStatus = new GraphQLEnumType({
  name: 'OrderStatus',
  values: {
    NEW: { value: "NEW" },
    DECLINED: { value: "DECLINED" },
    IN_PROCESS: { value: "IN_PROCESS" },
    PAID: { value: "PAID" },
    DELIVERED: { value: "DELIVERED" },
    RECEIVED: { value: "RECEIVED" }
  }
});

const Item = new GraphQLObjectType({
  name: 'Item',
  description: "Product with count in order",
  fields: () => ({
    productId: { type: new GraphQLNonNull(GraphQLInt) },
    product: {
      type: new GraphQLNonNull(Product),
      //todo: get Product by id
      resolve: ({ productId }, _, context) => Promise.resolve({
        id: productId,
        title: 'Test product',
        price: 0.1,
        type: 'BOOKS',
        photos: [],
        comments: []
      })
    },
    count: { type: new GraphQLNonNull(GraphQLInt) }
  })
});

const Order = new GraphQLObjectType({
  name: 'Order',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: new GraphQLNonNull(GraphQLInt) },
    user: {
      type: new GraphQLNonNull(User),
      description: "Orders customer",
      //todo: get user by id
      resolve: ({ userId }, _, context) => Promise.resolve({
        id: userId,
        login: "KEK",
        passwordHash: "111!",
      })
    },
    description: { type: GraphQLString },
    status: { type: new GraphQLNonNull(OrderStatus) },
    price: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: "Cumulative order price",
      resolve: (source, _, context) => {
        //todo: calculate items summ
        return Promise.resolve(42.0)
      }
    },
    items: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Item))) },
    created: { type: new GraphQLNonNull(GraphQLDateTime) },
    updated: { type: GraphQLDateTime }
  })
});

const ItemInput = new GraphQLInputObjectType({
  name: 'ItemInput',
  fields: {
    productId: { type: new GraphQLNonNull(GraphQLInt) },
    count: { type: new GraphQLNonNull(GraphQLInt) }
  }
});

const OrderInput = new GraphQLInputObjectType({
  name: 'OrderInput',
  fields: {
    userId: { type: new GraphQLNonNull(GraphQLInt) },
    description: { type: GraphQLString },
    status: { type: new GraphQLNonNull(OrderStatus) },
    items: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ItemInput))) }
  }
});

const OrderUpdateInput = new GraphQLInputObjectType({
  name: 'OrderUpdateInput',
  fields: {
    description: { type: GraphQLString },
    status: { type: new GraphQLNonNull(OrderStatus) },
    items: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ItemInput))) }
  }
});

module.exports = { Order, OrderInput, OrderUpdateInput };