// var win = nw.Window.get();
function inputHandler() {

    if (keyIsDown(87)) {
        player.move(Directions.UP);
    }
    if (keyIsDown(65)) {
        player.move(Directions.LEFT);
    }
    if (keyIsDown(68)) {
        player.move(Directions.RIGHT);
    }
    if (keyIsDown(83)) {
        player.move(Directions.DOWN);
    }

}

function preload() {

}

function setup() {
    frameRate(60);
    createCanvas(innerWidth - innerWidth % World.tileSize, innerHeight - innerHeight % World.tileSize);
}

let mainCamera = new Camera(player);
let animCounter = 0;

function draw() {
    background(0, 0, 0);
    inputHandler();

    for (x of entities) {
        x.update();
    }

    fill(255, 255, 255);
    text(`${Math.round(frameRate())}`, 10, 20);

    mainCamera.wWidth = width;
    mainCamera.wHeight = height;

/*     console.log(animCounter);

    switch (animCounter) {
        case 0:
            for (let i = 0; i <= 10; i++) {
                foo.move(Directions.UP);
                foo2.move(Directions.UP);
            }
            break;
        case 20:
            for (let i = 0; i <= 10; i++) {
                foo.move(Directions.RIGHT);
                foo2.move(Directions.RIGHT);
            }
            break;
        case 40:
            for (let i = 0; i <= 10; i++) {
                foo.move(Directions.DOWN);
                foo2.move(Directions.DOWN);
            }
            break;
        case 60:
            for (let i = 0; i <= 10; i++) {
                foo.move(Directions.LEFT);
                foo2.move(Directions.LEFT);
            }
            break;
    }

    animCounter += 1;
    if (animCounter == 80) animCounter = 0; */

    mainCamera.focus();
    mainCamera.update();

    for (x of entities) {
        x.draw();
    }

    inputHandler();
}

function windowResized() {
    resizeCanvas(innerWidth - innerWidth % World.tileSize, innerHeight - innerHeight % World.tileSize);
}

function keyReleased() {
    if (keyCode === 69) {
        if(player.triggerActive) {
            player.currentTriggerAction();
        }
    }
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
                player.move(Directions.UP);
            break;
        case 20:
            for (let i = 0; i <= 10; i++)
                player.move(Directions.RIGHT);
            break;
        case 40:
            for (let i = 0; i <= 10; i++)
                player.move(Directions.DOWN);
            break;
        case 60:
            for (let i = 0; i <= 10; i++)
                player.move(Directions.LEFT);
            break;
    }

    animCounter += 1;
    if (animCounter == 80) animCounter = 0;
*/