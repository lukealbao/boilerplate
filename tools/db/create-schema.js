#!/usr/bin/env node
/* eslint-disable no-console */
// -*- mode: js3 -*-

var db = require('../../lib/db');

db.sync()
.then(function () {
  process.exit(0);
})
.catch(function (error) {
  console.error('\033[0;31m[%s]: %s\033[0;0m', error.name, error.message);
  process.exit(1);
});
