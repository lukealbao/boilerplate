// © λαlbao boilerplate
//
// You should define your restify app here. index.js will require
// it and spool up clustered workers based on this file. You probably
// want to start something like this:
//
var restify = require('restify');
var bunyan = require('bunyan');
var config = require('./config');

var app = restify.createServer({
  name: 'MyAwesomeService',
  log: bunyan.createLogger(config.appLog)
});

module.exports = app;
