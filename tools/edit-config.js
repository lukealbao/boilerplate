#! /usr/bin/env node

// -*- mode: js3 -*-
//
// This script will take an fd for a defaults.json on process.argv[2]
// and edit the elements, writing the changes to the file.
/* eslint-disable no-console */

var fs = require('fs');

var fd = process.argv[2];
var cfg;

// -- Valid config? --
function noValid () {
  console.error('There is no valid config file at \n%s\n', fd);
  process.exit(1);
}
try {fs.accessSync(fd);}
catch (e) { noValid(); }
try { cfg = require(fd); }
catch (e) { noValid(); }
if (!cfg.db.database) noValid();
// --- Yep, it's valid --

// -- Edits --
function lower (s) {return s.toLowerCase();}
var appName = process.argv[3] || '';
var nameChunks = appName.split(/\W/);
var dbName = nameChunks.map(lower).join('_');
var pascalName = nameChunks.map(function (str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}).join('');
// -- /Edits --

// -- Write Edits --
var rs = fs.readFileSync(fd, {flags: 'r+', defaultEncoding: 'utf8'});
var str = rs.toString('utf8');

str = str.replace(/\bBoilerplate/g, pascalName);
str = str.replace(/boilerplatedb/g, dbName);

var ws = fs.createWriteStream(fd, {flags: 'w+', defaultEncoding: 'utf8'});
var success = ws.write(str);
// -- /Write --

if (!success) process.exit(1);


