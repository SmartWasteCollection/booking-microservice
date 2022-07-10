FROM node:16

WORKDIR /bookig-microservice

RUN apt-get update && apt-get upgrade -y && apt-get install -y nodejs npm

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT node ./src/index.js
