# Filename: Dockerfile
#
FROM node
WORKDIR /home/node/app
COPY package*.json /home/node/app/
RUN npm install
COPY ./dist /home/node/app/
CMD [ "node", "client.js" ]
