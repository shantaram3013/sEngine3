class Camera {
    constructor(focusPoint, speed) {
        this.focusPoint = focusPoint || player;
        this.pos = new Vector2(0, 0);
        this.wWidth = Game.canvas.width / 2;
        this.wHeight = Game.canvas.height / 2;
        this.speed = speed || 10;
    }

    focus() {
        this.targetPos = this.focusPoint.pos.sMul(-1).add(new Vector2(this.wWidth, this.wHeight));
        this.pos.round();
    }

    update() {
        this.pos.x += (this.targetPos.x - this.pos.x) / this.speed;
        this.pos.y += (this.targetPos.y - this.pos.y) / this.speed;
        Game.renderer.translate(Game.canvasScale.x * this.pos.x, Game.canvasScale.y * this.pos.y);
    }

    updateFocusPoint(newFocusPoint) {
        this.focusPoint = newFocusPoint || player;
    }
}