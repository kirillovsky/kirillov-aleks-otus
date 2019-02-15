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
const userStorage = require('../../storage/userStorage.js');
const productStorage = require('../../storage/productStorage.js');

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
      resolve: ({ productId }) => productStorage.get(productId)
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
      resolve: ({ userId }) => userStorage.get(userId)
    },
    description: { type: GraphQLString },
    status: { type: new GraphQLNonNull(OrderStatus) },
    summaryPrice: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: "Cumulative order price",
      resolve: ({ items }) => {
        const productPriceWithCount = items.map(
          ({ productId, count }) => productStorage.get(productId).then(
            ({ price }) => ({ price, count })
          )
        );

        return Promise.all(productPriceWithCount).then(results =>
          results.reduce((acc, { price, count }) => acc + (price * count), 0)
        )
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