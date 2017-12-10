// Initialise Objects============================================
var playButton = document.getElementById('playbtn');
var playing = false;

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

// Initialise Objects============================================
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