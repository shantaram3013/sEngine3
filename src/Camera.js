class Camera {
    constructor(focusPoint) {
        this.focusPoint = focusPoint || player;
        this.pos = new Vector2(0, 0);
        this.wWidth = canvas.width/2;
        this.wHeight = canvas.height/2;
    }

    focus() {
        this.pos = this.focusPoint.pos.sMul(-1).add(new Vector2(this.wWidth, this.wHeight));
        this.pos.round();
    }

    update() {
        renderer.translate(this.pos.x, this.pos.y);
    }

    updateFocusPoint(newFocusPoint) {
        this.focusPoint = newFocusPoint || player;
    }
}