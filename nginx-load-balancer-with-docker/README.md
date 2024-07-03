# Load Balancer NGINX - using CLI (docker)

### Create a `dockerfile` and add this

```dockerfile
FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]
```

### run this commands in the same directory terminal

```
docker network create lb_net    ==>> create a network to share the network between the load balancer
docker build -t test_node_lb .  ==>> create new image

docker run -d --name node_lb1 --network internal -p 3000:3000 test_node_lb  ===>> Run 1st container from test_node_lb image
docker run -d --name node_lb2 --network internal -p 3001:3000 test_node_lb  ===>> Run 2nd container from test_node_lb image
docker run -d --name node_lb3 --network internal -p 3003:3000 test_node_lb  ===>> Run 3rd container from test_node_lb image


docker run -d --name nginx --network internal -p 80:80 nginx:latest  ===>> run the NGINX container

```

### Create a `nginx.conf` file add add this

```nginx
upstream node-apps {
    server node_lb1:3000 weight=2;
    server node_lb2:3000 weight=1;
    server node_lb3:3000 weight=1;
    # Add more servers as needed with appropriate weights
}

server {
    listen 80;

    location / {
        proxy_pass http://node-apps;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

```

```
docker cp ./nginx.conf nginx:/etc/nginx/conf.d/default.conf  ===>> Copy the nginx.conf file

docker restart nginx  ===> Restart nginx

# Check the nginx server it is running or not
docker exec -it nginx bash
nginx -t
```

**Note : Server will listen on `http://localhost:80`**

# Load Balancer NGINX - using docker compose

### Create a `dockerfile` and add this

```dockerfile
FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]
```

### Run this commands in the same directory terminal

```
docker network create lb_net    ==>> create a network to share the network between the load balancer
docker build -t test_node_lb .  ==>> create new image
```

### Create a `nginx.conf` file add add this

```nginx
upstream node-apps {
    server node_lb1:3000 weight=2;
    server node_lb2:3000 weight=1;
    server node_lb3:3000 weight=1;
    # Add more servers as needed with appropriate weights
}

server {
    listen 80;

    location / {
        proxy_pass http://node-apps;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

```

### Create `docker-compose.yml` file and add

```yml
version: '3'
services:
  node_lb1:
    image: test_node_lb
    build: .
    ports:
      - '3000:3000'
    networks:
      - lb_net

  nginx:
    image: nginx:latest
    ports:
      - '80:80'
    networks:
      - lb_net
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - node_lb1
    restart: always

  node_lb2:
    image: test_node_lb
    build: .
    ports:
      - '3001:3000'
    networks:
      - lb_net
    depends_on:
      - nginx

  node_lb3:
    image: test_node_lb
    build: .
    ports:
      - '3002:3000'
    networks:
      - lb_net
    depends_on:
      - nginx

networks:
  lb_net:
    driver: bridge
```

### And run this command to run server on `http://localhost:80`

```
docker compose up
```
