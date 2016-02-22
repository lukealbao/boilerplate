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
#
# Because of installation restrictions at FP, we usually configure the user's
# environment via a run script rather than system-level environment exports.
# If that is the case with this repository, use the script which exports the
# user's necessary varialbles below for the RUNSCRIPT.

RUNSCRIPT = $(shell env)
CONFIG = ./config


.PHONY: help
help:
	@echo '                    Public Targets'
	@echo '  --------------------------------------------------'
	@echo '   help		: Show this target list'
	@echo '   githooks	: Add pre-commit hooks to git'
	@echo '   checkdb	: Confirm db connectivity (no schema test)'
	@echo '   printcfg	: Print app config with populated environment'
	@echo '   envmap	: Print all declared environment variables with current values'
	@echo '   newdb	: Create a new database according to config' #lines up in console

include ./tools/db/Makefile
include ./tools/make/tests.mk

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

.PHONY: printcfg
printcfg: env.sh
	@echo "Current configuration:"
	@make cfg-

.PHONY: cfg-%
cfg%: env.sh
	@source $<; echo $@ | sed 's/cfg-//' | node ./tools/node-config
	@make clean

.PHONY: printenv
printenv: env.sh
	@echo "Current environment:"
	source $<; node -pe "process.env" | grep "DB\|NODE\|CENTRAL\|FP"

envmap: reqenv.tmp env.sh
	@echo ''
	@echo '          Environment Map               '
	@echo '----------------------------------------'
	@source env.sh; \
	cat $< | node ./tools/node-env.js
	@echo '----------------------------------------'
	@rm -f $<
	@make clean

reqenv.tmp: $(CONFIG)
	egrep -or 'process.env.\w+' $< | sort | uniq | egrep -o [A-Z_]+ \
		> reqenv.tmp

env.sh:
	@rm -f env.sh
	@env >> env.sh
