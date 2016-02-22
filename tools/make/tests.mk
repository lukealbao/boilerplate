# © λαlbao - Makin' things a bit easier
#
# Public recipes:
# make test	- Lint and test only changed files
# make lintall	- Lint everything
# make lintfix	- Lint everything, autofix
# make prepush  - Lint everything, test everything


BIN		:= ./node_modules/.bin
ESLINT 		:= $(BIN)/eslint
REPORTER	?= spec
MOCHA		?= $(BIN)/mocha
TEST_FILES	?= $(shell git diff --name-only | grep test.js$)
LINT_FILES	?= $(shell git diff --name-only | grep .js$)
STAGED_FILES	:= $(shell git diff --name-only --cached | grep .js$)
MODIFIED_FILES	:= $(shell git diff --name-only | grep .js$)

include ./tools/make/style.defs

.PHONY: test
test: lintfix
	@ TITLE="Unit tests" make title
	@ make runmocha

.PHONY: lintfix
lintfix:
	@TITLE="Lintin & Fixin" make title
	@$(ESLINT) $(LINT_FILES)
	@echo "$(GREEN)Style checksout $(SUNGLASSES)$(CLEAR)"


.PHONY: prepush
prepush: lintall
	@TITLE="Unit tests" make title
	@TEST_FILES="./test" make runmocha

.PHONY: lintall
lintall:
	@TITLE="Javascript Style" make title
	@LINT_FILES='.' make runeslint
	@echo "$(GREEN)Style checks out$(SUNGLASSES)$(CLEAR)"

.PHONY: runmocha
runmocha:
	$(MOCHA) $(TEST_FILES) --recursive --reporter $(REPORTER)

.PHONY: runeslint
runeslint:
	$(ESLINT) $(LINT_FILES)


