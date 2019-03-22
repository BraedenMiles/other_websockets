const express   = require('express');
const app       = express();
const http      = require('http');
const server    = http.createServer(app);
const socketIO  = require('socket.io')(server); //hello I am new

const LISTEN_PORT = 8080; //make sure greater than 3000. Some ports are reserved/blocked by firewall ...

app.use((express.static(__dirname + '/public'))); //set root dir to the public folder

//routes
app.get('/startScreen', function(req,res) {
    res.sendFile(__dirname + '/public/startScreen.html');
});

app.get('/color', function(req,res) {
    res.sendFile(__dirname + '/public/color.html');
});

app.get('/controller', function(req,res) {
    res.sendFile(__dirname + '/public/controller.html');
});

//websocket stuff
socketIO.on('connection', function(socket) {
    console.log(socket.id + ' has connected!');

    socket.on('disconnect', function(data) {
        console.log(socket.id + ' has disconnected');
    });


    socket.on('player_1_wins', function() {
        //do the delete doors thing
        console.log("delete player 2 doors")
        socketIO.sockets.emit('p1Wins');
    });

    socket.on('player_2_wins', function() {
        //do the delete doors thing
        console.log("delete player 1 doors")
        socketIO.sockets.emit('p2Wins');
    });

});











//finally, start server
server.listen(LISTEN_PORT);
console.log('listening to port: ' + LISTEN_PORT);


