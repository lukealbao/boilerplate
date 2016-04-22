'use strict';

var development = require(__dirname + '/development');
var deepCopy = require(__dirname + '/deep-copy');
var devnull = require('dev-null')();
module.exports = deepCopy(development, {
  appLog: {
    name: 'BuryAppLog',
    streams: [{
      stream: devnull,
      level: 'info'
    }]
  },
  auditLog: {
    name: 'BuryAuditLog',
    streams: [{
      stream: devnull,
      level: 'info'
    }]
  }
});
