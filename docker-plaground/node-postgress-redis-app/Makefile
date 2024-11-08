# Variables
BACKEND_IMAGE=my-node-app
POSTGRES_IMAGE=my-postgres
REDIS_IMAGE=my-redis
BACKEND_CONTAINER=my-node-app-container
POSTGRES_CONTAINER=my-postgres-container
REDIS_CONTAINER=my-redis-container

# Build backend image
build-backend:
	docker build -t $(BACKEND_IMAGE) -f Dockerfile.backend .

# Run backend container in detached mode
run-backend:
	docker run --name $(BACKEND_CONTAINER) -d -p 5000:5000 $(BACKEND_IMAGE)

# Build PostgreSQL image
build-postgres:
	docker build -t $(POSTGRES_IMAGE) -f Dockerfile.postgres .

# Run PostgreSQL container
run-postgres:
	docker run -d -p 5432:5432 --name $(POSTGRES_CONTAINER) $(POSTGRES_IMAGE)

# Build Redis image
build-redis:
	docker build -t $(REDIS_IMAGE) -f Dockerfile.redis .

# Run Redis container
run-redis:
	docker run --name $(REDIS_CONTAINER) -d -p 6379:6379 $(REDIS_IMAGE)

# Stop and remove all containers
stop-containers:
	docker stop $(BACKEND_CONTAINER) $(POSTGRES_CONTAINER) $(REDIS_CONTAINER) || true

remove-containers:
	docker rm $(BACKEND_CONTAINER) $(POSTGRES_CONTAINER) $(REDIS_CONTAINER) || true

# Remove all images
remove-images:
	docker rmi $(BACKEND_IMAGE) $(POSTGRES_IMAGE) $(REDIS_IMAGE) || true

#------------------------------------------------------
#------------------------------------------------------
#------------------------------------------------------
# Full build (backend, postgres, redis)
build:
	make build-backend
	make build-postgres
	make build-redis

# Full run (backend, postgres, redis)
run:
	make run-backend
	make run-postgres
	make run-redis

# Full clean up (stop, remove containers, remove images)
clean:
	make stop-containers
	make remove-containers
	make remove-images
