'use strict';

var path = require('path');
var defaults = require(__dirname + '/defaults');
var deepCopy = require(__dirname + '/deep-copy');
var openFile = require('fs').createWriteStream;
var sqlLog = openFile(path.resolve('/../log/sql.log'),
                      { defaultEncoding: 'utf8', flags: 'a'});
var sprintf = require('util').format;

module.exports = deepCopy(defaults, {
  db: {
    adapter: 'mysql',
    host: 'localhost',
    user: 'root',
    password: '',
    logging: function (s) {
      var line = sprintf('[%s] %s\n', new Date().toJSON(), s);
      sqlLog.write(line);
    }
  }
});
