/* © λαlbao - Makin' things a bit easier 
 * 
 * This module accepts a string representing a configuration argument and
 * prints its computed value to stdout. You can use this to programatically
 * pipe shit around and inspect the current configuration of your app.
 * 
 * Passing in an empty string will result in the entire config object
 * being printed.
 * 
 * If you would like to get a value for a deeper layer, use dot notation, even
 * for Array indexes:
 * 
 * $ echo appLog.streams.0 # gives you config.appLog.streams[0]
 * 
 * Process will exit with 1 if the requested value is undefined. Note: it
 * will exit with 0 if the value is falsy - null or empty string, etc.
 * 
 * Caveats: You can get the entire config object, or an entire subtree. You
 * cannot get multiple values. 
 */

/* eslint-disable no-console */
var config = require(__dirname + '/../config');

var stdin = process.stdin;
stdin.setEncoding('utf8');
var input = '';
var stdinput;

stdin.on('data', function (d) {
  if (!d) return;
  input += d;
});

setTimeout(function () {
  stdin.emit('end');
}, 100);

stdin.once('end', function () {
  stdinput = input.split('.');
  var element;
  var target = config;
  while ( (element = stdinput.shift()) ) {
    element = element.trim();

    if (!element) break;
    target = target[element];
  }

  console.log(target);
  if (target === undefined) process.exit(1);
});

