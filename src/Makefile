# © λαlbao - Makin' things a bit easier 
#
# 
#                    Public Targets
#  --------------------------------------------------
#   help	: Show this target list
#   checkdb	: Confirm db connectivity (no schema test)
#   printcfg	: Print app config with populated environment
#   envmap	: Print all declared environment variables with current values
#   newdb	: Create a new database according to config

CONFIG = ./config


.PHONY: help
help:
	@echo '                    Public Targets'
	@echo '  --------------------------------------------------'
	@echo '   help		: Show this target list'
	@echo '   init		: One-time initialization for dev environment'
	@echo '   githooks	: Add pre-commit hooks to git'
	@echo '   checkdb	: Confirm db connectivity (no schema test)'
	@echo '   printcfg	: Print app config with populated environment'
	@echo '   envmap	: Print all declared environment variables with current values'
	@echo '   newdb	: Create a new database according to config' #lines up in console
	@echo '   docs		: Generate HTML docs docs/index.restdown -> docs/public/index.html'
	@echo ''

include ./tools/db/Makefile
include ./tools/make/tests.mk
include ./tools/make/docs.mk

.PHONY: init
init: NPM githooks node_modules
	@sprintf("\nOk, time to write some code!\n")

node_modules: NPM
	@sprintf("Installing all NPM dependencies...")
	@npm install

.PHONY: NPM
NPM:
	@npm update -g npm

.PHONY: githooks
githooks: .git/hooks/pre-commit
	@echo OK

.git/hooks/pre-commit: addhooks

.PHONY: addhooks
addhooks: ./tools/hooks/pre-commit
	cp $< .git/hooks/
	chmod +x $<

.PHONY: clean
clean:
	@rm -f env.sh
	@rm -f reqenv.tmp

.PHONY: printcfg
printcfg:
	@echo "Current configuration:"
	@make cfg-

.PHONY: cfg-%
cfg%:
	@echo $@ | sed 's/cfg-//' | node ./tools/node-config
	@make clean

.PHONY: printenv
printenv:
	@echo "Current environment:"
	source $<; node -pe "process.env" | grep "DB\|NODE\|CENTRAL\|FP"

envmap: reqenv.tmp
	@echo ''
	@echo '          Environment Map               '
	@echo '----------------------------------------'
	@cat $< | node ./tools/node-env.js
	@echo '----------------------------------------'
	@make clean

reqenv.tmp: $(CONFIG)
	egrep -or 'process.env.\w+' $< | sort | uniq | egrep -o [A-Z_]+ \
		> reqenv.tmp
