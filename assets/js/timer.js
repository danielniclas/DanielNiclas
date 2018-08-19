/**
 * Created by Daniel on 3/22/2015.
 */


"use strict";



//{OBJECT}
var Game = {
    canvas : undefined,
    canvasContext : undefined,

    d1 : new Date()
};




// New property (METHOD) for the {GAME} object:
Game.start = function () {

    Game.canvas = document.getElementById("timeCanvas");          //  assign the <canvas> element
    Game.canvasContext = Game.canvas.getContext("2d");          //  assign 2D to Game.canvasContext

    Game.canvasContext.font = "1em Lato";
    Game.canvasContext.fillStyle = "white";            //  Text Color
    Game.canvasContext.shadowColor = "black";          //  Text Shadow
    Game.canvasContext.shadowOffSetX = "5";
    Game.canvasContext.shadowOffSetY = "5";
    Game.canvasContext.shadowBlur = "5";
    Game.canvasContext.textAlign = "center";

    console.log("Timer Initialized");

    Game.mainLoop();                                            //  CALL Game.mainLoop();

};


//  DOMContentLoaded:
document.addEventListener( 'DOMContentLoaded', Game.start);  //  START HERE ****  DOMContentLoaded === the 'EVENT'



Game.clearCanvas = function () {
    Game.canvasContext.clearRect(0, 0, Game.canvas.width, Game.canvas.height);

};


//  FUNCTIONS:



//  MAIN LOOP:
Game.mainLoop = function() {                            //  ++ Add METHOD to the {GAME}  object

    Game.clearCanvas();                                 //  Step 1:  Clear
    Game.update();                                      //  Step 2:  Update
    Game.draw();                                        //  Step 3:  Draw
    window.setTimeout(Game.mainLoop, 1000 / 60);        //  Step 4:  Repeat -- mainLoop() repeats 60 time / 1000 msec (1 sec)
    //window.setTimeout(Game.mainLoop, 1000 / 1);
};

//  UPDATE METHOD() -- where you change the game world

Game.update = function () {                             // ++ Add METHOD to the {GAME}  object
    var d2 = new Date();        //  Create an {OBJECT} filled with date, time and METHODS like getTime()

    var t1 = Game.d1.getTime();

    Game.time = (d2.getTime() -t1);
    //Game.time = d;

};

//  DRAW METHOD() --  where you draw the game world on the screen




Game.draw = function () {                               // ++ Add METHOD to the {GAME}  object

    //Game.canvasContext.font = "20px Georgia";
    //Game.canvasContext.font = "1em Lato";

    //Game.canvasContext.fillStyle = "white";            //  Text Color
    //Game.canvasContext.shadowColor = "black";          //  Text Shadow
    //Game.canvasContext.shadowOffSetX = "5";
    //Game.canvasContext.shadowOffSetY = "5";
    //Game.canvasContext.shadowBlur = "5";
    //Game.canvasContext.textAlign = "center";

    //Game.canvasContext.fillText(Game.time + '  ' + ' msec since 1970/01/01', 190, 15 );
    Game.canvasContext.fillText(Game.time + '  ' + ' msec on site', 190, 15 );

};

//
