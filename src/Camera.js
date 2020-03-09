function Camera(focusPoint) {

    this.focusPoint = focusPoint || player;
    this.pos = new Vector2(0, 0);
    this.wWidth = 0;
    this.wHeight = 0;

    this.pos.x = clamp(this.wWidth / 2 - this.focusPoint.pos.x, 0, World.map.width * World.tileSize - this.wWidth);
    this.pos.y = clamp(this.wHeight / 2 - this.focusPoint.pos.y, 0, World.map.height * World.tileSize - this.wHeight);

    this.focus = function () {
        this.pos.x = clamp(this.wWidth / 2 - this.focusPoint.pos.x, 0, World.map.width * World.tileSize - this.wWidth);
        this.pos.y = clamp(this.wHeight / 2 - this.focusPoint.pos.y, 0, World.map.height * World.tileSize - this.wHeight);
    }

    this.update = function () {
        translate(this.pos.x, this.pos.y);
    }

    this.updateFocusPoint = function (newFocusPoint) {
        this.focusPoint = newFocusPoint || player;
    }
}