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
        Game.UI.setHealthBarPercentage(this.health/this.maxHealth * 100);
        Game.renderer.strokeCircle(this.pos, this.radius, 'yellow');
    }

    update() {
        super.update();
        if (Game.Info.frameCounter % 60 == 0) {
            if (this.health < 100) this.health += 1;
            this.health = clamp(this.health, 0, this.maxHealth);
        }

        if (this.moving) {
            this.health -= 0.03;
        }
    }

    setActiveTrigger(x) {
        this.triggerActive = true;
        this.currentTrigger = x;
        this.currentTriggerAction = x.miscArgs.parent.miscArgs.action.resolve;
    }

    die() {

    }
}