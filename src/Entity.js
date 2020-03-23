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

    update(delta) {
        this.resolveCollisions();
        if (this.miscArgs.parent) {
            this.pos = this.miscArgs.parent.pos;
        }
        else {
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

        if (this.vel.equals(nullV)) {
            this.moving = false;
        }

        this.pos.x = clamp(this.pos.x, this.radius, Game.World.map.width * Game.World.tileSize - this.radius);
        this.pos.y = clamp(this.pos.y, this.radius, Game.World.map.height * Game.World.tileSize - this.radius);

        this.pos.round();
    }

    move(dir, dv) {
        this.moving = true;
        if (dir === Game.Directions.UP) {
            if (this.vel.y > Game.World.maxVel.x + dv/2)
                this.vel.y -= dv;
        }

        if (dir === Game.Directions.DOWN) {
            if (this.vel.y < Game.World.maxVel.y - dv/2)
                this.vel.y += dv;
        }
        if (dir === Game.Directions.RIGHT) {
            if (this.vel.x < Game.World.maxVel.y - dv/2)
                this.vel.x += dv;
        }
        if (dir === Game.Directions.LEFT) {
            if (this.vel.x > Game.World.maxVel.x + dv/2)
                this.vel.x -= dv;
        }
    }

    isColliding(x) {
        return distance(this, x) <= this.radius + x.radius;
    }

    resolveCollisions() {
        for (let x of Game.entities) {

            if (this === x) return;

            if (this.isColliding(x)) {
                    this.resolveCollision(x);
            }
        }
    }

    resolveCollision(x) {
        if (![Game.ETypes.TRIGGER].includes(this.type)) {
            // position math learnt from https://www.youtube.com/watch?v=LPzyNOHY3A4
            let distance = this.pos.sub(x.pos);
            let length = distance.len();
            let overlap = (length - x.radius - this.radius);
            let displacement = 0.5 * overlap;
            if (![Game.ETypes.SIGN, Game.ETypes.NPC].includes(this.type)) {

                // each body undergoes half the displacement
                this.pos = this.pos.sub(distance.sMul(displacement/length));
                x.pos = x.pos.add(distance.sMul(displacement/length));
            }
            else {
                // if an NPC or SIGN is involved, the entire displacement is undergone by the other body
                x.pos = x.pos.add(distance.sMul(overlap/length));
            }
        }

        else {
            if (x.type === Game.ETypes.PLAYER) {
                x.setActiveTrigger(this);
            }
        }

        if ([Game.ETypes.ENEMY, Game.ETypes.PLAYER].includes(x.type)
            && [Game.ETypes.ENEMY, Game.ETypes.PLAYER].includes(this.type)) {
            let u1 = this.vel;
            let u2 = x.vel;

            let m1 = (Math.pow(this.radius, 3) * 4) * Game.World.fleshDensity;
            let m2 = (Math.pow(x.radius, 3) * 4) * Game.World.fleshDensity;

            x.vel = u1.sMul(m1).add(u2.sMul(m2)).sub(u2.sMul(m1)).sDiv(m1 + m2);
            this.vel = u2.sub(u1).add(x.vel);
        }
    }

    applyForceInDirection(direction, magnitude) {
        let vec = new Vector2(1, 1);
        vec.x = Math.cos(direction) * magnitude;
        vec.y = Math.sin(direction) * magnitude;
        this.vel = this.vel.add(vec);
    }
}