class TileMap {

    constructor(str) {
    }
    
    draw() {
        Game.renderer.fillStyle = "#000000";
        Game.renderer.fillRect(0, 0, 3000, 3000);

        for (let x = 0; x < Game.World.mapW * Game.World.tileSize; x += Game.World.tileSize) {
            for(let y = 0; y < bounds.y; y += Game.World.tileSize) {
                    Game.renderer.fillStyle = '#555555';
                    Game.renderer.fillRect(x, y, Game.World.tileSize, Game.World.tileSize);
            }
        }
    }
}