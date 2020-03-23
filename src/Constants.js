const nullV = new Vector2(0, 0);
const unitV = new Vector2(1, 1);

Game.Directions = {
    UP: "up",
    DOWN: "down",
    LEFT: "left",
    RIGHT: "right"
}

Game.World = {
    bgColor: 'black',
    tileSize: 30,
    map: {
        width: 100,
        height: 100
    },
    friction: 0.1,
    maxVel: new Vector2(-5, 5), // not a vector, but a limit
    // don't know why this is 1.4, but it just looks right (might be because 1.4 ~ 1.414 ~ sqrt(2)?). It's the alpha value for the lerp function
    velocityLerpValue: 1.4,
}

Game.World.fleshDensity = 1;

Game.ETypes = {
    PLAYER: 0,
    ENEMY: 1,
    TRIGGER: 2,
    NPC: 3,
    SIGN: 4,
    TILE: 5,
    MELEE: 6,
}

Game.EStates = {
    IDLE: 0,
    WALK: 1,
    ATTACK: 2
}

Game.TTypes = {
    DIALOGUE: 0,
    EVENT: 1
}

let player = new Player(new Vector2(innerWidth / 2, innerHeight / 3), 100);

let foo = new Enemy(new Vector2(innerWidth / 3, innerHeight / 3),
    Game.World.tileSize,
    {});

let foo2 = new Entity(new Vector2(innerWidth / 4, innerHeight / 3),
    Game.World.tileSize,
    Game.ETypes.NPC,
    {
        action: {
            resolve: () => {
                Game.UI.openDialogue();
                Game.UI.setNPCName('The first NPC ever');
                Game.UI.setDialogueText('You talked to me!');
                Game.UI.closeDialogue();
                player.currentTriggerAction = undefined;
            },
        }
    });

let foo2_trigger = new Entity(new Vector2(foo2.pos.x, foo2.pos.y),
    Game.World.tileSize * 2,
    Game.ETypes.TRIGGER,
    {
        parent: foo2,
        triggerType: Game.TTypes.DIALOGUE,
        beginDialogueAt: "0000"

    });



Game.entities = []

Game.entities.push(player);
Game.entities.push(foo);
Game.entities.push(foo2);
Game.entities.push(foo2_trigger);

let mouse = {
    x: 0,
    y: 0
}