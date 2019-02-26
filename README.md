a web application that lets you chat with people and form chat groups too!

The project consists in 3 parts, the api, the server based in express and socket.io and the frontend which is made in Angular 7

If you wish to launch the application manually you need to have:

nodejs
mongodb, in my case I used mongodb Community server for the database.
After they are installed, you will need to run the following commands:

npm install -g @angular/cli
npm install -g @loopback/cli
after they are both installed, you will need to enter each folder to start the applications:

In api you will need to run:

npm install
ng start
The api will start and will be listening on port 3000

In server you will need to run:

npm install
ng start
The server will be open on port 4000

In webchat you will need to run:

npm install
ng serve --open
Webchat will be open on port 4200

Now if you would rather run only one command you need docker and docker-compose, with them from this project's root just run:

docker-compose up And 4 containers will be created.
[NOT TRIED PROPERLY TRIED TO ADD NGINX TO WEBCHAT TO SERVE FROM CONTAINER, EXPRESS WORKS, MONGODB TOO, API REFUSES CONNECTION ADDED PM2 FOR DEPLOYMENT BUT HAS NOT BEEN TRIED YET]