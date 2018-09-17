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
}, [{ time: 0, note: 'D2', dur: '8n', clr: 'white' }])

//pass in an array of events
var part2 = new Tone.Part(function(time, event) {
    // synth.triggerAttackRelease(event.note, event.dur, time)
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
beat.loop = 2;
beat.loopEnd = '1m';


var playing = true;

function playPause(playing) {
    if (playing) {
        // player.sync().start(0.1);
        Tone.Transport.start(0, 0);
    } else {
        Tone.Transport.stop();
    }
}

playPause(true);

var pPlay = document.getElementById('playbtn');
pPlay.addEventListener("click", function() {
    event.preventDefault();

    playing = !playing;
    playPause(playing);
});