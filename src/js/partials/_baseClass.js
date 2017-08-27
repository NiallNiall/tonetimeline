function createTrigger() {

    var available = true;

    var trigger = {
        available: true,
        triggerEvent: triggerEvent,
        triggerOff: triggerOff,
        triggerOn: triggerOn,
        getAvailable: getAvailable,
        setPitch: setPitch
    };

    return trigger;

    function triggerEvent(trigEventVar) {

        if (available) {
            trigEventVar();
            sendMessage();
            triggerOff();
        }

    }

    function sendMessage() {
        synth.triggerAttackRelease("C3", "2n");
        // synth.triggerAttackRelease(["C4", "E4", "A4"], "4n");
    }

    function triggerOff() {
        available = false;
    }

    function triggerOn() {
        available = true;
    }

    function getAvailable() {
        return available;
    }

    function setPitch() {

    }

    function setSynth(synthVar) {

    }

}

// =====================================================
// =====================================================



function createStep(constructPos, clr) {

    // Set Availability Boolean
    var available = true;
    // Create a copy to store previous state
    var oldAvailable = available;

    // Create an instance of a trigger
    var trigger = createTrigger();
    // Set Colour to the constructor colour
    var clr1 = clr;
    // Set Position to the constructor position
    var position = constructPos;
    // Create an empty shape
    var thisShape = new paper.Path();

    var keyVar = 0;
    var mapNoteVar = 0;

    // var outlinePulse = new paper.Path();
    var outlineMoving = false;
    var outlineSize = 0;
    var outlineOpac = 1.0;
    var ogOutlineSize = 5;
    var outlinePulse = createOutlinePulse(constructPos, ogOutlineSize);


    var keySteps = [0,1,0,2];
    var notes = ['C3', 'E3', 'G3', 'A3', 'C4', 'E4', 'G4', 'A4', 'C5', 'E5', 'G5', 'A5', 'C6', 'E6', 'G6', 'A6'];


    function createOutlinePulse(tempConstructPos, tempOutlineSize) {
        // Create an empty shape
        var tempPulse = new paper.Path.Circle(tempConstructPos, tempOutlineSize);
        tempPulse.fillColor = 'LightGray';
        // outlinePulse.strokeWidth = 3.0;
        tempPulse.scaling = 1.0;
        return tempPulse;
    }

    function moveOutline() {
        var tempScaling = 0;

        if (outlineMoving) {
            if (outlineSize < 20) {
                outlineSize += 0.05;
                // outlineOpac = jsMap(outlineSize,0,5.05,0.6,0)
                // console.log(outlineOpac);
                tempScaling = ogOutlineSize + outlineSize * 10;
                if (outlineOpac > masterSpeed) {
                    outlineOpac -= 0.05;
                }

            } else {
                // outlineSize = 0;
                outlineOpac = 0;
                outlineMoving = false;
                tempScaling = 0;
            }
            // console.log(outlinePulse);
            // outlinePulse.scaling = outlineSize;
            outlinePulse.bounds.width = tempScaling;
            outlinePulse.bounds.height = tempScaling;
            outlinePulse.position = constructPos;
            outlinePulse.opacity = outlineOpac;
        }
    }

    var thisNote = "D#4";


    var setTrigEvent = function(trigEventVar) {
        triggerEvent = trigEventVar;
    };

    function createShape(shape) {
        thisShape = shape;
        thisShape.fillColor = clr1;
    }

    function shapeOn() {
        thisShape.strokeColor = 'NavajoWhite';
        thisShape.strokeWidth = 15.0;
    }

    function shapeOff() {
        thisShape.fillColor = clr1;
        thisShape.strokeColor = null;
    }


    var step = {
        position: getPosition,
        // stepTrig: createTrigger,
        drawStep: drawStep,
        createShape: createShape,
        setTrigEvent: setTrigEvent,
        checkDistance: checkDistance,
        triggerEvent: triggerEvent,
        available: available,
        getAvail: getAvail,
        setAvail: setAvail,
        setPitch: setPitch,
        changeKey: changeKey,
        setPitchEvent: setPitchEvent,
        loop: loop,
        getThisShape: getThisShape,
        getOutlineShape: getOutlineShape
    };

    function getThisShape() {
        return thisShape;
    }

    function getOutlineShape() {
        return outlinePulse;
    }

    function changeKey() {
        // console.log(keySteps.length);
        // console.log(keyVar);

        if(keyVar < keySteps.length-1){
            keyVar +=1;
        } else {
            keyVar = 0;
        }
        

        var note = notes[mapNoteVar + keySteps[keyVar]];
        thisNote = note;
    }


    return step;

    function drawStep() {

    }

    function setPitchEvent(tempPE) {
        //   pitchEvent = tempPE;
    }

    function setPitch(noteVar, OctaVar) {

        // var notes = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
        // var notes = ['C','D','E','F#','G','A','B'];
        // var notes = ['C3', 'E3', 'G3', 'A3', 'C4', 'E4', 'G4', 'A4', 'C5', 'E5', 'G5', 'A5', 'C6', 'E6', 'G6', 'A6'];
        // var note = notes[3] + 4;

        // var mapI = Math.round(randomIntFromInterval(0, 8));
        // var mapNote = Math.round(jsMap(noteVar, 0, view.bounds.width, 0, notes.length));
        // var mapOct = Math.round(jsMap(OctaVar, 0, view.bounds.height, 0, 8));
        // console.log(mapNote);
        // var mapI = jsMap(noteVar, 0, )

        var maxNoteTop = 360;
        var mapNote = Math.round(jsMap(noteVar, 0, maxNoteTop, 0, notes.length));

        mapNoteVar = mapNote;
        var note = notes[mapNoteVar];

        thisNote = note;

        var iMap = jsMap(noteVar, 0, view.bounds.width, 0, 1.0);
        var jMap = jsMap(OctaVar, 0, view.bounds.height, 0, 1.0);

        colorMap(iMap, jMap);

    }

    function colorMap(iVar, jVar) {
        thisColor = new Color(iVar, jVar / 2, iVar / 2);
        clr1 = thisColor;
        thisShape.fillColor = clr1;
        thisShape.opacity = 0.2;
    }

    function getPosition() {
        return position;
    }

    function getAvail() {
        var rtnavail = available;
        return rtnavail;
    }

    // Check the distance between passed Variable and this one.
    function checkDistance(testPosition) {

        var distGap = position.subtract(testPosition);
        var testResult = false;

        if (distGap.length < 15) {
            testResult = true;
        } else {
            testResult = false;
        }
        return testResult;
    }

    function setAvail(availBit) {
        available = availBit;
        if (oldAvailable == available) {

        } else {
            if (!available) {
                // console.log("out");
                triggerEvent();
            } else {
                // console.log("in");
                triggerOn();
            }
        }
        oldAvailable = available;

    }

    function loop() {
        moveOutline();
    }

    function triggerEvent() {
        outlineSize = 0;
        outlineMoving = true;
        outlineOpac = 1.0;
        // synth.triggerAttackRelease(thisNote, "16n");
        newSynth.triggerAttackRelease([thisNote, 'C4'], "4n");
        // trigger.triggerEvent(playSynth);
        shapeOn();
    }

    function triggerOn() {
        trigger.triggerOn();
        shapeOff();
    }

    // var thisNote = 10;

    function playSynth() {
        // console.log(thisNote);
        // synth.triggerAttackRelease(thisNote, "32n");
    }

}

function jsMap(val, A, B, a, b) {
    var mapd = (val - A) * (b - a) / (B - A) + a;
    return mapd;
}

function createNote(constructPos) {

    // var thisNote = "B#4";

    var kickStep = createStep(constructPos, 'DarkCyan');

    function createShape(constructPos) {
        var myShape = new paper.Path.Circle(constructPos, 10);
        return myShape;
    }


    // kickStep.setPitchEvent(setPitch);


    var myShape = createShape(constructPos);
    kickStep.createShape(myShape);

    return kickStep;

}

function createKick(constructPos) {

    // var thisNote = "B#4";

    var kickStep = createStep(constructPos, 'DarkCyan');

    function createShape(constructPos) {
        var myShape = new paper.Path.Circle(constructPos, 10);
        return myShape;
    }


    // kickStep.setPitchEvent(setPitch);

    var trigEventVar = function() {
        console.log("Synth Triggered!");
        kick.triggerAttackRelease("C2", "32n");
    };

    kickStep.setTrigEvent(trigEventVar);

    var myShape = createShape(constructPos);
    kickStep.createShape(myShape);

    return kickStep;

}