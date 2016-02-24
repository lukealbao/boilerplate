#!/usr/bin/env node
/* eslint-disable no-console */
// -*- mode: js3 -*-
//
// This file asks the question: Can I connect to the database
// with my current configurations?

var sprintf = require('util').format;

function printError () {
  var $RED = '\033[0;31m';
  var $CLEAR = '\033[0;38m';
  var argv = Array.prototype.slice.call(arguments);
  var fmtstring = sprintf.apply(null, argv);
  console.log('%s%s%s', $RED, fmtstring, $CLEAR);
}

var db = require(__dirname + '/../../lib/db');

db.databaseVersion()
.then(function (version) {
  console.log('Connected to "%s" database on %s %s',
              db.config.database,
              db.options.dialect, version);
  process.exit(0);
})
.catch(function (error) {
  printError('Could not connect to Database.\nError: %s',
             error.message);
  console.log('Using configuration: %s',
              JSON.stringify(db.config, null, 2));
  process.exit(1);
});
