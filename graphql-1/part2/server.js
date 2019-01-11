const express = require('express');
const graphqlHTTP = require('express-graphql');

const schema = require('./schema/schema.js');

const port = +process.env.npm_package_config_httpPort;

const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);