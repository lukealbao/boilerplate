#!/usr/bin/env node
/* eslint-disable no-console */
// -*- mode: js3 -*-

var sprintf = require('util').format;
var config = require('../../config').db;
var db = require('../../lib/db').db;

var queries = {
  create: sprintf('USE master\n'
                 + 'IF db_id(\'%s\') is null\n'
                 + 'CREATE DATABASE %s',
                  config.database, config.database),

  show: 'USE master \n'
      + 'SELECT name from sys.databases',

  drop: sprintf('USE master\n'
               + 'DROP DATABASE %s',
                config.database)
};

var query = process.argv[2] || 'create';

db.query(queries[query])
.then(function () {
  process.exit(0);
})
.catch(function (err) {
  console.error(err);
  process.exit(1);
});
