class Entity {
    constructor(_pos, _radius, _type, miscArgs) {
        this.pos = _pos || new Vector2(0, 0);
        this.radius = _radius || World.tileSize;
        console.log(`${_type}`);
        this.type = _type;
        this.miscArgs = miscArgs;
        this.vel = new Vector2(0, 0);
        console.log(this.vel);
    }

    draw() {
        if (this.type === Types.NPC) {
            fill(0, 255, 0);
        }
        if (this.type === Types.TRIGGER) {
            noFill();
            stroke(255);
        }

        ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
    }

    update() {

        this.resolveCollisions();
        this.pos = this.pos.add(this.vel);

        if (this.vel.x > World.friction) {
            this.vel.x -= World.friction;
        }

        else if (this.vel.x < -World.friction) {
            this.vel.x += World.friction;
        }

        else {
            this.vel.x = 0;
        }

        if (this.vel.y < -World.friction) {
            this.vel.y += World.friction;
        }

        else if (this.vel.y > World.friction) {
            this.vel.y -= World.friction;
        }

        else {
            this.vel.y = 0;
        }

        this.pos.round();
    }

    move(dir) {
        if (dir === Directions.UP) {
            if (this.vel.y > World.maxVel.x + 0.5)
                this.vel.y -= 0.5;
        }

        if (dir === Directions.DOWN) {
            if (this.vel.y < World.maxVel.y - 0.5)
                this.vel.y += 0.5;
        }
        if (dir === Directions.RIGHT) {
            if (this.vel.x < World.maxVel.y - 0.5)
                this.vel.x += 0.5;
        }
        if (dir === Directions.LEFT) {
            if (this.vel.x > World.maxVel.x + 0.5)
                this.vel.x -= 0.5;
        }
    }

    isColliding(x) {
        return distance(this, x) <= this.radius / 2 + x.radius / 2;
    }

    resolveCollisions() {
        for (var x of entities) {

            if (this === x) {
                continue;
            }

            if (this.isColliding(x)) {
                if (this.type == Types.PLAYER && (x.type == Types.NPC || x.type == Types.SIGN)) {
                    let midpoint = this.pos.sub(x.pos);
                    // dividing midpoint by 4 because i'm an idiot and thought the radius was actually the diameter
                    this.pos = this.pos.add(midpoint.sDiv(4));
                    // don't know why this is 1.4, but it just looks right. It's the alpha value for the lerp function
                    this.vel = this.vel.lerp(nullV, 1.4);
                }

                else if (this.type == Types.PLAYER && x.type == Types.ENEMY || this.type == Types.ENEMY && x.type == Types.PLAYER) {
                    let midpoint = this.pos.sub(x.pos);
                    this.pos = this.pos.add(midpoint.sDiv(4));
                    this.vel = this.vel.lerp(nullV, 1.4);
                }

                if (this.type == Types.PLAYER && (x.type == Types.TRIGGER)) {
                    this.triggerActive = true;
                    player.currentTrigger = this;
                    this.currentTriggerAction = x.miscArgs.parent.miscArgs.action.resolve;
                }
            }
        }
    }
}