FROM node:16

ENV WORKINGDIR=/root/server

# Create app directory
WORKDIR ${WORKINGDIR}

RUN mkdir -p ${WORKINGDIR} && chmod 666 ${WORKINGDIR}

# Install app dependencies
COPY package*.json ${WORKINGDIR}/

RUN apt-get -y update && apt-get -y install apt-utils && apt-get -y clean

RUN npm install

# Bundle app source
COPY . ${WORKINGDIR}/

RUN ls

EXPOSE 3000
CMD node -r dotenv/config ./index.js
