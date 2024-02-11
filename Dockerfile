FROM node:20-alpine AS base

RUN corepack enable

USER node

WORKDIR /app

COPY . .

RUN pnpm install 

CMD ["tail", "-f", "/dev/null"]
