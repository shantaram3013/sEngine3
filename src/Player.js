class Player extends Entity {

    constructor(_pos, maxHealth) {
        super(_pos, Game.World.tileSize, Game.ETypes.PLAYER, {})
        this.pos = _pos || new Vector2(0, 0);
        this.vel = new Vector2(0, 0);
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.defense = 1;
        this.attack = 5;
    }

    draw() {
        Game.renderer.strokeCircle(this.pos, this.radius, 'yellow');
    }

    resolveCollisions() {

        Game.UI.setHealthBarPercentage((this.health / this.maxHealth) * 100);

        for (let x of Game.entities) {

            if (this === x) {
                continue;
            }

            if (this.isColliding(x)) {
                if (x.type === Game.ETypes.NPC || x.type === Game.ETypes.SIGN) {
                    let midpoint = this.pos.sub(x.pos);
                    this.pos = this.pos.add(midpoint.sDiv(16)); // nfi why this works but it does
                    this.vel = this.vel.lerp(nullV, Game.World.velocityLerpValue);
                }

                else if (x.type === Game.ETypes.ENEMY) {
                    let midpoint = this.pos.sub(x.pos);
                    this.pos = this.pos.add(midpoint.sDiv(2));
                    this.vel = this.vel.lerp(nullV, Game.World.velocityLerpValue);
                }

                else {

                }

                if (x.type === Game.ETypes.TRIGGER) {
                    this.triggerActive = true;
                    this.currentTrigger = x;
                    this.currentTriggerAction = x.miscArgs.parent.miscArgs.action.resolve;
                }
            }
        }
    }
}