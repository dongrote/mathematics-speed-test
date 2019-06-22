'use strict';
const {makeExecutableSchema} = require('graphql-tools'),
  typeDefs = require('./types'),
  resolvers = require('./resolvers');

exports = module.exports = makeExecutableSchema({typeDefs, resolvers});
