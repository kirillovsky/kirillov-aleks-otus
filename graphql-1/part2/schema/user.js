const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString
} = require("graphql");
const { GraphQLEmail } = require('graphql-custom-types');
const { Picture, PictureInput } = require("./picture.js");

const User = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    login: { type: new GraphQLNonNull(GraphQLString) },
    passwordHash: { type: new GraphQLNonNull(GraphQLString) },
    avatar: { type: Picture },
    email: { type: GraphQLEmail },
    fullName: { type: GraphQLString },
    address: { type: GraphQLString },
  }
});

const UserInput = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    login: { type: new GraphQLNonNull(GraphQLString) },
    passwordHash: { type: new GraphQLNonNull(GraphQLString) },
    avatar: { type: PictureInput },
    email: { type: GraphQLEmail },
    fullName: { type: GraphQLString },
    address: { type: GraphQLString },
  }
});

module.exports = {
  User,
  UserInput
};