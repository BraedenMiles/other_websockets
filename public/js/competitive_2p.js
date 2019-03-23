function generateNumber() {
    return(Math.floor(Math.random() * 3));
}

let socket = io();


var door1coopx = false;
var door1coopz = false;
var door2coopx = false;
var door2coopz = false;
var door3coopx = false;
var door3coopz = false;

P2door1 = document.querySelector('#p2door1')
P2door2 = document.querySelector('#p2door2')
P2door3 = document.querySelector('#p2door3')

P1door1 = document.querySelector('#p1door1')
P1door2 = document.querySelector('#p1door2')
P1door3 = document.querySelector('#p1door3')

window.onload = function (){
    let scene = document.querySelector('a-scene');
    

    

    //get the generated randon number
    checkNum = generateNumber() + 1;
    console.log(checkNum);


    //pick which door is the correct one
    //////////////////////////////////////////////////////////////////////////////////////////////////////PLAYER 1///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (document.querySelector('#player1Camcoop') != null){
            //if door 1
        document.getElementById("#p1door1coop").addEventListener("click", function(){
            //get camera position for player 1
            cPos1 = document.querySelector('#player1CamCoop').getAttribute('position');
            dPos1 = document.querySelector('#p1door1coop').getAttribute('position');
            console.log(cPos1);
            console.log('click door');


            if (cPos1.x <= (dPos1.x - 2) && cPos1.x >= (dPos1.x + 2)){
                door1x = true;
            }
            if (cPos1.z <= (dPos1.z - 2) && cPos1.z >= (dPos1.z + 2)){
                door1z = true;
            }


            if(door1coopx == true && door1coopz ==true){

                socket.emit('killDoor', dPos1);
                console.log('Kill door');
            }
        });

        //if door 2
        document.getElementById("p1door2").addEventListener("click", function(){
            //get camera position
            cPos = document.querySelector('#player1CamCoop').getAttribute('position');
            dPos2 = document.querySelector('#p1door2coop').getAttribute('position');
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
            else if(checkNum != 2 && door2x == true && door2z ==true){
                P1door2.setAttribute('position', '0 -100 0')
            }
        });
        //if door
        document.getElementById("p1door3").addEventListener("click", function(){
            //get camera position
            cPos = document.querySelector('#player1Cam').getAttribute('position');
            dPos3 = document.querySelector('#p1door3coop').getAttribute('position');
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
            else if(checkNum != 3 && door3x == true && door3z ==true){
                P1door3.setAttribute('position', '0 -100 0')
            }
        });
    }

    


    ///////////////////////////////////////////////////////////////////////////////////////////////////////PLAYER 2//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (document.querySelector('#player2Cam') != null){
        //if door 1
        document.getElementById("p2door1").addEventListener("click", function(){
            //get camera position for player 2
            cPos2 = document.querySelector('#player2Cam').getAttribute('position');
            dPos4 = document.querySelector('#p2door1coop').getAttribute('position');
            console.log(cPos2);

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
            else if(checkNum != 1 && door1x == true && door1z ==true){
                P2door1.setAttribute('position', '0 -100 0')
            }
        });

        document.getElementById("p2door2").addEventListener("click", function(){
            //get camera position
            cPos = document.querySelector('#player2Cam').getAttribute('position');
            dPos5 = document.querySelector('#p2door2coop').getAttribute('position');
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
            else if(checkNum != 2 && door2x == true && door2z ==true){
                P2door2.setAttribute('position', '0 -100 0')
            }
        });
        //if door
        document.getElementById("p2door3").addEventListener("click", function(){
            //get camera position
            cPos = document.querySelector('#player2Cam').getAttribute('position');
            dPos6 = document.querySelector('#p2door3coop').getAttribute('position');
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
            else if(checkNum != 3 && door3x == true && door3z ==true){
                P2door3.setAttribute('position', '0 -100 0')
            }
        });
    }




    ///////////////////////////////////////     Kill door function      ///////////////////////////////////////////////////////
    socket.on('getDead', function(beGone) {
        //do the delete doors thing
        dPos1 = document.querySelector('#p1door1coop').getAttribute('position');
        dPos2 = document.querySelector('#p1door2coop').getAttribute('position');
        dPos3 = document.querySelector('#p1door3coop').getAttribute('position');
        dPos4 = document.querySelector('#p2door1coop').getAttribute('position');
        dPos5 = document.querySelector('#p2door2coop').getAttribute('position');
        dPos6 = document.querySelector('#p2door3coop').getAttribute('position');

        P1door1cop = document.querySelector('#p1door1')
        P1door2cop = document.querySelector('#p1door2')
        P1door3cop = document.querySelector('#p1door3')
        P2door1cop = document.querySelector('#p2door1')
        P2door2cop = document.querySelector('#p2door2')
        P2door3cop = document.querySelector('#p2door3')

        if (dPos1 == beGone){
            P1door1coop.parentNode.removeChild(P1door1coop)
        }
        if (dPos2 == beGone){
            P1door2coop.parentNode.removeChild(P1door2coop)
        }
        if (dPos3 == beGone){
            P1door3coop.parentNode.removeChild(P1door3coop)
        }
        if (dPos4 == beGone){
            P2door1coop.parentNode.removeChild(P2door1coop)
        }
        if (dPos5 == beGone){
            P2door2coop.parentNode.removeChild(P2door2coop)
        }
        if (dPos6 == beGone){
            P2door3coop.parentNode.removeChild(P2door3coop)
        }

    });
    
}