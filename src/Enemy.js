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


    resolveCollision(x) {
        super.resolveCollision(x);
    }
}