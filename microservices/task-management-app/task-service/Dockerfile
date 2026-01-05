FROM node:22-alpine

WORKDIR /app
COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && npm cache clean --force && pnpm install --frozen-lockfile

ENV PORT=5001
ENV MONGODB_URI=mongodb://mongo_db:27017/task-service-5002

COPY . .

EXPOSE 5002
CMD ["pnpm", "start"]