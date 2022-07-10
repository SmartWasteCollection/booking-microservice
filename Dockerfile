FROM node:17

WORKDIR /usr/src/app

ARG mongo_db_path

ENV URI_MONGO_DB=$mongo_db_path

COPY package*.json ./

RUN npm install

RUN chown -R node:node ./node_modules

# Bundle app source
COPY . ./

EXPOSE 3000

CMD [ "node", "./src/index.js" ]
