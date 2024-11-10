# Docker Utility Container Cheat Sheet

- **Step-1:** Build The Utility Container Image
  ```bash
  docker build -t node-util .
  ```
- **Step-2:** Run The Utility Container in Interactive Mode
  ```bash
    docker run --name node-util -w //app -v "//$(pwd)"://app -it --rm -d node-util
  ```
- **Step-3:** Execute Inside Utility Container And Install Packages
  ```bash
    docker exec -it node-util npm install -D typescript
  ```
