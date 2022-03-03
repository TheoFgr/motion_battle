import TileMap from './tile_map.js'


const game = () => {

  const tileSize = 32;
  const velocity = 1;
  const canvas = document.getElementById('canvas');

  if (canvas) {
    const ctx = canvas.getContext('2d');
    const tileMap = new TileMap(tileSize);
    const Player = tileMap.getPlayer(velocity);

    tileMap.setCanvasSize(canvas);
    function gameLoop() {
      tileMap.draw(ctx);
      Player.draw(ctx);
    }

    setInterval(gameLoop, 1000 / 90);
  };
}

export {game}
