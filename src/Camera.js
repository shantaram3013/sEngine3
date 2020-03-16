class Camera {
    constructor(focusPoint) {
        this.focusPoint = focusPoint || player;
        this.pos = new Vector2(0, 0);
        this.wWidth = Game.canvas.width/2;
        this.wHeight = Game.canvas.height/2;
    }

    focus() {
        this.pos = this.focusPoint.pos.sMul(-1).add(new Vector2(this.wWidth, this.wHeight));
        this.pos.round();
    }

    update() {
        Game.renderer.translate(Game.canvasScale.x * this.pos.x, Game.canvasScale.y * this.pos.y);
    }

    updateFocusPoint(newFocusPoint) {
        this.focusPoint = newFocusPoint || player;
    }
}