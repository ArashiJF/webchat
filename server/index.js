//followed initial steps in configuring from https://codingblast.com/chat-application-angular-socket-io/
let express = require('express');
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.IO');
let io = socketIO(server);

const port = process.env.PORT || 4000;

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('new-message',(message) => {
        console.log(message);
    })
});

server.listen(port, () =>{
    console.log(`started on port: ${port}`);
});