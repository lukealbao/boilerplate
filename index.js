'use strict';

var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var config = require(__dirname + '/config');
var sprintf = require('util').format;
var api;
var log = require('bunyan').createLogger(config.appLog);

if (cluster.isMaster) {
  log.info('Master Process is online');
  for (var w = 0; w < numCPUs; w++) {
    cluster.fork();
  }
  cluster.on('exit', function (worker) {
    log.error({workerPid: worker.process.pid}, 'Worker died');
    cluster.fork();
  });

  cluster.on('online', function (worker) {
    log.info({pid: worker.process.pid}, 'New Worker online');
  });

} else {
  api = require(__dirname + '/api');
  process.nextTick(function () {
    api.listen(config.server.port, function () {
      log.info(sprintf('Server accepting requests on port %d',
                      config.server.port));
    });
  });
}

process.on('uncaughtException', function psUncaughtException (error) {
  log.fatal({err: error}, 'Uncaught Exception. Killing process now.');
  process.kill(1);
});

