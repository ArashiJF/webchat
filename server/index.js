//followed initial steps in configuring from https://codingblast.com/chat-application-angular-socket-io/
//from here too! https://socket.io/get-started/chat

var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

var socketIO = require('socket.io');
var io = socketIO(server);

const port = process.env.PORT || 4000;

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('disconnect', () =>{
        console.log('user disconnected');
    });

    socket.on('new-message', (message) => {
        console.log(message);
    });
});

server.listen(port, () =>{
    console.log(`started on port: ${port}`);
});