Game.frameCounter = 0;

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

    Game.renderer.fillRect(0, 0, Game.World.map.width * Game.World.tileSize, Game.World.map.height * Game.World.tileSize);
    for (let x of Game.entities) {
        x.draw();
    }

    Game.renderer.setTransform(1, 0, 0, 1, 0, 0);
    Game.frameCounter++;
    window.requestAnimationFrame(draw);
}

window.inputHandler = function () {

    if (window.isKeyDown('w')) {
        player.move(Game.Directions.UP);
    }
    if (window.isKeyDown('a')) {
        player.move(Game.Directions.LEFT);
    }
    if (window.isKeyDown('s')) {
        player.move(Game.Directions.DOWN);
    }
    if (window.isKeyDown('d')) {
        player.move(Game.Directions.RIGHT);
    }
}

window.isKeyDown = function (k) {
    return window.pressedKeys[k];
}


/*
Patrolling code

    ////// outside //////

    let animCounter = 0;

    ////// in draw //////

    console.log(animCounter);

    switch (animCounter) {
        case 0:
            for (let i = 0; i <= 10; i++)
                player.move(Game.Directions.UP);
            break;
        case 20:
            for (let i = 0; i <= 10; i++)
                player.move(Game.Directions.RIGHT);
            break;
        case 40:
            for (let i = 0; i <= 10; i++)
                player.move(Game.Directions.DOWN);
            break;
        case 60:
            for (let i = 0; i <= 10; i++)
                player.move(Game.Directions.LEFT);
            break;
    }

    animCounter += 1;
    if (animCounter == 80) animCounter = 0;
*/