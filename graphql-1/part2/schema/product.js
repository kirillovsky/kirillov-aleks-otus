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
      //todo: same
      resolve: (source, _, context) => {
        //todo: get average mark from products comments
        return Promise.resolve(42)
      }
    },
    comments: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Comment))), //todo: create comment
      description: "Comments list for product",
      args: {
        limit: { type: GraphQLInt, defaultValue: 10 }
      },
      resolve: (source, { limit }, context) => {
        //todo: get product comments
        return Promise.resolve([])
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