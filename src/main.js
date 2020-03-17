Game.Info.frameCounter = 0;

Game.mapBGColor = '#472000';

function draw() {

    Game.renderer.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
    Game.renderer.fillStyle = Game.mapBGColor;

    for (x of Game.entities) {
        x.update();
    }

    window.inputHandler();

    Game.mainCamera.focus();
    Game.mainCamera.update();

    Game.renderer.scale(Game.canvasScale.x, Game.canvasScale.y);

    Game.renderer.fillRect(0, 0, Game.World.map.width * Game.World.tileSize, Game.World.map.height * Game.World.tileSize);
    for (let x of Game.entities) {
        x.draw();
    }
    

    Game.renderer.setTransform(1, 0, 0, 1, 0, 0);
    Game.Info.frameCounter++;
    window.requestAnimationFrame(draw);
}