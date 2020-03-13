Game.UI = {}

Game.UI.hideTextBox = function() {
    document.getElementById("text-box").style.opacity = 0;
}

Game.UI.showTextBox = function() {
    document.getElementById("text-box").style.opacity = 1;
}
Game.UI.setNPCName = function(s) {
    document.getElementById("npc-name").innerHTML = s;
}

Game.UI.setDialogueText = function(s) {
    document.getElementById("dialogue").innerHTML = s;
}

Game.UI.openDialogue = Game.UI.showTextBox;

Game.UI.dialogueFadeTime = 3000; // milliseconds

Game.UI.closeDialogue = function() {
    setTimeout(Game.UI.hideTextBox, Game.UI.dialogueFadeTime);
}

Game.UI.setHealthBarPercentage = function(s) {
    healthVal = clamp(s, 0, 100);
    let bar = document.getElementById("health-value");
    bar.style.width = healthVal + '%';

    bar.style.background = '#e52222'; // red
    if (healthVal >= 25) {
        bar.style.background = '#fd971f'; // orange
        if (healthVal >= 50) {
            bar.style.background = '#a6e22e'; // yellow
            if (healthVal >= 75) {
                bar.style.background = '#8DBD0C'; // green
            }
        }
    }

    if (healthVal >= 75) {
        bar.style.background = '#8DBD0C'; // green
    }

    else if (healthVal >= 50) {
        bar.style.background = '#a6e22e'; // yellow
    }

    else if (healthVal >= 25) {
        bar.style.background = '#fd971f'; // orange
    }

    else {
        bar.style.background = '#e52222'; // red
    }

    let text = document.getElementById('health-value-text');
    text.innerHTML = 'fuel cell at ' + healthVal + '%';

}