# Build the docs
#
RESTDOWN_DIR	= ./node_modules/.restdown
RESTDOWN_EXEC	= $(RESTDOWN_DIR)/bin/restdown
RESTDOWN 	= python $(RESTDOWN_EXEC)
DOC_ROOT	= $(shell pwd)/docs
DOC_BUILD	= $(DOC_ROOT)/public
DOC_INDEX	= $(DOC_ROOT)/index.restdown

.PHONY: docs
docs: $(DOC_ROOT)/index.html
	@echo "API Doc at $(DOC_ROOT)/index.html"

$(DOC_ROOT)/index.html: $(RESTDOWN_EXEC)
	$(RESTDOWN) -b $(DOC_BUILD)/branding -m $(DOC_ROOT) $(DOC_INDEX)

$(RESTDOWN_EXEC): $(shell which git)
	git clone git://github.com/trentm/restdown.git $(RESTDOWN_DIR)
