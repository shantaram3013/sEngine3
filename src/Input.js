Game.Input = {};
Game.Input.rightMouseClicked = false;
window.pressedKeys = [];

const MOUSE_VALUES = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2
}

Game.Input.mouseUpHandler = function (e) {
    if (e.button === MOUSE_VALUES.RIGHT) {
        rightMouseClicked = false;
    }
}

Game.Input.mouseDownHandler = function(e) {
    if (e.button === MOUSE_VALUES.RIGHT) {
        Game.Input.rightMouseClicked = true;
    }

    else if (e.button === MOUSE_VALUES.LEFT) {
        if (Game.Input.rightMouseClicked) {
            // handle left + right clicked at the same time
        }

        else {
            // handle left click
        }
    }
}

Game.Input.keyDownHandler = function (e) {
    window.pressedKeys[e.key] = true;
}

Game.Input.keyUpHandler = function (e) {
    window.pressedKeys[e.key] = false;

    if (e.key === 'e') {
        if (player.triggerActive && player.isColliding(player.currentTrigger)) {
            player.currentTriggerAction();
        }
        else {
            player.triggerActive = false;
            player.currentTriggerAction = undefined;
        }
    }
}

