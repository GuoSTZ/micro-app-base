FROM node:slim

WORKDIR app

COPY package.json ./app/

COPY . /app

RUN pnpm i

RUN pnpm build