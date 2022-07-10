FROM node:16

# Create app directory
WORKDIR /bookig-microservice

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

RUN ls

EXPOSE 3000
CMD npm run
