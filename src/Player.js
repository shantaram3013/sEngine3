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

}