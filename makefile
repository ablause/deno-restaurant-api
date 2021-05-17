ENTRY_POINT = server.ts
PERMISSIONS = --allow-env --allow-read --allow-net
IMPORT_MAP = import_map.json
UNSTABLE = true

run:
	deno run $(PERMISSIONS) --import-map $(IMPORT_MAP) $(ENTRY_POINT) --unstable=$(UNSTABLE)

run-watch:
	deno run $(PERMISSIONS) --import-map $(IMPORT_MAP) $(ENTRY_POINT) --watch --unstable=$(UNSTABLE)

test:
	deno test $(PERMISSIONS) --import-map $(IMPORT_MAP) --coverage=$(COVERAGE) --unstable=$(UNSTABLE)