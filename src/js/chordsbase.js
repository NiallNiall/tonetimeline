//=include partials/_noisehelper.js
//=include partials/_colors.js

// Initialise Canvas Objects ============================================

var myCanvas = document.getElementById("paperCanvas");

myCanvas.width = window.innerWidth;
myCanvas.height = window.innerHeight;
var ctx = myCanvas.getContext("2d");

var canvasWidth = myCanvas.width;
var canvasHeight = myCanvas.height;

var centerX = myCanvas.width / 2;
var centerY = myCanvas.height / 2;

//=include partials/_circleClass.js


// Initialise Objects============================================
var playButton = document.getElementById('playbtn');
var playing = false;

var ripples = [];

// Load Song============================================
var player = new Tone.Player({
    "url": "./sounds/chordsv8.wav",
    "loop": false
}).toMaster();


// Function to execute when song loads
Tone.Buffer.on('load', function() {
    //all buffers are loaded.
    songLoaded = true;
    console.log("All Loaded!");
    playButton.innerHTML = "PLAY";
    playButton.classList.add("play");
})

Tone.Transport.bpm.value = 123;


// General Functions ============================================
function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}



// Initialise Objects ============================================
function playPause(playing) {
    if (playing) {
        player.sync().start(0.1);
        Tone.Transport.start(0, 0);
    } else {
        Tone.Transport.stop();
    }
}

playButton.addEventListener("click", function() {
    event.preventDefault();

    playing = !playing;
    playPause(playing);
});




// Initialise Events ============================================

//pass in an array of events
var part = new Tone.Part(function(time, event) {
    // drawRandomCircle();
    drawRandomRipple();
    // var newRipple = createRipple();
}, [{ time: 0, note: 'C4', dur: '8n' }])

//start the part at the beginning of the Transport's timeline
part.start(0);
part.loop = 16;



// Noise Bit ============================================
var namp = 100;
var nscale = 0.05;

var generator = new Simple1DNoise();
var x = 1;
var y = generator.getVal(x);
generator.setAmplitude(namp);
generator.setScale(nscale);

// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

var getCircleXPos = function(thisx, inc, Radius) {
  var angle = Math.radians(inc);
  var x = thisx + Math.sin(angle) * Radius;
  return x;
}

var getCircleYPos = function(thisy, inc, Radius) {
  var angle = Math.radians(inc);
  var y = thisy + Math.cos(angle) * Radius;
  return y;
}

function drawPixel(x, y){
        ctx.beginPath();
        ctx.rect(x,y,5,5);
        ctx.fillStyle = 'White';
        ctx.fill();     
    }

function drawFadePixel(x, y){
        ctx.beginPath();
        ctx.rect(x-10,y-10,20,20);
        ctx.fillStyle = 'rgba(255,255,255,0.01)';
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.rect(x-5,y-5,10,10);
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.rect(x,y,1,1);
        ctx.fillStyle = 'White';
        ctx.closePath();
        ctx.fill();
    }

var sclr = 0;

function drawNoiseCircle(x, y, radius, rndRad, sclrVar,thisclr){
    sclr = sclrVar+1;                

    // generator.setAmplitude(radius);


    ctx.beginPath();
    // ctx.moveTo(x, y);

    var startPoint = 180;

   for(var i = 0; i < 360; i+=1){
    // var rndrad = Math.floor((Math.random() * radius) + 70);

    var radVar = 0;
    var radInc = i/360;
    if(i<180){radVar = radInc} else {radVar = 1.0 - radInc};
    // console.log('i: ' + i + ', radvar: ' + radVar);

    var radAmt = radius / 200;
    var noiseRad = radius + ((radVar*(generator.getVal(sclr+i)))*radAmt);

    var outx = getCircleXPos(x,i, noiseRad);
    var outy = getCircleYPos(y,i, noiseRad);

    ctx.lineTo(outx, outy);

    // var outx = getCircleXPos(x,i, radius);
    // var outy = getCircleYPos(y,i, radius);
    // drawFadePixel(outx, outy);
   }
   ctx.closePath();
   ctx.strokeStyle = thisclr;
   ctx.lineWidth = 5;
   ctx.stroke();
}

// Canvas Drawing Functions ============================================

function drawRandomCircle(){
    var tempPosX = randomIntFromInterval(0,canvasWidth);
    var tempPosY = randomIntFromInterval(0,canvasHeight);

    var rndRadius = randomIntFromInterval(10,100);
    var sclrVar = randomIntFromInterval(1,100);

    drawNoiseCircle(tempPosX,tempPosY,25, rndRadius, sclrVar )
    // drawCircle(tempPosX,tempPosY,20,'white');   
}

function drawCircle(x, y, radius, clr) {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.lineWidth = 1;
    ctx.strokeStyle = clr;
    ctx.stroke();
    ctx.closePath();
}

function drawRandomRipple(){
    var tempPosX = randomIntFromInterval(0,canvasWidth);
    var tempPosY = randomIntFromInterval(0,canvasHeight);

    var newRipple = createRipple(tempPosX, tempPosY);
    ripples.push(newRipple);
}

function fadeCanvas() {

    ctx.beginPath()
    ctx.fillStyle = nhdarkbluealpha;
    ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
    ctx.closePath();

}

// Frame Drawing ============================================
function renderLoop() {
    for (var i = 0; i < ripples.length; i++) {
        ripples[i].loop();
        var thisStatus = ripples[i].getStatus();
        if(!thisStatus){console.log('dead');}
    }
    // fadeCanvas();
}

function frameLoop() {
    window.requestAnimationFrame(frameLoop);
    renderLoop();
}

frameLoop();