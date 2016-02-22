'use strict';
var defaults = require(__dirname + '/defaults');
var deepCopy = require(__dirname + '/deep-copy');
var openFile = require('fs').createWriteStream;
var bunyan = require('bunyan');

module.exports = deepCopy(defaults, {
  appLog: bunyan.createLogger({
    name: 'BuryAppLog',
    streams: [{
      stream: openFile('/dev/null'),
      level: 'info'
    }]
  }),
  auditLog: bunyan.createLogger({
    name: 'BuryAuditLog',
    streams: [{
      stream: openFile('/dev/null'),
      level: 'info'
    }]
  })
});
