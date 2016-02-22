'use strict';

var defaults = require(__dirname + '/defaults');
var deepCopy = require(__dirname + '/deep-copy');
var openFile = require('fs').createWriteStream;

module.exports = deepCopy(defaults, {
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
