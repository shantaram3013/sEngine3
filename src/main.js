
let animCounter = 0;

function draw() {
    
    renderer.clearRect(0, 0, canvas.width, canvas.height);

    for (x of entities) {
        x.update();
    }

    window.inputHandler();

    /*
    console.log(animCounter);

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
    if (animCounter == 80) animCounter = 0;
    */

    mainCamera.focus();
    mainCamera.update();

    for (let x of entities) {
        x.draw();
    }

    renderer.setTransform(1, 0, 0, 1, 0, 0);
    window.requestAnimationFrame(draw);
}

window.inputHandler = function () {

    if (window.isKeyDown('w')) {
        player.move(Directions.UP);
    }
    if (window.isKeyDown('a')) {
        player.move(Directions.LEFT);
    }
    if (window.isKeyDown('s')) {
        player.move(Directions.DOWN);
    }
    if (window.isKeyDown('d')) {
        player.move(Directions.RIGHT);
    } 
}

window.isKeyDown = function(k) {
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