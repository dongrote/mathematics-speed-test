'use strict';
const _ = require('lodash'),
  express = require('express'),
  HttpError = require('http-error-constructor'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan'),
  graphql = require('./graphql'),
  log = require('debug-logger')('app');

const indexRouter = require('./routes/index'),
  app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/graphql', graphql);

app.use((req, res, next) => next(new HttpError(404)));
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = _.get(err, 'statusCode', 500);
  log.error(err);
  res.status(status).json({err});
});

module.exports = app;
