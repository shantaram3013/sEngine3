class Camera {
    constructor(focusPoint) {
        this.focusPoint = focusPoint || player;
        this.pos = new Vector2(0, 0);
        this.wWidth = 0;
        this.wHeight = 0;

        this.pos.x = clamp(this.wWidth / 2 - this.focusPoint.pos.x, 0, World.map.width * World.tileSize - this.wWidth);
        this.pos.y = clamp(this.wHeight / 2 - this.focusPoint.pos.y, 0, World.map.height * World.tileSize - this.wHeight);
    }
    focus() {
        this.pos.x = clamp(this.wWidth / 2 - this.focusPoint.pos.x, 0, World.map.width * World.tileSize - this.wWidth);
        this.pos.y = clamp(this.wHeight / 2 - this.focusPoint.pos.y, 0, World.map.height * World.tileSize - this.wHeight);
    }

    update() {
        translate(this.pos.x, this.pos.y);
    }

    updateFocusPoint(newFocusPoint) {
        this.focusPoint = newFocusPoint || player;
    }
}