/* Database fixtures
 * 
 * This file allows you to create fixtures based on your Sequelize
 * models, so that you don't need to use the database to run unit tests.
 * 
 * For any model you would like to mock, add it to module.exports below.
 * The value should be the result of calling <Model>.build(). (See the
 * Sequelize docs on build for API.)
 * 
 * Example:
 * 
 * module.exports = {
 *   thing: db.models.Thing.build({
 *     id: 1,
 *     family: 'amajig',
 *     talking: 'heads'
 *   })
 * };
 * 
 * Then, in your test file:
 * 
 * var thingMock = require('./fixtures').db.thing;
 * sinon.stub(req.db.Thing, 'findOne', function () {
 *   return Promise.resolve(thingMock);
 * });
 */
var db = require(__dirname + '/../../lib/db'); // eslint-disable-line no-unused-vars

module.exports = {

};
