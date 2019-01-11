const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString
} = require('graphql');
const { User } = require('./user');
const { GraphQLDateTime } = require('graphql-custom-types');

const Comment = new GraphQLObjectType({
  name: 'Comment',
  fields: {
    userId: { type: new GraphQLNonNull(GraphQLInt) },
    user: {
      type: new GraphQLNonNull(User),
      description: "Comment author",
      //todo: get user by id
      resolve: ({ userId }, _, context) => Promise.resolve({
        id: userId,
        login: "KEK",
        passwordHash: "111!",
      })
    },
    productId: { type: new GraphQLNonNull(GraphQLInt) },
    text: { type: new GraphQLNonNull(GraphQLString) },
    mark: { type: GraphQLInt },
    created: { type: new GraphQLNonNull(GraphQLDateTime) }
  }
});

const CommentInput = new GraphQLInputObjectType({
  name: 'CommentInput',
  fields: {
    userId: { type: new GraphQLNonNull(GraphQLInt) },
    productId: { type: new GraphQLNonNull(GraphQLInt) },
    text: { type: new GraphQLNonNull(GraphQLString) },
    mark: { type: GraphQLInt },
  }
});

module.exports = { Comment, CommentInput };