'use strict';

var development = require(__dirname + '/development');
var deepCopy = require(__dirname + '/deep-copy');
var openFile = require('fs').createWriteStream;

module.exports = deepCopy(development, {
  appLog: {
    name: 'BuryAppLog',
    streams: [{
      stream: openFile('/dev/null'),
      level: 'info'
    }]
  },
  auditLog: {
    name: 'BuryAuditLog',
    streams: [{
      stream: openFile('/dev/null'),
      level: 'info'
    }]
  }
});
