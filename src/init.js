/* let canvas, renderer;
let canvasRect;
let mainCamera; */
let Game = {};

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

    var rightMouseClicked = false;

    function handleMouseDown(e) {
        //e.button describes the Mouse button that was clicked
        // 0 is left, 1 is middle, 2 is right
        if (e.button === 2) {
            rightMouseClicked = true;
        }

        else if (e.button === 0) {
            //Do something if left button was clicked and right button is still pressed
            if (rightMouseClicked) {
                console.log('hello');
            }

            else {
            }
        }
    }

    function handleMouseUp(e) {
        if (e.button === 2) {
            rightMouseClicked = false;
        }
    }

    addEventListener('mousedown', handleMouseDown);
    addEventListener('mouseup', handleMouseUp);
    addEventListener('contextmenu', function (e) {
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