FROM node:22-alpine

WORKDIR /app
COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && npm cache clean --force && pnpm install --frozen-lockfile

COPY . .

EXPOSE 5003
CMD ["pnpm", "start"]