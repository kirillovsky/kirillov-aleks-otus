const { GraphQLSchema } = require('graphql');
const QueryRootType = require('./query.js');
const MutationRootType = require('./mutation.js');

module.exports = new GraphQLSchema({
  query: QueryRootType,
  mutation: MutationRootType
});