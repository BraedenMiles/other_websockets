function generateNumber() {
    return(Math.floor(Math.random() * 3));
}

let socket = io();


var door1x = false;
var door1z = false;
var door2x = false;
var door2z = false;
var door3x = false;
var door3z = false;
window.onload = function (){
    let scene = document.querySelector('a-scene');
    

    

    //get the generated randon number
    checkNum = generateNumber() + 1;
    console.log(checkNum);


    //pick which door is the correct one
    

    //////////////////////////////////////////////////////////////////////////////////////////////////////PLAYER 1///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (document.querySelector('#player1Cam') != null){
            //if door 1
        document.getElementById("p1door1").addEventListener("click", function(){
            //get camera position for player 1
            cPos = document.querySelector('#player1Cam').getAttribute('position');
            console.log(cPos)

            if (cPos.x <= -3 && cPos.x >= -7){
                door1x = true;
            }
            if (cPos.z <= -8 && cPos.z >= -12){
                door1z = true;
            }


            if( checkNum == 1 && door1x == true && door1z ==true){

                socket.emit('player_1_wins');
                console.log("p1 win")
            }
        });

        //if door 2
        document.getElementById("p1door2").addEventListener("click", function(){
            //get camera position
            cPos = document.querySelector('#player1Cam').getAttribute('position');
            console.log(cPos)

            if (cPos.x <= 2 && cPos.x >= -2){
                door2x = true;
            }
            if (cPos.z <= -8 && cPos.z >= -12){
                door2z = true;
            }


            if( checkNum == 2 && door2x == true && door2z ==true){
                socket.emit('player_1_wins');
                console.log("p1 win")
            }
        });
        //if door
        document.getElementById("p1door3").addEventListener("click", function(){
            //get camera position
            cPos = document.querySelector('#player1Cam').getAttribute('position');
            console.log(cPos)

            if (cPos.x <= 7 && cPos.x >= 3){
                door3x = true;
            }
            if (cPos.z <= -8 && cPos.z >= -12){
                door3z = true;
            }


            if( checkNum == 3 && door3x == true && door3z ==true){
                socket.emit('player_1_wins');
                console.log("p1 win")
            }
        });
    }

    


    ///////////////////////////////////////////////////////////////////////////////////////////////////////PLAYER 2//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (document.querySelector('#player2Cam') != null){
        //if door 1
        document.getElementById("p2door1").addEventListener("click", function(){
            //get camera position for player 2
            cPos = document.querySelector('#player2Cam').getAttribute('position');
            console.log(cPos)

            if (cPos.x <= -3 && cPos.x >= -7){
                door1x = true;
            }
            if (cPos.z <= -8 && cPos.z >= -12){
                door1z = true;
            }


            if( checkNum == 1 && door1x == true && door1z ==true){

                socket.emit('player_2_wins');
                console.log("p2 win")
            }
        });

        // socket.on('p1WIN', function(data) {
        //     console.log('player 1 wins');
            
        // });

        //if door 2
        document.getElementById("p2door2").addEventListener("click", function(){
            //get camera position
            cPos = document.querySelector('#player2Cam').getAttribute('position');
            console.log(cPos)

            if (cPos.x <= 2 && cPos.x >= -2){
                door2x = true;
            }
            if (cPos.z <= -8 && cPos.z >= -12){
                door2z = true;
            }


            if( checkNum == 2 && door2x == true && door2z ==true){
                socket.emit('player_2_wins');
                console.log("p2 win")
            }
        });
        //if door
        document.getElementById("p2door3").addEventListener("click", function(){
            //get camera position
            cPos = document.querySelector('#player2Cam').getAttribute('position');
            console.log(cPos)

            if (cPos.x <= 7 && cPos.x >= 3){
                door3x = true;
            }
            if (cPos.z <= -8 && cPos.z >= -12){
                door3z = true;
            }


            if( checkNum == 3 && door3x == true && door3z ==true){
                socket.emit('player_2_wins');
                console.log("p2 win")
            }
        });
    }

    
}