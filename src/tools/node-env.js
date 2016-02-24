/* © λαlbao - Makin' things a bit easier 
 * 
 * This module accepts a list of environmental variables. So it is
 * mostly a duplication of what you can get with ENV(1), with a couple 
 * exceptions: First, it is possible that some variables will be created
 * with shell scripts or the like when invoking Node. Second, we do
 * some additional logic to colorize outputs for undefined values.
 * 
 * It is assumed that the upstream pipe to this file feeds a truncated
 * list. I.e., they will grep out the values that are specific for your Node
 * app. For example, anything with NODE_* or DB_*. 
 * 
 * The best thing to is to pull out any process.env.* lines from your config
 * modules:
 * 
 * $ egrep -or 'process.env.\w+' <config.js> | sort | uniq | egrep -o [A-Z_]+
 * 
 * βoom.
 */

/* eslint-disable no-console */
var sprintf = require('util').format;
function red (s) {
  return sprintf('\033[0;31m%s\033[0;0m', s);
}


var stdin = process.stdin;
stdin.setEncoding('utf8');
var input = '';
var stdinput;

stdin.on('data', function (d) {
  if (!d) return;
  input += d;
});

stdin.on('end', function () {
  stdinput = input.split(/\s+/);
  stdinput.pop(); // null character.
  stdinput.forEach(function (k) {
    var v = process.env[k];
    console.log('%s=%s', k, (v !== undefined ? v : red(v)));
  });
});

