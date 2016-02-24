#! /usr/bin/env node
/* eslint-disable no-console */

// This file asks the question: Can I issue a query on the
// model passed to argv[2] using my current database?


var sprintf = require('util').format;
var KNOWN_MODEL = process.argv[2];

function printError () {
  var $RED = '\033[0;31m';
  var $CLEAR = '\033[0;38m';
  var argv = Array.prototype.slice.call(arguments);
  var fmtstring = sprintf.apply(null, argv);
  console.log('%s%s%s', $RED, fmtstring, $CLEAR);
}

var db = require(__dirname + '/../../lib/db');

if (!db.models[KNOWN_MODEL]) {
  printError('The model -%s- is not known to this database.\n'
             + 'See the KNOWN_MODEL definition in tools/db/Makefile.',
             KNOWN_MODEL);
  process.exit(1);
}

db.models[KNOWN_MODEL].findOne()
.then(function () {
  var tname = db.models[KNOWN_MODEL].tableName;
  console.log('Successfully executed "SELECT" on "%s" table', tname);
  process.exit(0);
})
.catch(function (error) {
  printError('Could not access the -%s- table.\nError: %s',
             db.models[KNOWN_MODEL].tableName,
             error.message);
  process.exit(1);
});
