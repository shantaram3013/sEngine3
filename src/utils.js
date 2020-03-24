"use strict";
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function distance(x1, x2, y1, y2) {

    const xDist = x2 - x1;
    const yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function distance(e1, e2) {

    const xDist = deltaX(e1, e2);
    const yDist = deltaY(e1, e2);

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function snapToGrid(_a) {
    return _a - (_a % Game.World.tileSize);
}

function deltaX(e1, e2) {
    return e2.pos.x - e1.pos.x;
}

function deltaY(e1, e2) {
    return e2.pos.y - e1.pos.y;
}

function clamp(value, min, max) {
    if (value < min) return min;
    else if (value > max) return max;
    return value;
}

function line(v1, v2, color, width) {
    Game.renderer.beginPath();
    if (color)
        Game.renderer.strokeStyle = color;
    if (width)
        Game.renderer.lineWidth = width;
    Game.renderer.moveTo(v1.x, v1.y);
    Game.renderer.lineTo(v2.x, v2.y);
    Game.renderer.stroke();
}

Array.prototype.remove = function (v) {
    if (this.indexOf(v) != -1) {
        this.splice(this.indexOf(v), 1);
        return true;
    }
    return false;
}

CanvasRenderingContext2D.prototype.fillCircle = function (center, radius, color) {
    this.beginPath();
    this.arc(center.x, center.y, radius, 0, 2*Math.PI);
    this.fillStyle = color || '#FFFFFF';
    this.fill();
    
}

CanvasRenderingContext2D.prototype.strokeCircle = function (center, radius, color, weight) {
    this.beginPath();
    this.arc(center.x, center.y, radius, 0, 2*Math.PI);
    this.strokeStyle = color || '#FFFFFF';
    this.lineWidth = weight;
    this.stroke();
}

function circleRectCollision(circle, rect) {

}

class Rectangle {
    constructor(pos, width, height) {
        this.corners = [
            pos,
            pos.add(new Vector2(0, height)),
            pos.add(new Vector2(0, width)),
            pos.add(new Vector2(width, height))
        ]
    }
}

class Circle {

}

Game.isPaused = function() {
    return Game.paused;
}

Game.setPause = function(bool) {
    Game.paused = bool;
    bool ? Game.UI.setPaused() : Game.UI.setUnpaused();
}