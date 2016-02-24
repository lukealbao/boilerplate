#!/usr/bin/env node
/* eslint-disable no-console */
// -*- mode: js3 -*-

var sprintf = require('util').format;
var config = require('../../config').db;
var db = require('../../lib/db');


var queries = {
  create: sprintf('CREATE database IF NOT EXISTS %s;',
                  config.database),

  show: 'SHOW databases',

  drop: sprintf('DROP database IF EXISTS %s',
                config.database)
};

var query = process.argv[2] || 'create';

db.query(queries[query])
.catch(function (err) {
  // node-mysql will error if the db does not exist. Since
  // that's what we're trying to do, it's likely we'd get
  // this error. So let's reconnect without a database in order
  // to create it.
  if (/Unknown database/i.test(err.message)) {
    delete db.connectionManager.config.database;
    return db.query(queries[query]);
  } else {
    throw err;
  }
})
.then(function (res) {
  if (query === 'show') console.log(res[0]);
  process.exit(0);
})
.catch(function (err) {
  console.log(err, err.stack);
  process.exit(1);
});
