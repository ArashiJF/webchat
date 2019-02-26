FROM node:10.15

#the api is open in the port 3000
EXPOSE 3000

#update apt caches
RUN apt update

#install pm2
RUN npm install -g pm2

#installing loopback
RUN npm install -g @loopback/cli

#setting the root in container
WORKDIR /api

#copy everything in this folder into the /api workdir inside container
COPY . .

#installing the dependencies for loopback
RUN npm install

#start api
RUN npm start
RUN npm stop

CMD pm2 start ecosystem.config.js --env production --no-daemon
