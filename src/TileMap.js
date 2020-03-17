class TileMap {

    constructor(str) {
        this.file = results.get(str);
    }
    
    draw() {
        renderer.fillStyle = "#000000";
        renderer.fillRect(0, 0, 3000, 3000);

        for (let x = 0; x < bounds.x; x += World.tileSize) {
            for(let y = 0; y < bounds.y; y += World.tileSize) {
                    renderer.fillStyle = '#555555';
                    renderer.fillRect(x, y, World.tileSize, World.tileSize);
            }
        }
    }
}