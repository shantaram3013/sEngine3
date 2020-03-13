/* let canvas, renderer;
let canvasRect;
let mainCamera; */
let Game = {};
const MOUSE_VALUES = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2
}

Game.init = () => {
    window.pressedKeys = [];
    window.addEventListener('keypress', (e) => {
        window.pressedKeys[e.key] = true;
    });

    window.addEventListener('keyup', (e) => {
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
    });

    let rightMouseClicked = false;

    function handleMouseDown(e) {
        if (e.button === MOUSE_VALUES.RIGHT) {
            rightMouseClicked = true;
        }

        else if (e.button === MOUSE_VALUES.LEFT) {
            if (rightMouseClicked) {
                // handle left + right clicked at the same time
            }

            else {
                // handle left click
            }
        }
    }

    function handleMouseUp(e) {
        if (e.button === MOUSE_VALUES.RIGHT) {
            rightMouseClicked = false;
        }
    }

    addEventListener('mousedown', handleMouseDown);
    addEventListener('mouseup', handleMouseUp);
    addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });

    Game.canvas = document.getElementById("game-canvas");
    Game.renderer = Game.canvas.getContext('2d');

    /* canvas.width = snapToGrid(window.innerWidth - Math.round(0.05*window.innerWidth));
    canvas.height = snapToGrid(window.innerHeight - Math.round(0.20*window.innerHeight)); */

    Game.canvas.width = document.body.clientWidth;
    Game.canvas.height = document.body.clientHeight;

    Game.mainCamera = new Camera(player);

    /* canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight; */

    Game.canvas.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.requestAnimationFrame(draw);
}
window.onload = Game.init;