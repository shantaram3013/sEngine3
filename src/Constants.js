const nullV = new Vector2(0, 0);
const unitV = new Vector2(1, 1);

const Directions = {
    UP: "up",
    DOWN: "down",
    LEFT: "left",
    RIGHT: "right"
}

let World = {
    bgColor: 'black',
    tileSize: 30,
    map: {
        width: 100,
        height: 100
    },
    friction: 0.2,
    maxVel: new Vector2(-5, 5),
}

const Types = {
    PLAYER: 0,
    ENEMY: 1,
    TRIGGER: 2,
    NPC: 3,
    SIGN: 4,
    TILE: 5,
    MELEE: 6,
    SIGHT_CIRCLE: 7,
}

const States = {
    IDLE: 0,
    WALK: 1,
    ATTACK: 2
}

let player = new Entity(new Vector2(innerWidth / 2, innerHeight / 2),
    World.tileSize,
    Types.PLAYER,
    {});

let foo = new Entity(new Vector2(innerWidth / 3, innerHeight / 3),
    World.tileSize,
    Types.ENEMY,
    {});

let foo2 = new Entity(new Vector2(innerWidth / 4, innerHeight / 3),
    World.tileSize,
    Types.NPC,
    {
        action: {
            resolve: () => {
                console.log('hiii! testing action resolution...');
            },
        }
    });

let foo2_trigger = new Entity(new Vector2(foo2.pos.x, foo2.pos.y),
    World.tileSize * 4,
    Types.TRIGGER,
    {
        parent: foo2,
    });



let entities = []

entities.push(player);
entities.push(foo);
entities.push(foo2);
entities.push(foo2_trigger);