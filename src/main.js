Game.Info.frameCounter = 0;
Game.Info.startTime = new Date().getSeconds();

Game.Info.getElapsedSeconds = function() {
    return new Date().getSeconds() - Game.Info.startTime;
}

Game.Info.frameRate = function() {
    return Game.Info.frameCounter / Game.Info.getElapsedSeconds();
}

Game.mapBGColor = '#472000';
Game.Time = {
d2: new Date(),
d1: new Date(),
dt: 16.66
}
function draw() {
    Game.Time.d2 = Game.Time.d1;
    Game.Time.d1 = new Date();

    Game.Time.dt = Math.abs(Game.Time.d1 - Game.Time.d2);

    Game.renderer.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
    Game.renderer.fillStyle = Game.mapBGColor;

    for (x of Game.entities) {
        x.update(Game.Time.dt);
    }

    Game.Input.keyHandler();

    Game.mainCamera.focus();
    Game.mainCamera.update(Game.Time.dt);

    Game.renderer.scale(Game.canvasScale.x, Game.canvasScale.y);
    
    Game.renderer.fillRect(0, 0, Game.World.map.width * Game.World.tileSize, Game.World.map.height * Game.World.tileSize);
    
    // new TileMap().draw();

    for (let x of Game.entities) {
        x.draw();
    }

    Game.renderer.setTransform(1, 0, 0, 1, 0, 0);
    Game.Info.frameCounter++;
    window.requestAnimationFrame(draw);
}