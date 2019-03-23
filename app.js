const express   = require('express');
const app       = express();
const http      = require('http');
const server    = http.createServer(app);
const socketIO  = require('socket.io')(server); //hello I am new

const LISTEN_PORT = 8080; //make sure greater than 3000. Some ports are reserved/blocked by firewall ...

app.use((express.static(__dirname + '/public'))); //set root dir to the public folder

var playerCount = 0;
var p1ID;
var p2ID;

var savedID;

var p1IN;
var p2IN;

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

app.get('/startScreen', function(req,res) {
    res.sendFile(__dirname + '/public/startScreen.html');
});
app.get('/Loading', function(req,res) {
    res.sendFile(__dirname + '/public/Loading.html');
});
app.get('/competitive1', function(req,res) {
    res.sendFile(__dirname + '/public/competitive1.html');
});
app.get('/competitive2', function(req,res) {
    res.sendFile(__dirname + '/public/competitive2.html');
});
//websocket stuff
socketIO.on('connection', function(socket) {
    console.log(socket.id + ' has connected!');
    if (playerCount < 2){
        playerCount += 1;

    }
    
    if (p1ID == null){
        p1ID = socket.id;

        socketIO.sockets.emit('p1Join', p1ID);
    }
    else if(p2ID == null){
        p2ID = socket.id;

        socketIO.sockets.emit('p2Join', p2ID);
    }


    //var reSort = true;
    socket.on('disconnect', function(data) {
        console.log(socket.id + ' has disconnected');
        if (p1ID == socket.id){
            p1ID = null;
            socketIO.sockets.emit('p1Join', p1ID);
        }
        else if(p2ID == socket.id){
            p2ID = null;
            socketIO.sockets.emit('p2Join', p2ID);
        }
        playerCount -= 1;
        
        // //if the player disconnecting was the player going to the loading page
        // //then we set the player id to the saved id
        // else if(reSort == false){
        //     if (p1ID == socket.id){
        //         p1ID = savedID;
        //         socketIO.sockets.emit('p1Join', p1ID);
        //         console.log('changed id was p1');
        //     }
        //     else if(p2ID == socket.id){
        //         p2ID = savedID;
        //         socketIO.sockets.emit('p2Join', p2ID);
        //         console.log('changed id was p2');
        //     }

        //     console.log('new p1', p1ID);
        //     console.log('new p2', p2ID);


        // }

        
        
    });

    console.log('p1ID', p1ID);
    console.log('p2ID', p2ID);

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

    /////////////////////////////////////////////////   START SCREEN SHIT  /////////////////////////////////////////////////////
    socket.on('player1Join', function(id) {

        console.log('////////////////////////////////////////////////');
        console.log('player1 after join', id);
        console.log('////////////////////////////////////////////////');
        p1IN = true;
        console.log('p1IN', p1IN);

        //save the player id before it changes
        savedID = id;
        reSort = false;

        socketIO.sockets.emit('loadScreen1', p1IN);
        
        socketIO.sockets.emit('goToLoad1');
    });
    socket.on('player2Join', function(id) {

        console.log('////////////////////////////////////////////////');
        console.log('player2 after join', id);
        console.log('////////////////////////////////////////////////');
        p2IN = true;
        console.log('p2IN', p2IN);

        //save the player id before it changes
        savedID = id;
        reSort = false;
        
        socketIO.sockets.emit('loadScreen2', p2IN);

        socketIO.sockets.emit('goToLoad2');

    });
    socket.on('vsPlayer', function(currentID) {

        if(p1ID == currentID){
            socketIO.sockets.emit('p1Start', currentID);
        }
        if(p2ID == currentID){
            socketIO.sockets.emit('p2Start', currentID);
        }

    });

    //////////////////////////////////////////////////////////////COMPETETIVE GAME///////////////////////////////////////////////////////////////////////////////////

    socket.on('killDoor', function(beGone) {
        //do the delete doors thing
        console.log("delete door at position", beGone);
        socketIO.sockets.emit('getDead', beGone);
    });
});











//finally, start server
server.listen(LISTEN_PORT);
console.log('listening to port: ' + LISTEN_PORT);


