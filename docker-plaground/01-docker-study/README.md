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

# Docker volume example with bind mount change in host file

```bash
docker run -p 5000:5000 --name node-app -v node-app-data://app -w //app -v "$(pwd)"://app -v //app/node_modules --rm node-app-image  ## with bind mount

```
