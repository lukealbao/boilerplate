#! /usr/bin/env node

// -*- mode: js3 -*-
//
// This script will take an fd for a package.json on process.argv[2]
// and edit the elements, writing the changes to the file.
/* eslint-disable no-console */

var fs = require('fs');

var fd = process.argv[2];
var pkg;

// -- Valid package.json? --
function noValid () {
  console.error('There is no valid package.json at \n%s\n', fd);
  process.exit(1);
}
try {fs.accessSync(fd);}
catch (e) { noValid(); }
try { pkg = require(fd); }
catch (e) { noValid(); }
if (!pkg.version && !pkg.name) noValid();
// --- Yep, it's valid --

// -- Edits --
pkg.scripts = pkg.scripts || {};
pkg.name = process.argv[3] || pkg.name;
pkg.scripts.test = 'NODE_ENV=unittest mocha $(find test -name *.test.js)';
pkg.scripts.lint =  'git diff --cached --name-only --diff-filter=ACM '
                    + '| grep \'.js$\' | xargs eslint --fix; exit 0;';
pkg.scripts.start =  'node --harmony index.js';
// -- /Edits --

// -- Write Changes --
var ws = fs.createWriteStream(fd, {flags: 'w', defaultEncoding: 'utf8'});

var success = ws.write(JSON.stringify(pkg, null, 2));
if (!success) process.exit(1);


