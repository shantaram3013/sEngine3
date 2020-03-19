class Entity {

    constructor(_pos, _radius, _type, miscArgs) {
        this.pos = _pos || new Vector2(0, 0);
        this.radius = _radius || Game.World.tileSize;
        this.type = _type;
        this.miscArgs = miscArgs;
        this.vel = new Vector2(0, 0);
        /* this.health = 100;
        this.defense = 1;
        this.attack = 5; */
    }

    draw() {

        switch (this.type) {
            case Game.ETypes.NPC:
                Game.renderer.fillCircle(this.pos, this.radius, 'green');
                break;
            case Game.ETypes.TRIGGER:
                Game.renderer.strokeCircle(this.pos, this.radius, 'green', 2);
                break;
            default:
                console.log("Unimplemented draw operation attempted.");
                break;
        }
    }

    update() {

        if (this.miscArgs.parent) {
            this.pos = this.miscArgs.parent.pos;
        }
        
        else {
            this.resolveCollisions();
            this.pos = this.pos.add(this.vel);

            if (this.vel.x > Game.World.friction) {
                this.vel.x -= Game.World.friction;
            }

            else if (this.vel.x < -Game.World.friction) {
                this.vel.x += Game.World.friction;
            }

            else {
                this.vel.x = 0;
            }

            if (this.vel.y < -Game.World.friction) {
                this.vel.y += Game.World.friction;
            }

            else if (this.vel.y > Game.World.friction) {
                this.vel.y -= Game.World.friction;
            }

            else {
                this.vel.y = 0;
            }
        }
        this.pos.x = clamp(this.pos.x, 0, Game.World.map.width * Game.World.tileSize);
        this.pos.y = clamp(this.pos.y, 0, Game.World.map.height * Game.World.tileSize);

        this.pos.round();
    }

    move(dir) {
        if (dir === Game.Directions.UP) {
            if (this.vel.y > Game.World.maxVel.x + 0.5)
                this.vel.y -= 1;
        }

        if (dir === Game.Directions.DOWN) {
            if (this.vel.y < Game.World.maxVel.y - 0.5)
                this.vel.y += 1;
        }
        if (dir === Game.Directions.RIGHT) {
            if (this.vel.x < Game.World.maxVel.y - 0.5)
                this.vel.x += 1;
        }
        if (dir === Game.Directions.LEFT) {
            if (this.vel.x > Game.World.maxVel.x + 0.5)
                this.vel.x -= 1;
        }
    }

    isColliding(x) {
        return distance(this, x) <= this.radius + x.radius;
    }
    
    resolveCollisions() {
        if (this.type === Game.ETypes.NPC || this.type === Game.ETypes.SIGN)
            return;
    }
}


/*

String str = "hello";
str.substring(3);

ArrayList<String> str = new ArrayList();
str.add("hello");

*/