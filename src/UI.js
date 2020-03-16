Game.UI.hideTextBox = function() {
    if (!Game.UI.textBox.hasMouseInside) {
        Game.UI.textBox.style.opacity = 0;
        return;
    }
    Game.UI.closeDialogue();
}

Game.UI.showTextBox = function() {
    Game.UI.textBox.style.opacity = 1;
}
Game.UI.setNPCName = function(s) {
    Game.UI.npcName.innerHTML = s;
}

Game.UI.setDialogueText = function(s) {
    Game.UI.dialogueBox.innerHTML = s;
}

Game.UI.openDialogue = Game.UI.showTextBox;

Game.UI.dialogueFadeTime = 3000; // milliseconds

Game.UI.closeDialogue = function() {
    setTimeout(Game.UI.hideTextBox, Game.UI.dialogueFadeTime);
}

Game.UI.scaleCanvas = function() {
    Game.canvasScale.x = Game.canvas.width / document.body.clientWidth;
    Game.canvasScale.y = Game.canvas.height / document.body.clientHeight;

    Game.mainCamera.wWidth = (document.body.clientWidth / 2);
    Game.mainCamera.wHeight = (document.body.clientHeight / 2);
}

Game.UI.setHealthBarPercentage = function(s) {
    let healthVal = clamp(s, 0, 100);
    
    Game.UI.healthBar.style.width = healthVal + '%';
    Game.UI.healthBar.style.background = `hsl(${healthVal * 1.4}, 89%, 40%)`;

    Game.UI.healthText.innerHTML = 'fuel cell at ' + healthVal + '%';
}