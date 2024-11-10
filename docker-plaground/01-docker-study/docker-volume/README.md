# Docker volume

Volume is a way to persist data in docker container. It is a way to share data between host and container. There are three types of volumes in docker:

1. **_Anonymous volume_** - created by docker itself and not named by user. It is created when user does not specify volume name. It is difficult to manage. It is not recommended to use anonymous volume. Ii will be removed when container is removed.

   ```bash
     docker run -p 5000:5000 --name node-app -v /app node-app-image ## with anonymous volume
   ```

2. **_Named volume_** - created by user and named by user. It is created when user specify volume name. It is easy to manage. It will not be removed when container is removed.

   ```bash
     docker run -p 5000:5000 --name node-app -v node-app:/app node-app-image ## with named volume
   ```

3. **_Bind mount_** - created by user and named by user. It is created when user specify volume name and path. It is easy to manage. It will not be removed when container is removed.
   ```bash
     docker run -p 5000:5000 --name node-app -v $(pwd):/app node-app-image ## with bind mount
   ```

```bash
docker volume ls ## list volumes
docker volume inspect node-app ## inspect volume
docker volume rm node-app ## remove volume
docker volume prune ## remove all volumes
```

# Docker Multi Container Cheat Sheet with volume

1. create a Docker Network

```bash
docker network create my-net
```

2. run Mongo DB Container

```bash
 docker run --name mongodb --rm -v my-docker-db:/data/db --network my-net -e MONGO_INITDB_ROOT_USERNAME=mongo -e MONGO_INITDB_ROOT_PASSWORD=mongo mongo
```

3. build Node Express/Backend Image and run the container

```bash
docker build -t my-backend-image .

## run container
docker run --name my-backend-container --rm --network my-net --env-file .env -w //app -v ts-docker-logs://app/logs -v "//$(pwd)"://app -v //app/node_modules -p 5000:5000 my-backend-image

```

4. Build NextJS/React/Frontend Image and run container

```bash
docker build -t my-frontend-image .

## run container
docker run --name my-frontend-container --rm -p 3000:3000 --env-file .env.local -w //app -v "//$(pwd)"://app -v //app/node_modules --network ts-docker-net -e WATCHPACK_POLLING=true my-frontend-image
```
