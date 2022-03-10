import TileMap from './tile_map.js'

export default class Game {
  constructor() {
    this.tileSize = 32;
    this.velocity = 2;
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.tileMap = new TileMap(this.tileSize);
    this.Player = this.tileMap.getPlayer(this.velocity);
    this.enemies = this.tileMap.getEnemies(this.velocity);
    this.masters = this.tileMap.getMaster(this.velocity);
    this.tileMap.setCanvasSize(this.canvas);
  }

  #gameLoop = () => {
    this.tileMap.draw(this.ctx);
    this.Player.draw(this.ctx, this.enemies, this.masters);
    this.enemies.forEach(enemy => enemy.draw(this.ctx));
    this.masters.forEach(master => master.draw(this.ctx));
    this.ctx.font = '16px white Helvetica';
    this.ctx.fillText("Score: " + this.Player.score, 20, 40);
  }

  start() {
    this.intervalLoop = setInterval(this.#gameLoop, 1000 / 75);
  }

  stop() {
    clearInterval(this.intervalLoop)
  }
}
