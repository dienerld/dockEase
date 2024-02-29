FROM node:20-slim AS base

WORKDIR /app

COPY . .

RUN yarn

CMD ["tail", "-f", "/dev/null"]
