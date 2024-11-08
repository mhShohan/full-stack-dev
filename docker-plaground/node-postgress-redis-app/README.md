# Run PostgreSQL and redis using Dockerfile and build the image to run this application

## 00.30

# Used Commands:

```bash
# Build backend image using Specific Dockerfile
docker build -t app -f Dockerfile.backend .

# Run the image
docker run --name app -p 5000:5000 app
# for detached mode
docker run --name app -d -p 5000:5000 app


# Build postgres database image using Specific Dockerfile
docker build -t my-postgres -f Dockerfile.postgres .

# Run the image
docker run -d -p 5432:5432 --name my-postgres-container my-postgres

# Build redis image using Specific Dockerfile
docker build -t my-redis -f Dockerfile.redis .

# Run the image
docker run --name my-redis-container -d -p 6379:6379 my-redis
```
