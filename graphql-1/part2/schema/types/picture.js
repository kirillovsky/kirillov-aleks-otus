const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLInt
} = require("graphql");

const { GraphQLURL } = require('graphql-custom-types');

const Picture = new GraphQLObjectType({
  name: 'Picture',
  fields: {
    width: { type: new GraphQLNonNull(GraphQLInt) },
    height: { type: new GraphQLNonNull(GraphQLInt) },
    url: { type: new GraphQLNonNull(GraphQLURL) }
  }
});

const PictureInput = new GraphQLInputObjectType({
  name: 'PictureInput',
  fields: {
    width: { type: new GraphQLNonNull(GraphQLInt) },
    height: { type: new GraphQLNonNull(GraphQLInt) },
    url: { type: new GraphQLNonNull(GraphQLURL) }
  }
});

module.exports = { Picture, PictureInput };