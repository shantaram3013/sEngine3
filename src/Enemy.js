class Enemy extends Entity {
    constructor(pos, radius, miscArgs, hp, atk, def) {
        super(pos, radius, Game.ETypes.ENEMY, miscArgs);

        this.health = hp || 100;
        this.attack = atk || 5;
        this.defense = def || 1;
    }

    draw() {
        Game.renderer.fillCircle(this.pos, this.radius, 'red');
    }

    resolveCollisions() {
        for (let x of Game.entities) {

            if (this === x) {
                continue;
            }

            if (this.isColliding(x)) {
                if ((x.type === Game.ETypes.NPC || x.type === Game.ETypes.SIGN)) {
                    let midpoint = this.pos.sub(x.pos);
                    this.pos = this.pos.add(midpoint.sDiv(16)); // nfi why this works but it does
                    this.vel = this.vel.lerp(nullV, Game.World.velocityLerpValue);
                }

                else if (x.type === Game.ETypes.PLAYER) {
                    let midpoint = this.pos.sub(x.pos);
                    this.pos = this.pos.add(midpoint.sDiv(2));
                    this.vel = this.vel.lerp(nullV, Game.World.velocityLerpValue);
                }

                else {
                
                }
            }
        }
    }
}