'use strict';

var Sequelize = (process.env.SEQUELIZE === 'hack')
              ? require('sequelize-hack')
              :require('sequelize');
var config = require(__dirname + '/../config').db;
var models = require(__dirname + '/models'); // eslint-disable-line

var db = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.adapter,
  dialectOptions: config.dialectOptions,
  pool: config.pool,
  maxConcurrentQueries: config.maxConcurrentQueries,
  logging: config.logging
});

module.exports = db;
