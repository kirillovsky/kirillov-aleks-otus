const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLEnumType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat
} = require("graphql");
const { Picture, PictureInput } = require("./picture.js");
const { Comment } = require('./comment.js');
const commentStorage = require('../../storage/commentStorage.js');

const ProductType = new GraphQLEnumType({
  name: 'ProductType',
  values: {
    BOOKS: { value: "BOOKS" },
    CLOTHES: { value: "CLOTHES" },
    SHOES: { value: "SHOES" },
    APPLIANCES: { value: "APPLIANCES" },
    OTHER: { value: "OTHER" }
  }
});

const Product = new GraphQLObjectType({
  name: 'Product',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLFloat) },
    type: { type: new GraphQLNonNull(ProductType) },
    description: { type: GraphQLString },
    photos: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Picture))) },
    averageUsersMark: {
      type: GraphQLFloat,
      description: "Average product's comment mark",
      resolve: ({ id }) =>
        commentStorage.find(id)
        .then(comments => comments.filter(({ mark }) => mark))
        .then(comments => comments.reduce((acc, { mark }) => acc + mark, 0))
    },
    comments: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Comment))),
      description: "Comments list for product",
      args: {
        limit: { type: GraphQLInt, defaultValue: 10 }
      },
      resolve: ({ id }, { limit }) => {
        return commentStorage.findWithLimit(id, limit)
      },
    }
  }
});

const ProductInput = new GraphQLInputObjectType({
  name: 'ProductInput',
  fields: () => ({
    title: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLFloat) },
    type: { type: new GraphQLNonNull(ProductType) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    photos: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PictureInput))) },
  })
});

module.exports = ({
  ProductInput,
  Product,
  ProductType
});