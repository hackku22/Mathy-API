FROM node:16

RUN yarn global add pnpm

RUN mkdir /app

COPY lib/ /app

RUN rm -f /app/.env

COPY package.json /app
COPY pnpm-lock.yaml /app

RUN cd /app && pnpm install

WORKDIR /app

CMD ["node", "index.js"]