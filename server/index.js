//followed initial steps in configuring from https://codingblast.com/chat-application-angular-socket-io/
//from here too! https://socket.io/get-started/chat

var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

var socketIO = require('socket.io');
var io = socketIO(server);

const port = process.env.PORT || 4000;

//When Started socket.io will listen whenever a user joins the namespace
io.on('connection', (socket) => {
    console.log('user connected');

    //if a user disconnects be it by logging out or refreshing the page
    //it will show the alert too
    socket.on('disconnect', () =>{
        console.log('user disconnected');
    });

    //when a new message is passed socket will print said message in the console
    //and also emit the message to anyone in the session
    socket.on('new-message', (message) => {
        console.log(message);
        io.emit(message);
    });
});

//the server is listening to this port
server.listen(port, () =>{
    console.log(`started on port: ${port}`);
});