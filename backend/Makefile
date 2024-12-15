# Define variables
DOCKER_COMPOSE = docker-compose
PROJECT_NAME = finance-tracker
ENV_FILE = .env


# Define a function to build containers
define build
	@echo "Building containers..."
	$(DOCKER_COMPOSE) up --build -d
endef


# Define a function to build and run Docker containers
define install_packages_dev
	@echo "Installing dependencies for dev environment..."
	npm install
endef

# Define a function to generate Prisma client for dev environment
define generate_prisma_dev
	@echo "Generating Prisma client for dev environment..."
	npx prisma generate
endef

# Define a function to install dependencies for containers
define install_packages_container
	@echo "Installing dependencies for containers..."
	$(DOCKER_COMPOSE) exec app npm install
	$(DOCKER_COMPOSE) exec worker npm install
endef

# Define a function to run migration
define run_migrations
	@echo "Running migrations..."
	$(DOCKER_COMPOSE) exec app npx prisma migrate dev
endef

# Define a function to generate Prisma client for containers
define generate_prisma_container
	@echo "Generating Prisma client for containers..."
	$(DOCKER_COMPOSE) exec app npx prisma generate
	$(DOCKER_COMPOSE) exec worker npx prisma generate
endef

# Default target
.PHONY: all
all: help

# Bootstrap the project (install dependencies, build, generate Prisma client)
.PHONY: bootstrap
bootstrap:
	@echo "Bootstrapping the project..."

	$(call install_packages_dev)

	$(call generate_prisma_dev)

	$(call build)

	$(call install_packages_container)

	$(call run_migrations)

	$(call generate_prisma_container)

	@echo "Bootstrap complete!"


.PHONY: install
install:
	$(call install_packages_container)

# Start the application using Docker Compose
.PHONY: up
up:
	@echo "Starting the application..."
	$(DOCKER_COMPOSE) up -d

.PHONY: down
down:
	@echo "Stopping the application..."
	$(DOCKER_COMPOSE) down

# Run Prisma migrations
.PHONY: migrate
migrate:
	$(call run_migrations)
	$(call generate_prisma_container)


# Run Prisma migrations
.PHONY: migrate-schema
migrate-schema:
	@if [ -z "$(name)" ]; then \
		echo "Usage: make migrate:schema name=<migration_name>"; \
		exit 1; \
	fi
	@echo "Running Prisma migration with name: $(name)"
	$(DOCKER_COMPOSE) exec app npx prisma migrate dev --name "$(name)"
	$(call generate_prisma_container)
	$(call generate_prisma_dev)

# Run Prisma migrations
.PHONY: seed-category
seed-category:
	docker-compose exec app npm run prima:seed-category

# Display help
.PHONY: help
help:
	@echo "Available targets:"
	@echo "  bootstrap: Install dependencies, build, and generate Prisma client"
	@echo "  install: Install dependencies for containers"
	@echo "  up: Start the application using Docker Compose"
	@echo "  stop: Stop the application using Docker Compose"
	@echo "  migrate: Run Prisma migrations"
	@echo "  migrate-schema: Run Prisma migration with a specific name"
	@echo "  seed-category: Seed categories"
