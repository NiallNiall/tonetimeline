// Alt way of loading
// ========================
// var player = new Tone.Player();
// player.load("./sounds/quickloop.wav", loaded());
// player.toMaster();

var player = new Tone.Player({
    "url": "./sounds/quickloop.wav",
    "loop": false
}).toMaster();

Tone.Buffer.on('load', function() {
    //all buffers are loaded.
    songLoaded = true;
    console.log("All Loaded!");
})

// DOM VARS========================================
var mainbox = document.getElementById('mainbox');

Tone.Transport.bpm.value = 123;

var synth = new Tone.SimpleSynth().toMaster();

//pass in an array of events
var part = new Tone.Part(function(time, event) {
    //the events will be given to the callback with the time they occur
    // synth.triggerAttackRelease(event.note, event.dur, time)
    // console.log('yo');
    // mainbox.classList.toggle(event.clr);
}, [{ time: 0, note: 'D2', dur: '8n', clr: 'white' }])

//pass in an array of events
var part2 = new Tone.Part(function(time, event) {
    //the events will be given to the callback with the time they occur
    synth.triggerAttackRelease(event.note, event.dur, time)
    // console.log('yo');
    // mainbox.classList.toggle(event.clr);
}, [{ time: 0, note: 'D2', dur: '8n', clr: 'white' }])

//start the part at the beginning of the Transport's timeline
part.start(0)
part.loop = 2

// This unit must be in m for measure (which is sorr've a bar)
part2.start("2m")
part2.loop = 4


var beat = new Tone.Part(function(time, event) {
    midsize = 200;
    nextSpriteFrame();
    // synth.triggerAttackRelease(event.note, event.dur, time)
}, [{ time: 0, note: 'D4', dur: '8n' }])

beat.start(0)
beat.loop = 8;
beat.loopEnd = '1m';


// player.sync().start(0).stop(0.3);

// Tone.Transport.stop();
// Tone.Transport.start('+0.1');
// player.autostart = true;

var playing = false;

function playPause(playing) {
    if (playing) {
        player.sync().start(0.1);
        Tone.Transport.start(0, 0);
    } else {
        Tone.Transport.stop();
    }
}

var pPlay = document.getElementById('playbtn');
pPlay.addEventListener("click", function() {
    event.preventDefault();

    playing = !playing;
    playPause(playing);
});