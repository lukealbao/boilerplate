// © λαlbao boilerplate
//
// You should define your restify app here. index.js will require
// it and spool up clustered workers based on this file. You should
// structure things in such a way that unit tests can require this
// file and get the server exported by restify.createServer.
//
//You probably want to start something like this:

'use strict';

var http = require('https');
var restify = require('restify');
var bunyan = require('bunyan');
var config = require(__dirname + '/config');

var handlers = require(__dirname + '/handlers'); // eslint-disable-line 
var errors = require(__dirname + '/lib/errors');
var models = require(__dirname + '/lib/db').models;

var app = restify.createServer({
  name: config.server.name,
  log: bunyan.createLogger(config.appLog)
});

app.pre(function quietHealthChecks (req, res, next) {
  // Perform any logic here to fulfill your health check, but
  // send null if the x-health-check header is set, and it won't
  // appear in your server logs.
  if (req.headers['x-health-check'] !== undefined) {
    res.send(204);
    return null; // No logging &c.
  }
  return next();
});

app.use(restify.requestLogger());
app.use(restify.gzipResponse());

app.use(function setupHeaders (req, res, next) {
  res.header('Server', app.name);
  res.header('X-Request-Id', req._id);
  next();
});

app.use(function trafficLogger (req, res, next) {
  req.log.info({reqId: req._id}, 'HTTP Request');
  res.once('finish', function resLogger () {
    req.log.info({res: res.statusCode}, 'HTTP Response');
  });
  next();
});

app.server._httpAgent = new http.Agent({
  keepAlive: true,
  keepAliveMsecs: 1000,
  maxSockets: 100, // Per CPU!
  maxFreeSockets: 100 // Per CPU!
});

app.server.dbModels = models;
app.server._errors = errors;
app.use(function setupScope (req, res, next) {
  req.$scope = {};
  req.db = app.server.dbModels;
  req.errors = app.server._errors;

  // This is fairly slow, so if you only need it for specific
  // routes, you should do individually!
  req.client = restify.createJsonClient({
    agent: app.server._httpAgent,
    headers: {
      'x-request-id': req._id
    }
  });

  next();
});

app.on('after', restify.auditLogger({
  log: bunyan.createLogger(config.auditLog)
}));

app.on('uncaughtException', function (req, res, route, err) {
  req.log.fatal({
    route: route.name,
    err: {
      name: err.name,
      message: err.message,
      stack: err.stack
    }}, 'Uncaught Exception');

  res.send(err);
  process.exit(1);
});

// -- ROUTES GO HERE
app.get('/echo', function echo (req, res, next) {
  res.header('content-type', 'text/plain');
  res.send(200, 'Copasetic, Jack!\n');
  next();
});


module.exports = app;
