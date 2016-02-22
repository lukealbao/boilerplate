'use strict';

var bunyan = require('bunyan');
var fs = require('fs');

module.exports = {
  server: {
    name: 'BoilerplateApp',
    host: '0.0.0.0',
    port: 4434
  },
  db: {
    adapter: process.env.DB_ADAPTER,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    dialectOptions: {
    },
    pool: {
      maxIdleTime: ~~process.env.DB_MAX_IDLE_TIME || 2 * 1000,
      minConnections: ~~process.env.DB_MIN_CONNECTIONS || 10,
      maxConnections: ~~process.env.DB_MAX_CONNECTIONS || 20
    },
    logging: false
  },
  appLog: {
    name: 'BoilerplateApplog',
    streams: [{
      stream: process.stdout,
      level: 'debug'
    }]
  },
  devLog: {
    name: 'BoilerplateAuditLog',
    stream: fs.createWriteStream('/tmp/audit.log', {
      defaultEncoding: 'utf8'
    })
  }
};
