class Audio {
    constructor (divId) {
        this.audio = document.getElementById(divId);
        this.audio.loop = false;
    }

    loop() {
        this.audio.loop = !this.audio.loop;
    }

    play() {
        if (localStorage.sound === "true") {
            this.audio.play();
        }
    }

    pause() {
        this.audio.pause();
    }
}