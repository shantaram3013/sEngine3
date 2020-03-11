let canvas, renderer;
let canvasRect;
let mainCamera;

function init() {
    window.addEventListener('keypress', (e) => {
        if (e.key === 'w') {
            player.move(Directions.UP);
        }
        if (e.key === 'a') {
            player.move(Directions.LEFT);
        }
        if (e.key === 's') {
            player.move(Directions.DOWN);
        }
        if (e.key === 'd') {
            player.move(Directions.RIGHT);
        }
    });

    window.addEventListener('keyup', (e) => {
        if (e.key === 'e') {
            if (player.triggerActive) {
                player.currentTriggerAction();
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
        e.preventDefault();
    });

    canvas = document.getElementById("game-canvas");
    renderer = canvas.getContext('2d');
    canvasRect = canvas.getBoundingClientRect();

    canvas.width = snapToGrid(window.innerWidth - Math.round(0.05*window.innerWidth));
    canvas.height = snapToGrid(window.innerHeight - Math.round(0.20*window.innerHeight));

    mainCamera = new Camera(player);

    /* canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight; */

    canvas.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX - canvasRect.left;
        mouse.y = e.clientY - canvasRect.top;
    });

    window.requestAnimationFrame(draw);
}
window.onload = init;