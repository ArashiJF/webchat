# webchat
a web application that lets you chat with people and form chat groups too!

The project consists in 3 parts, the api, the server based in express and socket.io and the frontend which is made in Angular 7

# Note:
- please add chatmongodb to your hostfile, be it /etc/hosts in linux or C:\Windows\System32\drivers\etc\hosts in windows, add it like this:
 - 127.0.0.1 chatmongodb
The last step is A # MUST 


If you wish to launch the application manually you need to have:
 - nodejs 
 - mongodb, in my case I used mongodb Community server for the database. 

After they are installed, you will need to run the following commands:
 
 - npm install -g @angular/cli
 - npm install -g @loopback/cli

after they are both installed, you will need to enter each folder to start the applications:

In api you will need to run:
 - npm install
 These 2 commands are for building the api:
 - npm start
 - npm stop
And then we start it without using pm2.
 - node .

The api will start and will be listening on port 3000

In server you will need to run:
 - npm install
 - node index.js

The server will be open on port 4000


In webchat you will need to run:
 - npm install
 - ng serve --open

Webchat will be open on port 4200

# Docker-Compose

Now if you would rather run only one command you need docker and docker-compose, with them from this project's root just run:
 - docker-compose up

And 4 containers will be created.
