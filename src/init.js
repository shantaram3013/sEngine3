/* let canvas, renderer;
let canvasRect;
let mainCamera; */
let Game = {};
Game.UI = {};
Game.Info = {};

Game.init = () => {
    var divs = document.getElementsByTagName("div");
    for (var i = 0; i < divs.length; i++) {
        divs[i].hasMouseInside = false;
        divs[i].addEventListener('mouseenter', function () { this.hasMouseInside = true });
        divs[i].addEventListener('mouseleave', function () { this.hasMouseInside = false });
    }
    
    Game.UI.textBox = document.getElementById('text-box');
    Game.UI.npcName = document.getElementById('npc-name');
    Game.UI.dialogueBox = document.getElementById('dialogue');
    Game.UI.healthBar = document.getElementById('health-value');
    Game.UI.healthText = document.getElementById('health-value-text');

    window.addEventListener('keypress', Game.Input.keyDownHandler);
    window.addEventListener('keyup', Game.Input.keyUpHandler);
    window.addEventListener('mousedown', Game.Input.mouseDownHandler);
    window.addEventListener('mouseup', Game.Input.mouseUpHandler);
    window.addEventListener('contextmenu', (e) => e.preventDefault());

    Game.canvasScale = {};

    Game.canvasScale.x = 1;
    Game.canvasScale.y = 1;

    window.addEventListener('resize', Game.UI.scaleCanvas);

    Game.canvas = document.getElementById("game-canvas");
    Game.renderer = Game.canvas.getContext('2d');

    Game.canvas.width = document.body.clientWidth;
    Game.canvas.height = document.body.clientHeight;

    Game.mainCamera = new Camera(player, 10);

    Game.canvas.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    Game.UI.hideTextBox();

    alert('Welcome to sEngine3\'s playable demo.\nINSTRUCTIONS: WASD to move the yellow dot, the player.\nHollow green circles are triggers and you can press E to interact with a trigger.\nRed dots are enemies.')

    window.requestAnimationFrame(draw);
}
window.onload = Game.init;