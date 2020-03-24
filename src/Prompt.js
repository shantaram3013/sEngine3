class Prompt {
    constructor(text, speaker, choices) {
        this.text = text;
        this.choices = choices;
        this.speaker = speaker;
    }

    draw() {
        // disableAllButtons();
        for (choice of this.choices) {
            choice.toHTMLButton();
        }

        Game.UI.setDialogueText(this.text);
        Game.UI.setNPCName(this.speaker);
    }
}