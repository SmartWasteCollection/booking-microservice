FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN chown -R node:node ./node_modules

# Bundle app source
COPY . ./

EXPOSE 3000

CMD [ "node", "./src/index.js" ]
