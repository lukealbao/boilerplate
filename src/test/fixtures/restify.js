function noop () {}
var appModels = require(__dirname + '/../../api').server.dbModels;
var errors = require(__dirname + '/../../lib/errors');

module.exports = {
  req: {
    log: {
      trace: noop, debug: noop, info: noop,
      warn: noop, error: noop, fatal: noop
    },
    db: appModels,
    params: {},
    $scope: {},
    errors: errors,
    header: noop
  },

  res: {
    send: noop,
    header: noop
  }
};
