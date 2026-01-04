# Essential Docker containers

### Docker CLI

```bash
  sudo systemctl status docker
  sudo systemctl start docker
```

### MongoDB Community Edition:

```bash
  docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest
  docker exec -it mongodb mongo
```

### Redis Stack:

```bash
  sudo docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
  docker exec -it redis-stack redis-cli
```

### n8n

```bash
  docker volume create n8n_data

  docker run -it --rm --name n8n -p 5678:5678 -e GENERIC_TIMEZONE="Asia/Dhaka"  -e TZ="Asia/Dhaka" -e N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true -e N8N_RUNNERS_ENABLED=true -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n:latest
```

## Docker Desktop Ubuntu AppArmor fix

```bash
  sudo sysctl -w kernel.apparmor_restrict_unprivileged_userns=0
  systemctl --user restart docker-desktop
```
