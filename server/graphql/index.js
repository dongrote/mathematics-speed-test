'use strict';
const _ = require('lodash'),
  expressGraphQL = require('express-graphql'),
  graphiql = _.has(process.env, 'GRAPHIQL') ? process.env.GRAPHIQL === 'true' : false,
  schema = require('./schema');

exports = module.exports = expressGraphQL({schema, graphiql});
