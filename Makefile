# © λαlbao Boilerplate Installation Makefile

BUILD_DIR		= ./build
SRC_DIR			= ./src
NPM 			= $(shell which npm)


.PHONY: movetarget
movetarget: $(BUILD_DIR) addscripts nodedeps gitready
	@echo "\n\n--------------------------------------------------\n\n"
	@export target=$(BUILD_DIR); \
	read -p "Enter a path to build the project ($(BUILD_DIR)): " target; \
	mv $< $$target; \
	echo "\n\033[0;32mProject Built\033[0;0m: $$target\n";

.PHONY: gitready
gitready: nodedeps
	@cd $(BUILD_DIR); \
	git init; \
	make githooks; \
	git add .; \
	git commit -m 'Initial commit'

nodedeps: installdeps
	@echo "\n\033[0;32mDependencies installed\033[0;0m"

.PHONY: installdeps
installdeps: $(NPM) $(BUILD_DIR)/package.json
	@echo "\nInstalling npm dependencies...\n"
	@cd $(BUILD_DIR); \
	$(NPM) install --save bunyan mysql sequelize restify bluebird; \
	$(NPM) install --save-dev chai eslint istanbul \
	 	         mocha nock sinon supertest

.PHONY: addscripts
addscripts: $(BUILD_DIR)/package.json
	@./tools/edit-package.js $<

$(BUILD_DIR)/package.json: $(NPM) $(BUILD_DIR)
	@cp -r src/. $(BUILD_DIR); cd $(BUILD_DIR); \
	$(NPM) init

$(BUILD_DIR):
	rm -rf $(BUILD_DIR)
	@mkdir $(BUILD_DIR)
