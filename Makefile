.PHONY: setup
setup: setup-docker
	@pnpm install
	@echo Makefile target: $@ completed

.PHONY: setup-docker
setup-docker:
	@docker-compose up -d
	@echo Makefile target: $@ completed

.PHONY: dev
dev:
	@pnpm run dev
	@echo Makefile target: $@ completed

.PHONY: build
build:
	@pnpm run build
	@echo Makefile target: $@ completed

.PHONY: lint
lint:
	@pnpm run lint
	@echo Makefile target: $@ completed

.PHONY: run
run: build
	@pnpm run start
	@echo Makefile target: $@ completed
