class Choice {
    constructor(text, next, callback) {
        this.next = next;
        this.text = text;
        this.callback = callback;
    }

    resolve() {
        if (this.next) {
            Game.setCurrentPrompt(this.next);
        }
        if (this.callback) {
            this.callback();
        }
        return;
    }

    toHTMLChoice() {
        let btn = document.createElement("div");
        btn.classList.add("button-div");
        btn.choice = this;
        btn.innerHTML = this.text;
    
        btn.addEventListener('click', () => {
                btn.choice.resolve();
            // game.audio.snipFX.play();
        })
        Game.UI.btnWrapper.appendChild(btn);
    }
}