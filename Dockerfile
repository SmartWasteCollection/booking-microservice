FROM node:lts-alpine@sha256:554142f9a6367f1fbd776a1b2048fab3a2cc7aa477d7fe9c00ce0f110aa45716

RUN apk add dumb-init

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --only=production

EXPOSE 3000

USER node

CMD ["dumb-init", "node", "./src/index.js"]
