class Entity {

    constructor(_pos, _radius, _type, miscArgs) {
        this.pos = _pos || new Vector2(0, 0);
        this.radius = _radius || Game.World.tileSize;
        console.log(`${_type}`);
        this.type = _type;
        this.miscArgs = miscArgs;
        this.vel = new Vector2(0, 0);
        console.log(this.vel);
    }

    draw() {
        
        switch (this.type) {
            case Game.ETypes.NPC:
                Game.renderer.fillCircle(this.pos, this.radius, 'green');
                break;
            case Game.ETypes.TRIGGER:
                Game.renderer.strokeCircle(this.pos, this.radius, 'green', 2);
                break;
            case Game.ETypes.ENEMY:
                Game.renderer.fillCircle(this.pos, this.radius, 'red');
                break;
            case Game.ETypes.PLAYER:
                Game.renderer.fillCircle(this.pos, this.radius, 'yellow');
                break;
            default:
                console.log("Unimplemented draw operation attempted.");
                break;
        }
    }

    update() {

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
        for (let x of Game.entities) {

            if (this === x) {
                continue;
            }

            if (this.isColliding(x)) {
                if ((this.type === Game.ETypes.PLAYER || this.type === Game.ETypes.ENEMY) && (x.type === Game.ETypes.NPC || x.type === Game.ETypes.SIGN)) {
                    let midpoint = this.pos.sub(x.pos);
                    this.pos = this.pos.add(midpoint.sDiv(16)); // nfi why this works but it does
                    this.vel = this.vel.lerp(nullV, Game.World.velocityLerpValue);
                }

                else if (this.type === Game.ETypes.PLAYER && x.type === Game.ETypes.ENEMY || this.type === Game.ETypes.ENEMY && x.type === Game.ETypes.PLAYER) {
                    let midpoint = this.pos.sub(x.pos);
                    this.pos = this.pos.add(midpoint.sDiv(2));
                    this.vel = this.vel.lerp(nullV, Game.World.velocityLerpValue);
                }

                else if (this.type === Game.ETypes.PLAYER && x.type === Game.ETypes.TRIGGER) {

                }

                else {
                }

                if (this.type === Game.ETypes.PLAYER && (x.type === Game.ETypes.TRIGGER)) {
                    this.triggerActive = true;
                    this.currentTrigger = x;
                    this.currentTriggerAction = x.miscArgs.parent.miscArgs.action.resolve;
                }
            }
        }
    }
}