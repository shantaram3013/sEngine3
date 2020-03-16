/* let canvas, renderer;
let canvasRect;
let mainCamera; */
let Game = {};

Game.init = () => {
    
    window.addEventListener('keypress', Game.Input.keyDownHandler);
    window.addEventListener('keyup', Game.Input.keyUpHandler);
    window.addEventListener('mousedown', Game.Input.mouseDownHandler);
    window.addEventListener('mouseup', Game.Input.mouseUpHandler);
    window.addEventListener('contextmenu', (e) => e.preventDefault());
    
    Game.canvasScale = {}

    Game.canvasScale.x = 1;
    Game.canvasScale.y = 1;

    window.addEventListener('resize', Game.UI.scaleCanvas);

    Game.canvas = document.getElementById("game-canvas");
    Game.renderer = Game.canvas.getContext('2d');

    Game.canvas.width = document.body.clientWidth;
    Game.canvas.height = document.body.clientHeight;

    Game.mainCamera = new Camera(player);

    Game.canvas.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    Game.UI.hideTextBox();
    window.requestAnimationFrame(draw);
}
window.onload = Game.init;