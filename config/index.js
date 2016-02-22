/* eslint-disable no-console */
/*
 * Config index loader
 * 
 * This config directory must have at least one file called `defaults.js`
 * in it. This file will hold any configurations needed throughout your
 * app. 
 * 
 * To extend other environments, create a file named <environment>.js in 
 * this directory. <environment>.js should export a single object that 
 * extends any configurations in the defaults.js
 * 
 * Example: 
 * 
 * // defaults.js
 *   module.exports = {
 *     name: 'Anakin',
 *     home: 'Tatooine'
 *   };
 *   
 * // jedi.js
 *   var deepCopy = require(__dirname + '/deepCopy');
 *   var defaults = require(__dirname + '/defaults');
 *   module.exports = deepCopy(defaults, {
 *     name: 'Vader',
 *     title: 'Darth'
 *   });
 * 
 * Now, if process.env.NODE_ENV === 'jedi', the value for config.name
 * will be 'Vader', config.title will be 'Darth' - but config.home will
 * still be 'Tatooine'.
 * 
 * Special NOTE on Array values: It is difficult to know what to do when
 * programatically extending Arrays. By default, #deepCopy() will overwrite
 * a #defaults Array with the new one. You can optionally choose to concatenate
 * the existing default Array with the new Array, however. Just add a third 
 * argument to deepCopy():
 * 
 * deepCopy(defaults, {extendedArray: ['newVal']}, true);
 */
var defaults = require(__dirname + '/defaults');
var environment = process.env.NODE_ENV;
var activeConfig;

try {
  activeConfig = require(__dirname + '/' + environment);
} catch (e) {
  if (/Cannot find module/i.test(e.message)) {
    console.error('\t=============== ¡Warning! ===============\n\n'
                  + '  There is no matching configuration for Node environment %j\n'
                  + '  Using default configurations. See config/index.js for details.\n'
                  + '\t=========================================\n',
                  environment);
    activeConfig = defaults;

  } else {
    console.error(e.stack);
    process.exit(1);
  }
}

module.exports = activeConfig;
