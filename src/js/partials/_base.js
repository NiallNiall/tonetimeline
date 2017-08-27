(function() {
    'use strict';

}()); // end 'use strict'

// ==================================================
// Tone sound bits
// ==================================================

var fbDelay = new Tone.FeedbackDelay("8n", 0.4).toMaster();

//create one of Tone's built-in synthesizers and connect it to the master output
var synth = new Tone.SimpleSynth().connect(fbDelay);
synth.oscillator.type = "triangle";

var newSynth = new Tone.PolySynth(4, Tone.SimpleSynth).toMaster();
newSynth.set({
    "filter" : {
        "type" : "highpass"
    },
    "envelope" : {
        "attack" : 0.25
    }
});

var kick = new Tone.DrumSynth().toMaster();

// ==================================================

// Set Boolean for the track playing or not.
var playing = true;

// Instantiate empty array outside of onload scope
var steps = [];
var branchs = [];

var kicks = [];

masterSpeed = 0.01;



function playpause() {
    playing = !playing;
}


function getCalculatedWidth(tempBorder) {
    var startGrid = tempBorder;
    var endGrid = paper.view.bounds.width - tempBorder;
    var width = endGrid - startGrid;
    var distThing = Math.floor(width / tempBorder);
    var dist = width / distThing;
    return dist;
}

// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

var getCirclePos = function(centerPos, inc, Radius) {
  var angle = Math.radians(inc);
  var x = centerPos.x + Math.sin(angle) * Radius;
  var y = centerPos.y + Math.cos(angle) * Radius;
  var pos = new paper.Point(x,y);
  return pos;
};

function makeSingleStep(tempPos, tempArray) {
    var tempStep = createKick(new paper.Point(tempPos.x, tempPos.y));
    tempStep.setPitch(tempPos.x, tempPos.y);
    tempArray.push(tempStep);
}

// This is very bodgy - rewrite!
function makeSingleStepPitch(tempPos, tempArray, inc) {
    var tempStep = createNote(new paper.Point(tempPos.x, tempPos.y));
    tempStep.setPitch(inc, 100);
    tempArray.push(tempStep);
}

// Even Bodgier!!
function makeSingleStepKickPitch(tempPos, tempArray, inc) {
    var tempStep = createKick(new paper.Point(tempPos.x, tempPos.y));
    tempStep.setPitch(inc, 100);
    tempArray.push(tempStep);
}

function makeAlltheSteps(tempBorder, tempDist, tempArray) {

    var smallTempBorder = tempBorder - 1;

    for (var i = tempBorder; i < paper.view.bounds.width - smallTempBorder; i += tempDist) {
        for (var j = tempBorder; j < paper.view.bounds.height - smallTempBorder; j += tempDist) {

            var tempPos = new paper.Point(i,j);

            makeSingleStep(tempPos, tempArray);
        }
    }
}

function removeAllSteps() {
    for (var i = 0; i < steps.length; i++) {
        var tempStep = steps[i];
        var tempShape = tempStep.getThisShape();
        var tempOutline = tempStep.getOutlineShape();
        tempShape.remove();
        tempOutline.remove();
    }
    steps = [];
}

function changeKey() {
    for (var i = 0; i < steps.length; i++) {
        steps[i].changeKey();
    }
}

function resetbranchs() {
    for (var i = 0; i < branchs.length; i++) {
        var tempBranch = branchs[i];
        tempBranch.removeBranch();
    }
    branchs = [];
}


paper.install(window);
// Only executed our code once the DOM is ready.
window.onload = function() {

    // Get a reference to the canvas object
    var canvas = document.getElementById('paperCanvas');
    // Create an empty project and a view for the canvas:
    paper.setup(canvas);


    // Set scroller
    var countr = 0.001;

   


    var edgeBorder = 50;
    var dist = getCalculatedWidth(edgeBorder);

    // Try this only making one point
    // makeAlltheSteps(edgeBorder, dist, steps);


    // Abstract the below bit
    // var quickPosTest = new paper.Point(paper.view.center);
    // makeSingleStep(quickPosTest, steps);

    for(var i=0; i<360; i+=15){
        var quickPosTest = getCirclePos(paper.view.center, i, 200);
        makeSingleStepPitch(quickPosTest, steps, i);
    }

    for(var i=0; i<360; i+=45){
        var quickPosTest2 = getCirclePos(paper.view.center, i, 100);
        makeSingleStepKickPitch(quickPosTest2, kicks, i);
    }

    // Create a vector for the playhead
    var playHeadPos = new paper.Point(paper.view.center);
    // and a vector for the Canvas Centre
    var centerPos = paper.view.center;
    var playHeadLength = 800;

    // Half Length Variable
    var halfPHLength = playHeadLength / 2;

    // Create Branch Object
    var branch = new paper.Path();

    var startPos = centerPos.x - halfPHLength;
    var endPos = centerPos.x + halfPHLength;


    var pointPos = 0.001;

    paper.view.onFrame = function(event) {

        if (pointPos <= 1) {
            pointPos += masterSpeed;
        } else {
            pointPos = 0.001;
        }


        if (playing) {
            for (var i = 0; i < branchs.length; i++) {
                branchs[i].loop();
            }
        }

        for (var i = 0; i < kicks.length; i++) {

            kicks[i].loop();

            // Create an empty array for the Booleans
            var boolArray = [];

            for (var j = 0; j < branchs.length; j++) {
                var branchPos = branchs[j].getPHPos();

                var checkMovr = kicks[i].checkDistance(branchPos);
                boolArray.push(checkMovr);

                // console.log(checkMovr);
            }

            // Check if any Bools return positive.
            var logr = isInArray(true, boolArray);

            // If they do, then set state of the kick.
            if (logr) {
                kicks[i].setAvail(false);
            } else {
                kicks[i].setAvail(true);
            }

        }

        for (var i = 0; i < steps.length; i++) {

            steps[i].loop();

            // Create an empty array for the Booleans
            var boolArray = [];

            for (var j = 0; j < branchs.length; j++) {
                var branchPos = branchs[j].getPHPos();

                var checkMovr = steps[i].checkDistance(branchPos);
                boolArray.push(checkMovr);

                // console.log(checkMovr);
            }

            // Check if any Bools return positive.
            var logr = isInArray(true, boolArray);

            // If they do, then set state of the step.
            if (logr) {
                steps[i].setAvail(false);
            } else {
                steps[i].setAvail(true);
            }

        }


        if (countr <= 1) {
            countr += masterSpeed;
        } else {
            changeKey();
            countr = 0.001;
            canvasClass();
        }

    };

    var canvasClasses = ['first','second','third','fourth'];
    var canvasCntr = 0;

    function canvasClass(){
        canvas.className =
        canvas.className.replace( /(?:^|\s)first|(?:^|\s)second|(?:^|\s)third|(?:^|\s)fourth(?!\S)/g , '' );

        if(canvasCntr < 3) {
            canvasCntr += 1;
        } else {
            canvasCntr = 0;
        }

        canvas.className += ' ' + canvasClasses[canvasCntr];
    }

    var mouseTool = new paper.Tool();


    mouseTool.onMouseDown = function(event) {
        var newBranch = createBranch(event.point);
        branchs.push(newBranch);
    };

    mouseTool.onMouseDrag = function(event) {
        var tempBranch = branchs[branchs.length - 1];
        tempBranch.addPoints(event.point);

    };

    mouseTool.onMouseUp = function(event) {

    };

    mouseTool.onKeyDown = function(event) {
        if (event.key == 'space') {
            playpause();
        }

        if (event.key == 'w') {
            var tempbranch = branchs[branchs.length - 1];
            tempbranch.removebranch();

        }

       if (event.key == 't') {
        changeKey();
        }

    };



    // Draw the view now:
    paper.view.draw();


};



window.addEventListener("resize", function() {

});