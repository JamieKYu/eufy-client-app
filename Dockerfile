# Filename: Dockerfile
#
FROM node
WORKDIR /home/node/app
COPY package*.json /home/node/app/
RUN npm install
COPY ./dist /home/node/app/
RUN chmod +x /home/node/app/client.js
CMD [ "node", "client.js" ]
