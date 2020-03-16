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

    }
}