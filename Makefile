# © λαlbao Boilerplate Installation Makefile

THIS_DIR		= /Users/firstperformance/Documents/fpdev/boilerplate
SRC_DIR			= $(THIS_DIR)/src
NPM 			= $(shell which npm)
PROJECT_NAME		?=
THIS_FILE		= $(THIS_DIR)/Makefile

# Read input for project name
newproject:
	@while [[ -z "$$BPPROJECTNAME" ]]; \
	do \
	    read -p "Enter a name for your project: " BPPROJECTNAME; \
	done; \
	export PROJECT_NAME="$$BPPROJECTNAME"; \
	make -f $(THIS_FILE) build;

# Echo ok on done
.PHONY:
build: $(NPM) builddir nodedeps addscripts gitready
	@echo ""
	@echo "----------------------------------------------------------------------"
	@echo ""
	@echo "    \033[0;32m$(PROJECT_NAME)\033[0;0m was built in $(BUILD_DIR)"
	@echo ""


# cp source to build
.PHONY: builddir
builddir: dir($(BUILD_DIR))
	cp -r $(SRC_DIR)/. $(BUILD_DIR)

# make source dir if not exists
dir(%):
	mkdir -p $%

# git init; add git hooks
.PHONY: gitready
gitready: nodedeps
	@cd $(BUILD_DIR); \
	git init; \
	make githooks; \
	git add .; \
	git commit -m 'Initial commit'

# Echo ok on npm install
nodedeps: installdeps
	@echo "\n\033[0;32mDependencies installed\033[0;0m"

# npm install
.PHONY: installdeps
installdeps: $(NPM) $(BUILD_DIR)/package.json
	@echo "\nInstalling npm dependencies...\n"
	@cd $(BUILD_DIR); \
	$(NPM) install --save bunyan mysql sequelize restify bluebird; \
	$(NPM) install --save-dev chai eslint istanbul \
	  	         mocha nock sinon supertest

# Edit configs
.PHONY: addscripts
addscripts: ./package.json
	@$(THIS_DIR)/tools/edit-package.js $< $(PROJECT_NAME)
	$(THIS_DIR)/tools/edit-config.js ./config/defaults.js $(PROJECT_NAME)
