# λαlbao Boilerplate
This repo provides a barebones structure for a Nodejs service built on
`node-restify` and `sequelize`. It allows easy configuring of separate
environments via extending defaults in the `config/` directory, as
well as some specialized `make` targets for easy setup and deployment.

## Get started
- Download the source @ https://github.com/lukealbao/boilerplate/releases/latest
- Run `git init`
- That's it. If you want deeper instructions (which you do), keep reading.

## Initial configuration
Before you start writing some code, you'll need to do a couple house
cleaning things first.

### Personalize your repo
- [ ] Set up a git pre-commit hook for linting:
  `make githooks`
- [ ] Run `npm install`. Out of the box you will get the dependencies
  listed below.
- [ ] Change the `name` and `version` in `package.json`.

### Configure 
Configuration is a chore. This will be a little easier. This
boilerplate attempts to modularize configuration to facilitate
configuring different environments. Here's what you need to know:

1. An "environment" is defined by the `NODE_ENV` string in the
   environment of the user running the Node process. This appears in
   `process.env.NODE_ENV` variable in a Node process. Setting this is
   done via your shell environment.
2. The `config` folder exports a single object, which contains the
   *active* configuration according to the current
   `NODE_ENV`. Elsewhere in your application code, you should
   `require('./config')` and let the environment set the differences.
3. You set your default configurations in `config/defaults.js`.
4. You set overrides or extensions for various environments by
   configuring `config/<environment-name>.js`.
5. Environment configurations *extend* and *overwrite* defaults. Thus,
   any configuration in the `default.js` that is not overwritten by an
   environment configuration will be present in the exported
   configuration - which helps minimize duplication. 

See `config/index.js` for more details on customizing
configurations. **PROTIP:** From the root of the project directory,
you can call `make printcfg` to see the entire `config` exported in
the current environment, or use `make cfg-<element>` for a specific
item using dot notation. E.g., `make cfg-db.user` will print `root`
under a fresh boilerplate install.

### Set up a database
`make newdb` will give you a new database, provided your database
daemon is running, and you have configured a database name in your `config`.

Once you have defined your models and added them to the object
exported by `lib/db.js`, you can `make checkdb`, and it will create
your schema.

### Conventions

#### App code
- Put your restify declarations in `api.js`. By default, `index.js`
  will spin up a worker running `api.js` for each available CPU.
- Define handlers in the `handlers/` directory. Each file in that
  directory should export a single restify-compliant (i.e.,
  `(req, res, next)` signature) function. The `handlers/index.js`
  helper script will export the `handlers` directory as a single
  object, attaching all files as camelCased sub-object. So if you add
  a new handler in `/handlers/get-all-the-things.js`, you can access
  it with `require('./handlers').getAllTheThings`. Pretty cool!

