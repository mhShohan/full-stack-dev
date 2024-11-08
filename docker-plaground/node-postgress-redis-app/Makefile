# Variables
NETWORK=my-app-network
BACKEND_IMAGE=my-app-image
POSTGRES_IMAGE=my-postgres
REDIS_IMAGE=my-redis
BACKEND_CONTAINER=my-app-container
POSTGRES_CONTAINER=my-postgres-container
REDIS_CONTAINER=my-redis-container

# Create Docker network
create-network:
	docker network create $(NETWORK) || true

# Build backend image
build-backend:
	docker build -t $(BACKEND_IMAGE) -f Dockerfile.backend .

# Run backend container
run-backend:
	docker run --name $(BACKEND_CONTAINER) --network $(NETWORK) -p 5000:5000 $(BACKEND_IMAGE)

# Run backend container in detached mode
run-backend-detached:
	docker run --name $(BACKEND_CONTAINER) --network $(NETWORK) -d -p 5000:5000 $(BACKEND_IMAGE)

# Build PostgreSQL image
build-postgres:
	docker build -t $(POSTGRES_IMAGE) -f Dockerfile.postgres .

# Run PostgreSQL container
run-postgres:
	docker run -d --name $(POSTGRES_CONTAINER) --network $(NETWORK) -p 5432:5432 $(POSTGRES_IMAGE)

# Build Redis image
build-redis:
	docker build -t $(REDIS_IMAGE) -f Dockerfile.redis .

# Run Redis container
run-redis:
	docker run -d --name $(REDIS_CONTAINER) --network $(NETWORK) -p 6379:6379 $(REDIS_IMAGE)

# Stop and remove all containers
stop-containers:
	docker stop $(BACKEND_CONTAINER) $(POSTGRES_CONTAINER) $(REDIS_CONTAINER) || true

remove-containers:
	docker rm $(BACKEND_CONTAINER) $(POSTGRES_CONTAINER) $(REDIS_CONTAINER) || true

# Remove all images
remove-images:
	docker rmi $(BACKEND_IMAGE) $(POSTGRES_IMAGE) $(REDIS_IMAGE) || true

# Remove network
remove-network:
	docker network rm $(NETWORK) || true

#------------------------------------------------------
#------------------------------------------------------
#------------------------------------------------------
# Full build (backend, postgres, redis)
build:
	make create-network
	make build-postgres
	make build-redis
	make build-backend
	echo "Build completed successfully"

# Full run (backend, postgres, redis)
run:
	make run-postgres
	make run-redis
	make run-backend
	echo "Run all container successfully"

# Full clean up (stop, remove containers, remove images)
clean:
	make stop-containers
	make remove-containers
	make remove-images
	make remove-network
	echo "Clean up completed successfully"
