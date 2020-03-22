Game.UI.hideTextBox = function () {
    if (!Game.UI.textBox.hasMouseInside) {
        Game.UI.textBox.style.opacity = 0;
        return;
    }
    Game.UI.closeDialogue();
}

Game.UI.showTextBox = function () {
    Game.UI.textBox.style.opacity = 1;
}
Game.UI.setNPCName = function (s) {
    Game.UI.npcName.innerHTML = s;
}

Game.UI.setDialogueText = function (s) {
    Game.UI.dialogueBox.innerHTML = s;
}

Game.UI.openDialogue = Game.UI.showTextBox;

Game.UI.dialogueFadeTime = 3000;

Game.UI.closeDialogue = function () {
    setTimeout(Game.UI.hideTextBox, Game.UI.dialogueFadeTime);
}

Game.UI.scaleCanvas = function () {
    Game.canvasScale.x = Game.canvas.width / document.body.clientWidth;
    Game.canvasScale.y = Game.canvas.height / document.body.clientHeight;

    Game.mainCamera.wWidth = (document.body.clientWidth / 2);
    Game.mainCamera.wHeight = (document.body.clientHeight / 2);
}

Game.UI.healthBarDelta = 0.5;
Game.UI.healthBarIncrementTime = 50;
Game.UI.healthBarTimeouts = []

Game.UI.setHealthBarPercentage = function (s) {

    let healthVal = clamp(s, 0, 100);
    healthVal = Math.round(healthVal);
    if (Game.UI.healthBarTimeouts !== []) {
        for (let x of Game.UI.healthBarTimeouts) {
            window.clearTimeout(x);
        }
    }
    if (Game.UI.healthBar.style.width !== "") {
        widthVal = parseFloat(Game.UI.healthBar.style.width.replace('%', ''));
    }
    else {
        Game.UI.healthBar.style.width = '100%';
        widthVal = 100;
    }

    if (widthVal === healthVal) {
        return 0; 
    }

    // either add or subtract healthBarDelta depending on whether healthVal is greater than or less than the current width
    Game.UI.healthBar.style.width = (widthVal + (Math.sign(healthVal - widthVal) * Game.UI.healthBarDelta)) + '%';

    Game.UI.healthBarTimeouts.push(setTimeout(
        Game.UI.setHealthBarPercentage, Game.UI.healthBarIncrementTime, healthVal));

    Game.UI.healthBar.style.background = `hsl(${healthVal * 1.4}, 89%, 40%)`;
    Game.UI.healthText.innerHTML = 'fuel cell at ' + healthVal + '%';
}