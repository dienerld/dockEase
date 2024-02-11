FROM node:20-alpine

RUN npm i -g pnpm && npm cache clean -f

WORKDIR /app

COPY . .

RUN pnpm i

CMD ["tail", "-f", "/dev/null"]
