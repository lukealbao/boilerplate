# -*- mode: makefile -*-

KNOWN_MODEL	= "set a model here"

.PHONY: checkdb
checkdb: dbfind
	@make clean
	@echo "\033[0;32mDatabase OK\033[0;37m"

.PHONY: dbfind
dbfind: dbconnect
	@./tools/db/find-db.js $(KNOWN_MODEL)

.PHONY: dbconnect
dbconnect: $(CONFIG) ./lib/db.js
	@./tools/db/check-db.js

.PHONY: newdb
newdb: createdb createschema

.PHONY: createschema
createschema: mysql
	@echo "Syncing data models";
	@node tools/db/create-schema.js;
	@echo "...\033[0;32mok\033[0;0m";

.PHONY: createdb
createdb:
	@echo Using adapter $(DB_ADAPTER)
	@make newdb-$(DB_ADAPTER)

newdb-mssql:
	@echo "Creating new database: [$(shell make cfg-db.database)]"
	@node tools/db/init-mssql-db.js
	@echo "...\033[0;32mok\033[0;0m"

newdb-mysql: mysql
	@echo "Creating new database: [$(shell make cfg-db.database)]";
	@node tools/db/init-mysql-db.js
	@echo "...\033[0;32mok\033[0;0m"

setvar:
USER = $@

.PHONY: mysql
mysql:
	@which mysql > /dev/null
