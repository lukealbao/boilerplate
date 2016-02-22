# Build the docs
#
RESTDOWN_EXEC	= ./deps/restdown/bin/restdown
RESTDOWN 	= python $(RESTDOWN_EXEC)
DOC_ROOT	= $(shell pwd)/docs
DOC_BUILD	= $(DOC_ROOT)/public
DOC_INDEX	= $(DOC_BUILD)/index.restdown

.PHONY: docs
docs: index.restdown $(RESTDOWN_EXEC)
	$(RESTDOWN) -b $(DOC_BUILD)/branding -m $(DOC_BUILD) $(DOC_INDEX)

index.restdown: README.md
	@cp README.md $(DOC_BUILD)/index.restdown

$(RESTDOWN_EXEC):
	git submodule init
	git submodule update

README.md:
