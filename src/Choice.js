class Choice {
    constructor(text, next, callback) {
        this.next = next;
        this.text = text;
        this.score = score;
        this.callback = callback;
    }

    resolve() {
        Game.setCurrentPrompt(this.next);
        if (this.callback) {
            this.callback();
        }
        return;
    }

    toHTMLChoice() {
        let btnWrapper = document.createElement("div");
        btnWrapper.class = "buttonWrapper";

        let btn = document.createElement("button");
        btn.choice = this;
        btn.innerHTML = this.text;

        btn.addEventListener('click', () => {
            if (!game.writer.currentlyTyping) {
                btn.choice.resolve();
            }
            game.audio.snipFX.play();
        })

        btnWrapper.appendChild(btn);
        document.getElementById("choiceWrapper").appendChild(btnWrapper);
    }
}