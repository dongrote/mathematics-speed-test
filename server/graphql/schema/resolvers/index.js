'use strict';
const {readdirSync} = require('fs'),
  {basename} = require('path'),
  {mergeResolvers} = require('merge-graphql-schemas'),
  resolvers = readdirSync(__dirname).filter(fname => fname !== 'index.js')
    .map(fname => require(`./${basename(fname, '.js')}`));

exports = module.exports = mergeResolvers(resolvers);
