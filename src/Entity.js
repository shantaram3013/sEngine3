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
            renderer.fillCircle(this.pos, this.radius, 'green');
        }
        else if (this.type === Types.TRIGGER) {
            renderer.strokeCircle(this.pos, this.radius, 'green', 2);
        }
        else if (this.type === Types.ENEMY) {
            renderer.fillCircle(this.pos, this.radius, 'red');
        }
        else if (this.type === Types.PLAYER) {
            renderer.fillCircle(this.pos, this.radius, 'yellow');
        }
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
        this.pos.x = clamp(this.pos.x, 0, World.map.width * World.tileSize);
        this.pos.y = clamp(this.pos.y, 0, World.map.height * World.tileSize);
    }

    move(dir) {
        if (dir === Directions.UP) {
            if (this.vel.y > World.maxVel.x + 0.5)
                this.vel.y -= 1;
        }

        if (dir === Directions.DOWN) {
            if (this.vel.y < World.maxVel.y - 0.5)
                this.vel.y += 1;
        }
        if (dir === Directions.RIGHT) {
            if (this.vel.x < World.maxVel.y - 0.5)
                this.vel.x += 1;
        }
        if (dir === Directions.LEFT) {
            if (this.vel.x > World.maxVel.x + 0.5)
                this.vel.x -= 1;
        }
    }

    isColliding(x) {
        return distance(this, x) <= this.radius + x.radius;
    }

    resolveCollisions() {
        for (let x of entities) {

            if (this === x) {
                continue;
            }

            if (this.isColliding(x)) {
                if ((this.type === Types.PLAYER || this.type === Types.ENEMY) && (x.type === Types.NPC || x.type === Types.SIGN)) {
                    let midpoint = this.pos.sub(x.pos);
                    this.pos = this.pos.add(midpoint.sDiv(16)); // nfi why this works but it does
                    this.vel = this.vel.lerp(nullV, World.velocityLerpValue);
                }

                else if (this.type === Types.PLAYER && x.type === Types.ENEMY || this.type === Types.ENEMY && x.type === Types.PLAYER) {
                    let midpoint = this.pos.sub(x.pos);
                    this.pos = this.pos.add(midpoint.sDiv(4));
                    this.vel = this.vel.lerp(nullV, World.velocityLerpValue);
                }

                else if (this.type === Types.PLAYER && x.type === Types.TRIGGER) {
                    
                }

                else {
                };

                if (this.type === Types.PLAYER && (x.type === Types.TRIGGER)) {
                    this.triggerActive = true;
                    this.currentTrigger = x;
                    this.currentTriggerAction = x.miscArgs.parent.miscArgs.action.resolve;
                }
            }
        }
    }
}