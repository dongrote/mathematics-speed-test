'use strict';
const {readdirSync} = require('fs'),
  {basename} = require('path'),
  {mergeTypes} = require('merge-graphql-schemas'),
  typeDefs = readdirSync(__dirname).filter(fname => fname !== 'index.js')
    .map(fname => require(`./${basename(fname, '.js')}`));

exports = module.exports = mergeTypes(typeDefs, {all: true});
