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

Game.Input.keyHandler = function () {

    if (Game.Input.isKeyDown('w')) {
        player.move(Game.Directions.UP);
    }
    if (Game.Input.isKeyDown('a')) {
        player.move(Game.Directions.LEFT);
    }
    if (Game.Input.isKeyDown('s')) {
        player.move(Game.Directions.DOWN);
    }
    if (Game.Input.isKeyDown('d')) {
        player.move(Game.Directions.RIGHT);
    }
}

Game.Input.isKeyDown = function (k) {
    return window.pressedKeys[k];
}