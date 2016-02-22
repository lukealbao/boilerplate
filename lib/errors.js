'use strict';

var restify = require('restify');
var util = require('util');
var config = require(__dirname + '/../config');

function ValidationError (fields) {
  restify.InvalidContentError.call(this, {
    statusCode: 400,
    message: 'Some parameters were not valid',
    constructorOpt: ValidationError
  });
  
  this.name = 'ValidationError';
  this.body.detail = {
    failedParameters: fields
  };
};
util.inherits(ValidationError, restify.RestError);

function NoDatabaseResourceError (name, dbHost) {
  restify.ResourceNotFoundError.call(this, {
    statusCode: 404,
    message: 'The requested resource was not found',
    constructorOpt: NoDatabaseResourceError
  });

  this.name = 'ResourceNotFoundError';
  this.body.detail = {
    requestedResource: name,
    dbHost: dbHost || config.db.host
  };
}
util.inherits(NoDatabaseResourceError, restify.RestError);

module.exports.ValidationError = ValidationError;
module.exports.NoDatabaseResourceError = NoDatabaseResourceError;

for (var constructor in restify.errors) {
  module.exports[constructor] = restify.errors[constructor];
}
