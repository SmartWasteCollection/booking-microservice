FROM node:16

WORKDIR /bookig-microservice

COPY package*.json ./

RUN npm install

COPY . .

RUN ls

EXPOSE 3000
CMD npm run
